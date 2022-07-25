import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';
import { Badge } from 'primereact/badge';

import { AssingClassroomTable } from './AssingClassroomTable';
import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { AdminDateTableApp } from '../AdminDateTableApp';

import { 
    startLoadClassrooms, 
    startLoadClassroomsByTeacher, 
    startLoadStudentsByClassroom, 
    startRemoveClassrooms, 
    startRemoveStudentsByClassroom 
} from '../../../actions/admin/classroom';


export const AssingClassroom = () => {

    const dispatch = useDispatch();
    const { uid, type } = useSelector(state => state.auth);
    const { classrooms, loading } = useSelector(
        state => state.dashboard.classroom
    );
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const handleLoadClassrooms = useCallback( ( uid, type ) => {
        if (uid) {
            if (type === 0) {
                dispatch( startLoadClassrooms( true ) );    
            } else if (type === 1) {
                dispatch( startLoadClassroomsByTeacher( uid ) );
            }
        }
    }, [dispatch]);
    
    const handleRemoveClassrooms = useCallback(
        () => {
          dispatch( startRemoveClassrooms() );
        }, [dispatch],
    );

    const onRowExpand = (event) => {
        dispatch( startLoadStudentsByClassroom( event.data.id, 15) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveStudentsByClassroom() );
    }

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const curseLevelBodyTemplate = (rowData) => {
        return <Badge
            value={
                rowData.curse_level === 1
                    ? 'Primero'
                    : rowData.curse_level === 2
                        ? 'Segundo'
                        : rowData.curse_level === 3 && ('Tercero')
            } 
            severity={
                rowData.curse_level === 1
                    ? 'primary'
                    : rowData.curse_level === 2
                        ? 'warning'
                        : rowData.curse_level === 3 && ('success')
            }
            size='large'
        ></Badge>;
    }

    useEffect(() => {
        handleLoadClassrooms( uid, type );
        return () => {
            handleRemoveClassrooms();
        }
    }, [handleLoadClassrooms, handleRemoveClassrooms, uid, type]);

    if (!schoolPeriod) {
        return (
            <div className='grid p-fluid'>
                <div className='col-12'>
                    <Message
                        severity="warn" 
                        text="No se puede asignar si no está creado el Período Lectivo" 
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
                        value={classrooms}  
                        globalFilter={globalFilter}
                        header={
                            <OwnerHeaderApp
                              title={'Asignaciones - Aulas'}
                              icon={'fas fa-hand-pointer mr-2 icon-primary'}
                              placeholder={'Buscar Aulas...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <AssingClassroomTable 
                                classroom={e}
                                toast={toast}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Aulas.'
                        selectionMode='single'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                        LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Aulas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                    >
                        <Column 
                            expander 
                            style={{ width: '4em' }} 
                        />
                        <Column
                            className='text-center'
                            field="name" 
                            header="Nombre" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field="curse_level" 
                            header="Nivel del Curso"
                            body={curseLevelBodyTemplate}
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field="school_period.name" 
                            header="Período Lectivo" 
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
