import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

import { AssignAreaTable } from './AssignAreaTable';

import { startLoadAreas, startLoadNewTeacherForArea, startRemoveAreas, startRemoveTeachersByArea } from '../../../actions/admin/area';

export const AssignKnowledgeArea = () => {

    const dispatch = useDispatch();
    const { areas, loading } = useSelector(state => state.dashboard.area);
    const [area, setArea] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const dataTable = useRef(null);
    const toast = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const handleLoadAreas = useCallback( () => {
        dispatch( startLoadAreas() );
    }, [dispatch]);
    
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ASIGNAR DOCENTES A ÁREAS DE CONOCIMIENTO</h5>
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
                            {/* <div className="p-d-flex p-flex-wrap">
                                <div className="p-mr-2 p-mb-2">
                                    <h6>Nombre</h6>
                                    {data.name}
                                </div>
                            </div> */}
                            <AssignAreaTable 
                                area={area}
                                toast={toast}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const onRowExpand = (event) => {
        setArea(event.data);
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
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Áreas.'
                        selectionMode='single'
                        selection={area}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Áreas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setArea(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="coordinator.name" header="Coordinador" sortable></Column>
                        <Column field="sub_coordinator.name" header="Subcoordinador" sortable></Column>
                        <Column field='created_at' header="Fecha de Creación" sortable></Column>
                    </DataTable>

                </div>
            </div>
        </div>
    )
}
