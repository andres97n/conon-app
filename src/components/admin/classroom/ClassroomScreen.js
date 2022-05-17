import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { Badge } from 'primereact/badge';

import { startDeleteClassroom, startDeleteClassrooms, startLoadClasroomSchoolPeriods, startLoadClassrooms, startRemoveClassrooms, startRemoveClassroomSchoolPeriods, startSaveClassroom, startUpdateClassroom } from '../../../actions/admin/classroom';
import { curse_level_choices, getAutocompleteSelectedData, getDropdownValue, getSingleModelKeys } from '../../../helpers/admin';


export const ClassroomScreen = () => {

    let emptyClassroom = {
        id: null,
        name: '',
        curse_level: null,
        capacity: null,
        school_period: {
            id: null,
            name: '',
            period_date: ''
        },
        created_at: ''
    }

    const dispatch = useDispatch();
    const { classrooms, school_periods, loading } = useSelector(state => state.dashboard.classroom)
    const [classroom, setClassroom] = useState(emptyClassroom);
    const [classroomUpdate, setClassroomUpdate] = useState(null);
    const [filteredSchoolPeriods, setFilteredSchoolPeriods] = useState(null);
    const [classroomDialog, setClassroomDialog] = useState(false);
    const [deleteClassroomDialog, setDeleteClassroomDialog] = useState(false);
    const [deleteClassroomsDialog, setDeleteClassroomsDialog] = useState(false);
    const [selectedClassrooms, setSelectedClassrooms] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const formik = useFormik({
        initialValues: {
            name: classroom.name,
            school_period: classroom.school_period.id,
            curse_level: classroom.curse_level,
            capacity: classroom.capacity,
        },
        validate: (data) => {
            let errors = {}

            if (!data.name) {
                errors.name = 'El nombre es requerido.';
            }

            if (!data.school_period) {
                errors.school_period = 'El período lectivo es requerido.';
            }

            if (!data.curse_level) {
                errors.curse_level = 'El nivel del curso es requerido.';
            } else if (data.curse_level < 1 || data.curse_level > 3) {
                errors.curse_level = 'El nivel del curso no puede ser menor a 1 ni mayor 3.';
            }

            if ( data.capacity && data.capacity > 50 ) {
                errors.curse_level = 'La capacidad no puede ser mayor de 50.';
            }

            return errors;
        },
        onSubmit: (data) => {

            if (showUpdate) {
                handleClassroomUpdate(data)
            } else {
                handleClassroomSubmit(data);
            }

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleLoadClassrooms = useCallback( () => {
        dispatch( startLoadClassrooms( false ) );
    }, [dispatch]);

    const handleClassroomSubmit = ( classroom ) => {
        dispatch( startSaveClassroom( classroom, toast ) );
        setClassroomDialog(false);
        setClassroom(emptyClassroom);
        dispatch( startRemoveClassroomSchoolPeriods() );
    }

    const handleClassroomUpdate = ( classroom ) => {
        classroom.school_period = getAutocompleteSelectedData( 
            school_periods, classroom.school_period.name 
        );
        dispatch( startUpdateClassroom( 
            classroom, 
            classroomUpdate.id, 
            toast 
        ));
        setClassroom(emptyClassroom);
        setClassroomDialog(false);
        setShowUpdate(false);
        dispatch( startRemoveClassroomSchoolPeriods() );
    }

    const handleClassroomDelete = () => {
        // Process
        dispatch( startDeleteClassroom( classroom.id, toast));
        setDeleteClassroomDialog(false);
        setClassroom(emptyClassroom);
    }

    const handleClassroomsDelete = () => {
        dispatch( startDeleteClassrooms(
            getSingleModelKeys( selectedClassrooms ),
            toast
        ));
        setDeleteClassroomsDialog(false);
        setSelectedClassrooms(null);
    }

    const openNew = () => {
        dispatch( startLoadClasroomSchoolPeriods() );
        setClassroom(emptyClassroom);
        setClassroomDialog(true);
    }

    const openUpdate = ( classroom ) => {
        dispatch( startLoadClasroomSchoolPeriods() );
        setClassroomUpdate({...classroom});
        formik.setValues({
            name: classroom.name,
            school_period: classroom.school_period,
            curse_level: getDropdownValue(curse_level_choices, classroom.curse_level),
            capacity: classroom.capacity,
        });
        setClassroomDialog(true);
        setShowUpdate(true);
    }

    const hideDialog = () => {
        setClassroomDialog(false);
        setShowUpdate(false);
        formik.resetForm();
        dispatch( startRemoveClassroomSchoolPeriods() );
    }

    const hideDeleteClassroomDialog = () => {
        setDeleteClassroomDialog(false);
    }

    const hideDeleteClassroomsDialog = () => {
        setDeleteClassroomsDialog(false);
    }

    const confirmDeleteClassroom = ( classroom ) => {
        setClassroom( classroom );
        setDeleteClassroomDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteClassroomsDialog(true);
    }

    const onRowExpand = (event) => {
        // dispatch( startLoadTeachersByArea( event.data.id ) );
    }

    const onRowCollapse = () => {
        // dispatch( startRemoveTeachersByArea() );
    }

    const searchPeriods = (event) => {
        
        let _filteredSchoolPeriods;
        if (!event.query.trim().length) {
            _filteredSchoolPeriods = [...school_periods]
        } else {
            _filteredSchoolPeriods = school_periods.filter( school_period => {
                return school_period.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }

        setFilteredSchoolPeriods(_filteredSchoolPeriods);

    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nueva Aula" icon="fas fa-plus" className="p-button-primary mr-2" onClick={openNew} />
                <Button label="Eliminar Aula/s" icon="fas fa-trash-alt"  className="p-button-danger" onClick={confirmDeleteSelected} 
                disabled={!selectedClassrooms || !selectedClassrooms.length}/>
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="far fa-edit" 
                        className="p-button-rounded p-button-primary mr-2" 
                        onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="pi pi-trash" 
                        className="p-button-rounded p-button-danger" 
                        onClick={() => confirmDeleteClassroom(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR AULAS</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const classroomDialogFooter = (
        <React.Fragment>
            <Button 
                label="Cancelar" icon="fas fa-times-circle" 
                className="p-button-text p-button-danger" onClick={hideDialog}
            />
            <Button 
                label="Guardar" icon="fas fa-check-circle" 
                className="p-button-text p-button-success" type='submit'
                onClick={formik.handleSubmit}
            />
        </React.Fragment>
    );

    const deleteClassroomDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteClassroomDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleClassroomDelete} 
            />
        </React.Fragment>
    );

    const deleteClassroomsDialogFooter = (
        <React.Fragment>
            <Button
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteClassroomsDialog} />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleClassroomsDelete} />
        </React.Fragment>
    );

    const itemTemplate = (item) => {
        return (
            <div className="">
                <div>{item.name}</div>
            </div>
        );
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Detalle de {data.name}</h5>
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className='card'>
                            <div className="p-d-flex p-flex-wrap">
                                <div className="p-mr-2 p-mb-2">
                                    <h6>Nombre</h6>
                                    {data.name}
                                </div>
                                {/* <div className='p-mr-2 p-mb-2'>
                                    <h6>Área de Conocimiento</h6>
                                    {data.knowledge_area.name}
                                </div> */}
                                <div>
                                    <h6>Objective</h6>
                                    {data.objective}
                                </div>
                                <div>
                                    <h6>Observaciones</h6>
                                    {data.observations}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const stateBodyTemplate = (rowData) => {
        console.log(rowData);
        return <Badge 
            value={
                rowData.state === 1
                    ? 'Activo'
                    : 'Inactivo'
            } 
            severity={
                (rowData.state === 1)
                    ? ("success")
                    : ('warning')
            }
        ></Badge>;
    }

    useEffect(() => {
        handleLoadClassrooms();
        return () => {
            dispatch( startRemoveClassrooms() );
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
                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={classrooms} 
                        selection={selectedClassrooms} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Aulas.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Aulas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedClassrooms(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field='curse_level' header="Nivel del Curso" sortable></Column>
                        <Column field="school_period.name" header="Período Lectivo" sortable></Column>
                        <Column field="state" header="Estado" body={stateBodyTemplate} sortable></Column>
                        <Column field='created_at' header="Fecha de Creación" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        modal 
                        header={
                            showUpdate
                                ? ('Actualizar Aula')
                                : ('Nueva Aula')
                        }
                        visible={classroomDialog} 
                        onHide={hideDialog}
                        footer={classroomDialogFooter} 
                        className="p-fluid" 
                        style={{ width: '550px' }} 
                    >
                        <div className="grid p-fluid mt-3">

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputText
                                        id='name'
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                                    />
                                    <label 
                                        htmlFor='name'
                                        className={classNames({ 'p-error': isFormFieldValid('name', formik) })}
                                    > Nombre*</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <AutoComplete
                                        id='school_period'
                                        name='school_period'
                                        field='name'
                                        dropdown
                                        forceSelection
                                        value={formik.values.school_period}
                                        suggestions={filteredSchoolPeriods}
                                        completeMethod={searchPeriods}
                                        itemTemplate={itemTemplate}
                                        className={classNames({ 'p-invalid': isFormFieldValid('school_period') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='school_period'
                                        className={classNames({ 'p-error': isFormFieldValid('school_period') })}
                                    >Período Lectivo*</label>
                                </span>
                                {getFormErrorMessage('school_period')}
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <Dropdown
                                        id='curse_level'
                                        name= 'curse_level'
                                        optionLabel="label" 
                                        value={formik.values.curse_level} 
                                        options={curse_level_choices} 
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('curse_level') })}
                                    />
                                    <label htmlFor='curse_level'>
                                        Nivel del Curso*
                                    </label>
                                </span>
                                {getFormErrorMessage('curse_level')}
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputNumber
                                        id='capacity'
                                        name= 'capacity'
                                        value={formik.values.capacity} 
                                        onValueChange={formik.handleChange} 
                                        min={0} max={50}
                                        showButtons buttonLayout="horizontal"
                                        incrementButtonIcon="fas fa-plus" 
                                        decrementButtonIcon="fas fa-minus" 
                                        decrementButtonClassName="p-button-danger" 
                                        incrementButtonClassName="p-button-success" 
                                        className={classNames({ 'p-invalid': isFormFieldValid('capacity') })}
                                    />
                                    <label 
                                        htmlFor='capacity'
                                        style={{ marginLeft: '2.2em' }}
                                    >
                                        Capacidad
                                    </label>
                                </span>
                            </div>

                        </div>

                    </Dialog>

                    <Dialog 
                        visible={deleteClassroomDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteClassroomDialogFooter} 
                        onHide={hideDeleteClassroomDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" 
                                style={{ fontSize: '2rem' }} 
                            />
                                {classroom && <span>¿Está seguro que desea la siguiente Aula: <b>{classroom.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteClassroomsDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteClassroomsDialogFooter} 
                        onHide={hideDeleteClassroomsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" 
                                style={{ fontSize: '2rem' }} 
                            />
                            {classroom && <span>¿Está seguro que desea eliminar las siguientes 
                                <b> {selectedClassrooms && selectedClassrooms.length}</b> aulas seleccionadas?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
