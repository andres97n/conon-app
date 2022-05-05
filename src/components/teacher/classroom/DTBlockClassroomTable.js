import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';

import { startDeleteStudentsByClassroom } from '../../../actions/admin/classroom';
import { getDataIdsForModel } from '../../../helpers/admin';

export const DTBlockClassroomTable = React.memo(({
    classroom,
    toast
}) => {

    const dispatch = useDispatch();
    const { students, loading } = useSelector(state => state.dashboard.classroom);
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [putStudentsDialog, setPutStudentsDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dataTable = useRef(null);

    const handlePutStudents = () => {
        dispatch( startDeleteStudentsByClassroom(
            classroom.id,
            getDataIdsForModel(selectedStudents),
            toast
        ));
        setPutStudentsDialog(false);
        setSelectedStudents(null);
    }

    const confirmPutSelected = () => {
        setPutStudentsDialog(true);
    }

    const hidePutStudentsDialog = () => {
        setPutStudentsDialog(false);
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">SELECCIONAR ESTUDIANTES</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText 
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Buscar Estudiante..." 
                />
            </span>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Eliminar Estudiante/s" 
                    icon="fas fa-times"  
                    className="p-button-danger" 
                    onClick={confirmPutSelected} 
                    disabled={!selectedStudents || !selectedStudents.length}
                />
            </React.Fragment>
        );
    }

    const putStudentsDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-secondary" 
                onClick={hidePutStudentsDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handlePutStudents} 
            />
        </React.Fragment>
    );

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">

                <Toolbar
                        className="mb-4" 
                        left={leftToolbarTemplate}
                    >
                </Toolbar>

                <DataTable
                    ref={dataTable} 
                    value={students} 
                    selection={selectedStudents} 
                    globalFilter={globalFilter}
                    header={header}
                    loading={loading}
                    dataKey="id" paginator rows={10} 
                    emptyMessage='No existen Estudiantes para Agregar.'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} de {totalRecords} estudiantes"
                    resizableColumns 
                    columnResizeMode="expand"
                    className="datatable-responsive"
                    onSelectionChange={(e) => setSelectedStudents(e.value)}
                >
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="identification" header="Identificación" sortable></Column>
                    <Column field="name" header="Nombres" sortable></Column>
                    <Column field="age" header="Edad" sortable></Column>
                    <Column field="email" header="Correo" sortable></Column>
                </DataTable>

                <Dialog
                    visible={putStudentsDialog} 
                    style={{ width: '450px' }} 
                    header="Confirmar" modal 
                    footer={putStudentsDialogFooter} 
                    onHide={hidePutStudentsDialog}
                >
                    <div className="flex align-items-center justify-content-center">
                        <i 
                            className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                        />
                        {<span>¿Está seguro que desea eliminar los siguientes <b>{selectedStudents && selectedStudents.length}</b> estudiantes seleccionados?</span>}
                    </div>
                </Dialog>

            </div>
        </div>
    )
});
