import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';
import classNames from 'classnames';

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

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { RowKnowledgeAreaExpansionApp } from './RowKnowledgeAreaExpansionApp';
import { AdminDateTableApp } from '../AdminDateTableApp';

import { 
    startDeleteArea, 
    startDeleteManyAreas, 
    startLoadAreas, 
    startLoadCoordinators, 
    startRemoveAreas, 
    startRemoveCoordinators, 
    startSaveArea, 
    startUpdateArea 
} from '../../../actions/admin/area';
import { 
    area_types_choices, 
    getSingleModelKeys, 
    toCapitalize 
} from '../../../helpers/admin';


export const KnowledgeAreaScreen = () => {

    const dispatch = useDispatch();
    const { areas, coordinators, loading } = useSelector(
        state => state.dashboard.area
    );
    const [filteredCoordinators, setFilteredCoordinators] = useState(null);
    const [filteredSubcoordinators, setFilteredSubcoordinators] = useState(null);
    const [areaUpdate, setAreaUpdate] = useState(null);
    const [areaDialog, setAreaDialog] = useState(false);
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const formik = useFormik({
        initialValues: {
            name: '',
            coordinator: null,
            sub_coordinator: null,
            type: null,
            objective: '',
            observations: '',
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

    const handleLoadAreas = useCallback( () => {
        dispatch( startLoadAreas() );
    }, [dispatch]);

    const handleRemoveAreas = useCallback(
      () => {
        dispatch( startRemoveAreas() );
      }, [dispatch],
    );

    const handleAreaSubmit = ( area ) => {
        area.name = toCapitalize(area.name);
        dispatch( startSaveArea( area, toast ) );
        setAreaDialog(false);
        dispatch( startRemoveCoordinators() );
    }

    const handleAreaUpdate = ( area ) => {
        const newArea = {
            id: areaUpdate.id,
            created_at: areaUpdate.created_at,
            ...area,
        };
        const areaToUpdate = {
            ...area,
            coordinator: area.coordinator.id,
            sub_coordinator: area.sub_coordinator.id,
        };
        dispatch( startUpdateArea( newArea, areaToUpdate, toast ));
        dispatch( startRemoveCoordinators() );
        setAreaDialog(false);
        setShowUpdate(false);
    }

    const handleAreaDelete = ( area ) => {
        dispatch( startDeleteArea( area.id, toast));
    }

    const handleAreasDelete = () => {
        dispatch( startDeleteManyAreas(
            getSingleModelKeys( selectedAreas ),
            toast
        ));
        setSelectedAreas([]);
    }

    const handleConfirmDeleteKnowledgeArea = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar la siguiente Área de Conocimiento?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleAreaDelete( data ),
        });
    }

    const handleConfirmDeleteManyKnowledgeArea = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar las siguientes Áreas de Conocimiento?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleAreasDelete( data ),
        });
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
        setAreaDialog(true);
    }

    const openUpdate = ( area ) => {
        setAreaUpdate({...area});
        dispatch( startLoadCoordinators() );
        formik.setValues({
            name: area.name,
            coordinator: area.coordinator,
            sub_coordinator: area.sub_coordinator,
            type: area.type,
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

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Nueva Área de Conocimiento" 
                    icon="fas fa-plus" 
                    className="p-button-primary mr-2" 
                    onClick={openNew} 
                />
                <Button 
                    label="Eliminar Áreas de Conocimiento" 
                    icon="fas fa-trash-alt" 
                    className="p-button-danger" 
                    disabled={selectedAreas.length < 2}
                    onClick={handleConfirmDeleteManyKnowledgeArea} 
                />
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="fas fa-pen"
                        tooltip='Editar Área'
                        tooltipOptions={{position: 'bottom'}}
                        className="p-button-rounded p-button-warning mr-2" 
                        onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="fas fa-trash"
                        tooltip='Eliminar Área'
                        tooltipOptions={{position: 'bottom'}}
                        className="p-button-rounded p-button-danger" 
                        onClick={() => handleConfirmDeleteKnowledgeArea(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const areaDialogFooter = (
        <React.Fragment>
            <Button 
                label="Cancelar" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-danger" 
                onClick={hideDialog}
            />
            <Button 
                label="Guardar" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-success" 
                type='submit'
                onClick={formik.handleSubmit}
            />
        </React.Fragment>
    );

    const itemTemplate = (item) => {
        return (
            <div>{item.name}</div>
        );
    }

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && 
        <small className="p-error">{formik.errors[name]}</small>
    };

    useEffect(() => {
        handleLoadAreas();
        return () => {
            handleRemoveAreas();
        }
    }, [handleLoadAreas, handleRemoveAreas]);

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
                        header={
                            <OwnerHeaderApp
                              title={'Administrar Áreas de Conocimiento'}
                              icon={'fas fa-book mr-2 icon-primary'}
                              placeholder={'Buscar Área de Conocimiento...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <RowKnowledgeAreaExpansionApp 
                                knowledgeArea={e}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Áreas de Conocimiento.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                        LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} 
                        Áreas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedAreas(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                    >
                        <Column 
                            expander 
                            style={{ width: '4em' }} 
                        />
                        <Column
                            selectionMode="multiple" 
                            headerStyle={{ width: '3rem' }}
                        ></Column>
                        <Column
                            className='text-center'
                            field="name" 
                            header="Nombre" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field="coordinator.name" 
                            header="Coordinador" 
                            sortable
                        ></Column>
                        <Column 
                            className='text-center'
                            field="sub_coordinator.name" 
                            header="Subcoordinador" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field='created_at' 
                            header="Fecha de Creación" 
                            sortable
                            body={(e) => <AdminDateTableApp data={e} />} 
                        ></Column>
                        <Column
                            className='text-center'
                            body={actionBodyTemplate}
                        ></Column>
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('name') 
                                        })}
                                    />
                                    <label 
                                        htmlFor='name'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('name', formik) 
                                        })}
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('coordinator') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='coordinator'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('coordinator') 
                                        })}
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('sub_coordinator') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='sub_coordinator'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('sub_coordinator') 
                                        })}
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('type') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='type'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('type') 
                                        })}
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('objective') 
                                        })}
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('observations') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor='observations'>
                                        Observaciones
                                    </label>
                                </span>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
