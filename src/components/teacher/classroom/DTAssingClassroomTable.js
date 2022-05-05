import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadStudentsByClassroom, startSaveStudentsByClassroom } from '../../../actions/admin/classroom';
import { getDataIdsForModel, setRangeNumberInput } from '../../../helpers/admin';

export const DTAssingClassroomTable = React.memo(({
    classroom,
    toast
}) => {

    const dispatch = useDispatch();
    const { students, loading } = useSelector(state => state.dashboard.classroom);
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [age, setAge] = useState(15);
    const [putStudentsDialog, setPutStudentsDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dataTable = useRef(null);

    const handlePutStudents = () => {
        dispatch( startSaveStudentsByClassroom(
            getDataIdsForModel(selectedStudents),
            classroom.id,
            toast
        ));
        setPutStudentsDialog(false);
        setSelectedStudents(null);
    }

    const setChangeAge = (event) => {
        setAge(event.value);
        if (classroom) {
            dispatch( startLoadStudentsByClassroom( classroom.id, event.value ) );
        }
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
                <InputNumber
                    id='age'
                    name= 'age'
                    value={setRangeNumberInput(age, 20, 5)} 
                    min={5} max={20}
                    size={1}
                    tooltip='Filtar estudiantes por edad'
                    tooltipOptions={{className: 'purple-tooltip', position: 'bottom'}}
                    showButtons buttonLayout="horizontal"
                    decrementButtonClassName="p-button-danger" 
                    incrementButtonClassName="p-button-success" 
                    incrementButtonIcon="fas fa-plus" 
                    decrementButtonIcon="fas fa-minus" 
                    onValueChange={setChangeAge} 
                />
            </React.Fragment>
        );
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Asignar Estudiante/s" 
                    icon="fas fa-check"  
                    className="p-button-primary" 
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
                className="p-button-text p-button-success" 
                onClick={hidePutStudentsDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-primary" 
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
                    right={rightToolbarTemplate}
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
                        {<span>¿Está seguro que desea asignar los siguientes <b>{selectedStudents && selectedStudents.length}</b> estudiantes seleccionados?</span>}
                    </div>
                </Dialog>

            </div>
        </div>
    )
});
