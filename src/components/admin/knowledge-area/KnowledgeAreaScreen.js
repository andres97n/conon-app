import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

import { startDeleteArea, startDeleteManyAreas, startLoadAreas, startLoadCoordinators, startLoadTeachersByArea, startRemoveAreas, startRemoveCoordinators, startRemoveTeachersByArea, startSaveArea, startUpdateArea } from '../../../actions/admin/area';
import { area_types_choices, getAreaTypeValue, getAutocompleteSelectedData, getSingleModelKeys, toCapitalize } from '../../../helpers/admin';

export const KnowledgeAreaScreen = () => {

    let emptyArea = {
        id: null,
        name: '',
        coordinator: {
            id: null,
            name: ''
        },
        sub_coordinator: {
            id: null,
            name: ''
        },
        type: null,
        objective: '',
        observations: '',
        createad_at: ''
    }

    const dispatch = useDispatch();
    const { areas, coordinators, loading } = useSelector(state => state.dashboard.area)
    const [area, setArea] = useState(emptyArea);
    const [filteredCoordinators, setFilteredCoordinators] = useState(null);
    const [filteredSubcoordinators, setFilteredSubcoordinators] = useState(null);
    const [areaUpdate, setAreaUpdate] = useState(null);
    const [areaDialog, setAreaDialog] = useState(false);
    const [deleteAreaDialog, setDeleteAreaDialog] = useState(false);
    const [deleteAreasDialog, setDeleteAreasDialog] = useState(false);
    const [selectedAreas, setSelectedAreas] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const formik = useFormik({
        initialValues: {
            name: area.name,
            coordinator: area.coordinator.id,
            sub_coordinator: area.sub_coordinator.id,
            type: area.type,
            objective: area.objective,
            observations: area.observations,
        },
        validate: (data) => {
            let errors = {}

            if (!data.name) {
                errors.name = 'El nombre es requerido.';
            }

            if (!data.coordinator) {
                errors.coordinator = 'El coordinador es requerido.';
            }

            if (!data.sub_coordinator) {
                errors.sub_coordinator = 'El subcoordinador es requerido.';
            }

            if (!data.type && data.type !== 0) {
                errors.type = 'El tipo de área es requerido.';
            } else if (data.type < 1 || data.type > 4) {
                errors.type = 'El tipo de área es requerido.';
            }

            if (!data.objective) {
                errors.objective = 'El objectivo es requerido.';
            }

            return errors;
        },
        onSubmit: (data) => {

            if (showUpdate) {
                handleAreaUpdate(data)
            } else {
                handleAreaSubmit(data);
            }

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleLoadAreas = useCallback( () => {
        dispatch( startLoadAreas() );
    }, [dispatch]);

    const handleAreaSubmit = ( area ) => {
        area.name = toCapitalize(area.name);
        dispatch( startSaveArea( area, toast ) );
        setAreaDialog(false);
        setArea(emptyArea);
        dispatch( startRemoveCoordinators() );
    }

    const handleAreaUpdate = ( area ) => {
        area.coordinator = getAutocompleteSelectedData( coordinators, area.coordinator.name );
        area.sub_coordinator = getAutocompleteSelectedData( coordinators, area.sub_coordinator.name );
        dispatch( startUpdateArea( 
            area, 
            areaUpdate.id, 
            toast 
        ));
        setArea(emptyArea);
        setAreaDialog(false);
        setShowUpdate(false);
        dispatch( startRemoveCoordinators() );
    }

    const handleAreaDelete = () => {
        // Process
        dispatch( startDeleteArea( area.id, toast));
        setDeleteAreaDialog(false);
        setArea(emptyArea);
    }

    const handleAreasDelete = () => {
        dispatch( startDeleteManyAreas(
            getSingleModelKeys( selectedAreas ),
            toast
        ));
        setDeleteAreasDialog(false);
        setSelectedAreas(null);
    }

    const searchCoordinators = (event) => {
        
        let _filteredCoordinators;
        if (!event.query.trim().length) {
            _filteredCoordinators = [...coordinators]
        } else {
            _filteredCoordinators = coordinators.filter( teacher => {
                return teacher.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }

        setFilteredCoordinators(_filteredCoordinators);

    }

    const searchSubcoordinators = (event) => {

        let _filteredSubcoordinators;
        if (!event.query.trim().length) {
            _filteredSubcoordinators = [...coordinators]
        } else {
            _filteredSubcoordinators = coordinators.filter( teacher => {
                return teacher.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }

        setFilteredSubcoordinators(_filteredSubcoordinators);

    }

    const openNew = () => {
        dispatch( startLoadCoordinators() );
        setArea(emptyArea);
        setAreaDialog(true);
    }

    const openUpdate = ( area ) => {
        setAreaUpdate({...area});
        dispatch( startLoadCoordinators() );
        formik.setValues({
            name: area.name,
            coordinator: area.coordinator,
            sub_coordinator: area.sub_coordinator,
            type: getAreaTypeValue(area.type),
            objective: area.objective,
            observations: area.observations,
        });
        setAreaDialog(true);
        setShowUpdate(true);
    }

    const hideDialog = () => {
        setAreaDialog(false);
        setShowUpdate(false);
        formik.resetForm();
        dispatch( startRemoveCoordinators() );
    }

    const hideDeleteAreaDialog = () => {
        setDeleteAreaDialog(false);
    }

    const hideDeleteAreasDialog = () => {
        setDeleteAreasDialog(false);
    }

    const confirmDeleteArea = ( area ) => {
        setArea( area );
        setDeleteAreaDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteAreasDialog(true);
    }

    const onRowExpand = (event) => {
        dispatch( startLoadTeachersByArea( event.data.id ) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveTeachersByArea() );
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nueva Área de Conocimiento" icon="fas fa-plus" className="p-button-primary mr-2" onClick={openNew} />
                <Button label="Eliminar Área/s de Conocimiento" icon="fas fa-trash-alt"  className="p-button-danger" onClick={confirmDeleteSelected} 
                disabled={!selectedAreas || !selectedAreas.length}/>
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="far fa-edit" className="p-button-rounded p-button-primary mr-2" onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteArea(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR ÁREAS DE CONOCIMIENTO</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const areaDialogFooter = (
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

    const deleteAreaDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteAreaDialog} />
            <Button label="Sí" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleAreaDelete} />
        </React.Fragment>
    );

    const deleteAreasDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteAreasDialog} />
            <Button label="Sí" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleAreasDelete} />
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
                                <div className='p-mr-2 p-mb-2'>
                                    <h6>Coordinador</h6>
                                    {data.coordinator.name}
                                </div>
                                <div>
                                    <h6>Subcoordinador</h6>
                                    {data.sub_coordinator.id}
                                </div>
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

    useEffect(() => {
        handleLoadAreas();
        return () => {
            dispatch( startRemoveAreas() );
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
                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={areas} 
                        selection={selectedAreas} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Áreas de Conocimiento.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Áreas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedAreas(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="coordinator.name" header="Coordinador" sortable></Column>
                        <Column field="sub_coordinator.name" header="Subcoordinador" sortable></Column>
                        <Column field='created_at' header="Fecha de Creación" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        modal 
                        header={
                            showUpdate
                                ? ('Actualizar Área de Conocimiento')
                                : ('Nueva Área de Conocimiento')
                        }
                        visible={areaDialog} 
                        onHide={hideDialog}
                        footer={areaDialogFooter} 
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

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <AutoComplete 
                                        id='coordinator'
                                        name='coordinator'
                                        field='name'
                                        dropdown
                                        forceSelection
                                        value={formik.values.coordinator}
                                        suggestions={filteredCoordinators}
                                        completeMethod={searchCoordinators}
                                        itemTemplate={itemTemplate}
                                        className={classNames({ 'p-invalid': isFormFieldValid('coordinator') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='coordinator'
                                        className={classNames({ 'p-error': isFormFieldValid('coordinator') })}
                                    >Coordinador*</label>
                                </span>
                                {getFormErrorMessage('coordinator')}
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <AutoComplete 
                                        id='sub_coordinator'
                                        name='sub_coordinator'
                                        field='name'
                                        dropdown
                                        forceSelection
                                        value={formik.values.sub_coordinator}
                                        suggestions={filteredSubcoordinators}
                                        completeMethod={searchSubcoordinators}
                                        itemTemplate={itemTemplate}
                                        className={classNames({ 'p-invalid': isFormFieldValid('sub_coordinator') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='sub_coordinator'
                                        className={classNames({ 'p-error': isFormFieldValid('sub_coordinator') })}
                                    >Subcoordinador*</label>
                                </span>
                                {getFormErrorMessage('sub_coordinator')}
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <Dropdown
                                        id='type'
                                        name= 'type'
                                        optionLabel="label" 
                                        value={formik.values.type} 
                                        options={area_types_choices} 
                                        className={classNames({ 'p-invalid': isFormFieldValid('type') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='type'
                                        className={classNames({ 'p-error': isFormFieldValid('type') })}
                                > Tipo de Área*</label>
                                </span>
                                {getFormErrorMessage('type')}
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputTextarea
                                        id='objective'
                                        name='objective'
                                        required rows={3} cols={20} 
                                        value={formik.values.objective}
                                        className={classNames({ 'p-invalid': isFormFieldValid('objective') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor='objective'>
                                        Objetivo General del Área de Conocimiento*
                                    </label>
                                </span>
                                {getFormErrorMessage('objective')}
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputTextarea
                                        id='observations'
                                        name='observations'
                                        required rows={3} cols={20} 
                                        value={formik.values.observations}
                                        className={classNames({ 'p-invalid': isFormFieldValid('observations') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor='observations'>
                                        Observaciones
                                    </label>
                                </span>
                            </div>

                        </div>

                    </Dialog>

                    <Dialog 
                        visible={deleteAreaDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteAreaDialogFooter} 
                        onHide={hideDeleteAreaDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {area && <span>¿Está seguro que desea a la siguiente área: <b>{area.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteAreasDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteAreasDialogFooter} 
                        onHide={hideDeleteAreasDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {area && <span>¿Está seguro que desea eliminar las siguientes <b>{selectedAreas && selectedAreas.length}</b> áreas seleccionadas?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
