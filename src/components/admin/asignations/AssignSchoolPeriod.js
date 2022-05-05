import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';

import { startLoadSchoolPeriods, startRemoveSchoolPeriods } from '../../../actions/admin/schoolPeriod';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export const AssignSchoolPeriod = () => {

    const dispatch = useDispatch();
    const { schoolPeriods, loading } = useSelector(state => state.dashboard.school_period);
    const [schoolPeriod, setSchoolPeriod] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    // const [expandedRows, setExpandedRows] = useState(null);
    const dataTable = useRef(null);

    const handleLoadPeriods = useCallback( () => {
        dispatch( startLoadSchoolPeriods( true ) );
    }, [dispatch]);
    
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">BLOQUEAR PERÍODOS LECTIVOS</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="fas fa-lock" 
                        className="p-button-rounded p-button-secondary" 
                        // onClick={() => {
                        //     confirmDeleteSchoolPeriod(rowData);
                        // }} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Asignaciones para {data.name}</h5>
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className='card'>
                            <div className="p-d-flex p-flex-wrap">
                                <div className="p-mr-2 p-mb-2">
                                    <h6>Nombre</h6>
                                    {data.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        handleLoadPeriods();
        return () => {
            dispatch( startRemoveSchoolPeriods() );
        }
    }, [handleLoadPeriods, dispatch]);

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>

                    <DataTable
                        ref={dataTable} 
                        value={schoolPeriods}  
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        // expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Períodos Lectivos.'
                        selectionMode='single'
                        selection={schoolPeriod}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Períodos"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSchoolPeriod(e.value)}
                    >
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="init_date" header="Fecha de Inicio" sortable></Column>
                        <Column field="end_date" header="Fecha de Finalización" sortable></Column>
                        <Column field='state' header="Estado" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                </div>
            </div>
        </div>
    )
}
