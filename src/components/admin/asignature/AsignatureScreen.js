import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import { Badge } from 'primereact/badge';
import { Message } from 'primereact/message';

import { getAutocompleteSelectedData, getSingleModelKeys } from '../../../helpers/admin';
import { startDeleteAsignature, startDeleteAsignatures, startLoadAsignatureAreas, startLoadAsignatures, startRemoveAsignatureAreas, startRemoveAsignatures, startSaveAsignature, startUpdateAsignature } from '../../../actions/admin/asignature';

export const AsignatureScreen = () => {

    let emptyAsignature = {
        id: null,
        name: '',
        objective: '',
        knowledge_area: {
            name: '',
            coordinator: null
        },
        observations: ''
    }

    const dispatch = useDispatch();
    const { asignatures, areas, loading } = useSelector(state => state.dashboard.asignature)
    const [asignature, setAsignature] = useState(emptyAsignature);
    const [asignatureUpdate, setAsignatureUpdate] = useState(null);
    const [filteredAreas, setFilteredAreas] = useState(null);
    const [asignatureDialog, setAsignatureDialog] = useState(false);
    const [deleteAsignatureDialog, setDeleteAsignatureDialog] = useState(false);
    const [deleteAsignaturesDialog, setDeleteAsignaturesDialog] = useState(false);
    const [selectedAsignatures, setSelectedAsignatures] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const formik = useFormik({
        initialValues: {
            name: asignature.objective,
            knowledge_area: asignature.knowledge_area.id,
            objective: asignature.objective,
            observations: asignature.observations,
        },
        validate: (data) => {
            let errors = {}

            if (!data.name) {
                errors.name = 'El nombre es requerido.';
            }

            if (!data.knowledge_area) {
                errors.knowledge_area = 'El Área de Conocimiento es requerido.';
            }

            if (!data.objective) {
                errors.objective = 'El objectivo es requerido.';
            }

            return errors;
        },
        onSubmit: (data) => {

            if (showUpdate) {
                handleAsignatureUpdate(data)
            } else {
                handleAsignatureSubmit(data);
            }

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleLoadAsignatures = useCallback( () => {
        dispatch( startLoadAsignatures( false ) );
    }, [dispatch]);

    const handleAsignatureSubmit = ( asignature ) => {
        // asignature.name = toCapitalize(asignature.name);
        dispatch( startSaveAsignature( asignature, toast ) );
        setAsignatureDialog(false);
        setAsignature(emptyAsignature);
        dispatch( startRemoveAsignatureAreas() );
    }

    const handleAsignatureUpdate = ( asignature ) => {
        asignature.knowledge_area = getAutocompleteSelectedData( areas, asignature.knowledge_area.name );
        dispatch( startUpdateAsignature( 
            asignature, 
            asignatureUpdate.id, 
            toast 
        ));
        setAsignature(emptyAsignature);
        setAsignatureDialog(false);
        setShowUpdate(false);
        dispatch( startRemoveAsignatureAreas() );
    }

    const handleAsignatureDelete = () => {
        // Process
        dispatch( startDeleteAsignature( asignature.id, toast));
        setDeleteAsignatureDialog(false);
        setAsignature(emptyAsignature);
    }

    const handleAsignaturesDelete = () => {
        dispatch( startDeleteAsignatures(
            getSingleModelKeys( selectedAsignatures ),
            toast
        ));
        setDeleteAsignaturesDialog(false);
        setSelectedAsignatures(null);
    }

    const openNew = () => {
        dispatch( startLoadAsignatureAreas() );
        setAsignature(emptyAsignature);
        setAsignatureDialog(true);
    }

    const openUpdate = ( asignature ) => {
        dispatch( startLoadAsignatureAreas() );
        setAsignatureUpdate({...asignature});
        formik.setValues({
            name: asignature.name,
            knowledge_area: asignature.knowledge_area,
            objective: asignature.objective,
            observations: asignature.observations,
        });
        setAsignatureDialog(true);
        setShowUpdate(true);
    }

    const hideDialog = () => {
        setAsignatureDialog(false);
        setShowUpdate(false);
        formik.resetForm();
        dispatch( startRemoveAsignatureAreas() );
    }

    const hideDeleteAsignatureDialog = () => {
        setDeleteAsignatureDialog(false);
    }

    const hideDeleteAsignaturesDialog = () => {
        setDeleteAsignaturesDialog(false);
    }

    const confirmDeleteAsignature = ( asignature ) => {
        setAsignature( asignature );
        setDeleteAsignatureDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteAsignaturesDialog(true);
    }

    const onRowExpand = (event) => {
        // dispatch( startLoadTeachersByArea( event.data.id ) );
    }

    const onRowCollapse = () => {
        // dispatch( startRemoveTeachersByArea() );
    }

    const searchAreas = (event) => {
        
        let _filteredAreas;
        if (!event.query.trim().length) {
            _filteredAreas = [...areas]
        } else {
            _filteredAreas = areas.filter( area => {
                return area.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }

        setFilteredAreas(_filteredAreas);

    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nueva Asignatura" icon="fas fa-plus" className="p-button-primary mr-2" onClick={openNew} />
                <Button label="Eliminar Asignatura/s" icon="fas fa-trash-alt"  className="p-button-danger" onClick={confirmDeleteSelected} 
                disabled={!selectedAsignatures || !selectedAsignatures.length}/>
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
                        tooltip='Editar Asignatura'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="pi pi-trash" 
                        className="p-button-rounded p-button-danger"
                        tooltip='Eliminar Asignatura'
                        tooltipOptions={{position:'bottom'}} 
                        onClick={() => confirmDeleteAsignature(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR ASIGNATURAS</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const asignatureDialogFooter = (
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

    const deleteAsignatureDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteAsignatureDialog} />
            <Button label="Si" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleAsignatureDelete} />
        </React.Fragment>
    );

    const deleteAsignaturesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteAsignaturesDialog} />
            <Button label="Si" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleAsignaturesDelete} />
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
                                    <h6>Área de Conocimiento</h6>
                                    {data.knowledge_area.name}
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
        handleLoadAsignatures()
        return () => {
            dispatch( startRemoveAsignatures() );
        }
    }, [handleLoadAsignatures, dispatch]);

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
                        value={asignatures} 
                        selection={selectedAsignatures} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Asignaturas.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Asignaturas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedAsignatures(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="knowledge_area.name" header="Área de Conocimiento" sortable></Column>
                        <Column 
                            field="state" 
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
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        modal 
                        header={
                            showUpdate
                                ? ('Actualizar Asignatura')
                                : ('Nueva Asignatura')
                        }
                        visible={asignatureDialog} 
                        onHide={hideDialog}
                        footer={asignatureDialogFooter} 
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
                                        id='knowledge_area'
                                        name='knowledge_area'
                                        field='name'
                                        dropdown
                                        forceSelection
                                        value={formik.values.knowledge_area}
                                        suggestions={filteredAreas}
                                        completeMethod={searchAreas}
                                        itemTemplate={itemTemplate}
                                        className={classNames({ 'p-invalid': isFormFieldValid('knowledge_area') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='knowledge_area'
                                        className={classNames({ 'p-error': isFormFieldValid('knowledge_area') })}
                                    >Área de Conocimiento*</label>
                                </span>
                                {getFormErrorMessage('knowledge_area')}
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
                                        Objetivo General de la Asignatura*
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
                        visible={deleteAsignatureDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteAsignatureDialogFooter} 
                        onHide={hideDeleteAsignatureDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {asignature && <span>¿Está seguro que desea eliminar la siguiente Asignatura: <b>{asignature.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteAsignaturesDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteAsignaturesDialogFooter} 
                        onHide={hideDeleteAsignaturesDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {asignature && <span>¿Está seguro que desea eliminar las siguientes <b>{selectedAsignatures && selectedAsignatures.length}</b> asignaturas seleccionadas?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
