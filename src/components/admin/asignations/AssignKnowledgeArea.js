import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

import { AssignAreaTable } from './AssignAreaTable';
import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { AdminDateTableApp } from '../AdminDateTableApp';

import { 
    startLoadAreas, 
    startLoadNewTeacherForArea, 
    startRemoveAreas, 
    startRemoveTeachersByArea 
} from '../../../actions/admin/area';


export const AssignKnowledgeArea = () => {

    const dispatch = useDispatch();
    const { areas, loading } = useSelector(state => state.dashboard.area);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const dataTable = useRef(null);
    const toast = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const handleLoadAreas = useCallback( () => {
        dispatch( startLoadAreas() );
    }, [dispatch]);
    
    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const onRowExpand = (event) => {
        dispatch( startLoadNewTeacherForArea( event.data.id ) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveTeachersByArea() );
    }

    useEffect(() => {
        handleLoadAreas();
        return () => {
            dispatch( startRemoveAreas() );
            dispatch( startRemoveTeachersByArea() );
        }
    }, [handleLoadAreas, dispatch]);

    if (!schoolPeriod) {
        return (
            <div className='grid p-fluid'>
                <div className='col-12'>
                    <Message
                        severity="warn" 
                        text="No se puede generar Áreas de Conocimiento si no está creado
                        el Período Lectivo" 
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    <Toast ref={toast} />
                    <DataTable
                        ref={dataTable} 
                        value={areas}  
                        globalFilter={globalFilter}
                        header={
                            <OwnerHeaderApp
                              title={'Asignaciones - Áreas de Conocimiento'}
                              icon={'fas fa-hand-pointer mr-2 icon-primary'}
                              placeholder={'Buscar Áreas...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <AssignAreaTable 
                                area={e}
                                toast={toast}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Áreas.'
                        selectionMode='single'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                        LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Áreas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column 
                            className='text-center'
                            field="name" 
                            header="Nombre" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field="coordinator.name" 
                            header="Coordinador" 
                            sortable
                        ></Column>
                        <Column 
                            className='text-center'
                            field="sub_coordinator.name" 
                            header="Subcoordinador" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field='created_at' 
                            header="Fecha de Creación"
                            body={(e) => <AdminDateTableApp data={e} />} 
                            sortable
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}
