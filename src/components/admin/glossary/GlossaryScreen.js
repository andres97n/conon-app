import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';

import { GlossaryDetailTable } from './GlossaryDetailTable';
import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { AdminDateTableApp } from '../AdminDateTableApp';
import { AdminStateTableApp } from '../AdminStateTableApp';

import { 
    startLoadGlossaryWithDetails, 
} from '../../../actions/admin/glossary';
import { 
    startLoadClassroomsByTeacher, 
    startRemoveClassrooms 
} from '../../../actions/admin/classroom';


export const GlossaryScreen = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    const { classrooms, loading } = useSelector(
        state => state.dashboard.classroom
    );
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const handleLoadClassrooms = useCallback( ( uid ) => {
        dispatch( startLoadClassroomsByTeacher( uid ));
    }, [dispatch] );

    const handleRemoveClassrooms = useCallback(
      () => {
        dispatch( startRemoveClassrooms() );
      }, [dispatch],
    );

    const onRowExpand = (event) => {
      dispatch( startLoadGlossaryWithDetails( event.data.id, true ) );
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
        if (uid) {
            handleLoadClassrooms( uid );
        }
        return () => {
            handleRemoveClassrooms();
        }
    }, [uid, handleLoadClassrooms, handleRemoveClassrooms]);

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
                              title={'Lista de Aulas'}
                              icon={'fas fa-chalkboard mr-2 icon-primary'}
                              placeholder={'Buscar Aulas...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={() => 
                            <GlossaryDetailTable 
                                toast = {toast}
                            />
                        }
                        selectionMode='single'
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Glosarios.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks 
                        NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} 
                        Glosarios"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onRowExpand={onRowExpand}
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
                            field='curse_level' 
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
                            field="state" 
                            header="Estado" 
                            body={(e) => <AdminStateTableApp data={e} />}
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
