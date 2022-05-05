import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import {  getDataIdsForModel } from '../../../helpers/admin';
import { startSaveTeachersToArea } from '../../../actions/admin/area';

// TODO: Manejar el renderizado de la tabla

export const AssignAreaTable = React.memo(({ 
    area,
    toast
}) => {

    const dispatch = useDispatch();
    const { teachers, loading } = useSelector(state => state.dashboard.area);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedTeachers, setSelectedTeachers] = useState(null);
    const [putTeachersDialog, setPutTeachersDialog] = useState(false);
    const dataTable = useRef(null);

    const handlePutTeachers = () => {
        dispatch( startSaveTeachersToArea(
            getDataIdsForModel(selectedTeachers),
            area.id,
            toast
        ));
        setPutTeachersDialog(false);
        setSelectedTeachers(null);
    }

    const hidePutTeachersDialog = () => {
        setPutTeachersDialog(false);
    }

    const confirmPutSelected = () => {
        setPutTeachersDialog(true);
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">SELECCIONAR DOCENTES</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Asignar Docente/s" 
                    icon="fas fa-check"  
                    className="p-button-primary" 
                    onClick={confirmPutSelected} 
                    disabled={!selectedTeachers || !selectedTeachers.length}
                />
            </React.Fragment>
        );
    }

    const putTeachersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hidePutTeachersDialog} />
            <Button label="Sí" icon="fas fa-check-circle" className="p-button-text p-button-primary" onClick={handlePutTeachers} />
        </React.Fragment>
    );

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">

                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={teachers} 
                        selection={selectedTeachers} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Docentes para Agregar.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} docentes"
                        resizableColumns 
                        columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedTeachers(e.value)}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="identification" header="Identificación" sortable></Column>
                        <Column field="name" header="Nombres" sortable></Column>
                        <Column field="title" header="Título" sortable></Column>
                    </DataTable>

                    <Dialog
                        visible={putTeachersDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={putTeachersDialogFooter} 
                        onHide={hidePutTeachersDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {<span>¿Está seguro que desea asignar los siguientes <b>{selectedTeachers && selectedTeachers.length}</b> docentes seleccionados?</span>}
                        </div>
                    </Dialog>

            </div>
        </div>
    )
})
