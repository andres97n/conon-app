import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

import { AssingClassroomTable } from './AssingClassroomTable';

import { startLoadClassrooms, startLoadStudentsByClassroom, startRemoveClassrooms, startRemoveStudentsByClassroom } from '../../../actions/admin/classroom';


export const AssingClassroom = () => {

    const dispatch = useDispatch();
    const { classrooms, loading } = useSelector(state => state.dashboard.classroom);
    const [classroom, setClassroom] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const handleLoadClassrooms = useCallback( () => {
        dispatch( startLoadClassrooms( true ) );
    }, [dispatch]);

    const onRowExpand = (event) => {
        setClassroom(event.data);
        dispatch( startLoadStudentsByClassroom( event.data.id, 15) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveStudentsByClassroom() );
    }
    
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ASIGNAR ESTUDIANTES A LAS AULAS</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
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
                                <AssingClassroomTable 
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

    useEffect(() => {
        handleLoadClassrooms();
        return () => {
            dispatch( startRemoveClassrooms() );
            dispatch( startRemoveStudentsByClassroom() );
        }
    }, [handleLoadClassrooms, dispatch]);

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
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="curse_level" header="Grado" sortable></Column>
                        <Column field="school_period.name" header="Período Lectivo" sortable></Column>
                        <Column field='created_at' header="Fecha de Creación" sortable></Column>
                    </DataTable>

                </div>
            </div>
        </div>
    )
}
