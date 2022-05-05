import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';
import { Badge } from 'primereact/badge';

import { DTBlockClassroomTable } from './DTBlockClassroomTable';

import { startLoadClassroomsByTeacher, startLoadClassroomsDetail, startRemoveClassrooms, startRemoveStudentsByClassroom } from '../../../actions/admin/classroom';


export const DTBlockClassroomDetail = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    const { classrooms, loading } = useSelector(state => state.dashboard.classroom);
    const [classroom, setClassroom] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const handleLoadClassrooms = useCallback( () => {
        dispatch( startLoadClassroomsByTeacher( uid ) );
    }, [dispatch, uid]);

    const onRowExpand = (event) => {
        setClassroom(event.data);
        dispatch( startLoadClassroomsDetail( event.data.id ) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveStudentsByClassroom() );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ELIMINAR ESTUDIANTES DE SUS AULAS</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Buscar Aula..." 
                />
            </span>
        </div>
    );

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Asignaciones para {data.name}</h5>
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className='card'>
                            <div className="p-d-flex p-flex-wrap">
                                <DTBlockClassroomTable
                                    classroom={data}
                                    toast={toast}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const stateBodyTemplate = (rowData) => {
        return <Badge 
            value={rowData.state}
            className='ml-2' 
            severity={
                (rowData.state === 'Abierto')
                    ? ('success')
                    : ('danger')
            }
        ></Badge>;
    }

    const dateBodyTemplate = (rowData) => {
        return <Badge
            value={rowData.created_at} 
            severity='info'
        ></Badge>;
    }

    useEffect(() => {
        handleLoadClassrooms();
        return () => {
            dispatch( startRemoveClassrooms() );
            dispatch( startRemoveStudentsByClassroom() );
        }
    }, [handleLoadClassrooms, dispatch]);

    if (!schoolPeriod) {
        return (
            <div className="grid p-fluid">
                <div className="col-12">
                    <Message 
                        severity="error" 
                        text="No existe un Período Lectivo activo." 
                    />
                </div>
            </div>
        );
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
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Aulas.'
                        selectionMode='single'
                        selection={classroom}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Aulas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setClassroom(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="curse_level" header="Grado" sortable></Column>
                        <Column field="school_period.name" header="Período Lectivo" sortable></Column>
                        <Column 
                            field='state' 
                            header="Estado"
                            body={stateBodyTemplate} 
                            sortable
                        ></Column>
                        <Column 
                            field='created_at' 
                            header="Fecha de Creación"
                            body={dateBodyTemplate} 
                            sortable
                        ></Column>
                    </DataTable>

                </div>
            </div>
        </div>
    )
}
