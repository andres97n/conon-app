import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import { Message } from 'primereact/message';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { AdminStateTableApp } from '../AdminStateTableApp';
import { AdminDateTableApp } from '../AdminDateTableApp';
import { RowAsignatureExpansionApp } from './RowAsignatureExpansionApp';

import { 
    getSingleModelKeys 
} from '../../../helpers/admin';
import { 
    startBlockAsignature,
    startDeleteAsignature,
    startDeleteAsignatures, 
    startLoadAsignatureAreas, 
    startLoadAsignatures, 
    startRemoveAsignatureAreas, 
    startRemoveAsignatures, 
    startSaveAsignature, 
    startUpdateAsignature 
} from '../../../actions/admin/asignature';


export const AsignatureScreen = () => {

    const dispatch = useDispatch();
    const { asignatures, areas, loading } = useSelector(
        state => state.dashboard.asignature
    );
    const [asignatureUpdate, setAsignatureUpdate] = useState(null);
    const [filteredAreas, setFilteredAreas] = useState(null);
    const [asignatureDialog, setAsignatureDialog] = useState(false);
    const [selectedAsignatures, setSelectedAsignatures] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const formik = useFormik({
        initialValues: {
            name: '',
            knowledge_area: null,
            objective: '',
            observations: '',
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

    const handleLoadAsignatures = useCallback( () => {
        dispatch( startLoadAsignatures( false ) );
    }, [dispatch]);

    const handleAsignatureSubmit = ( asignature ) => {
        dispatch( startRemoveAsignatureAreas() );
        dispatch( startSaveAsignature( asignature, toast ) );
        setAsignatureDialog(false);
    }

    const handleAsignatureUpdate = ( asignature ) => {
        const newAsignature = {
            id: asignatureUpdate.id,
            state: asignatureUpdate.state,
            created_at: asignatureUpdate.created_at,
            ...asignatureUpdate
        };
        const asignatureToUpdate = {
            ...asignature,
            knowledge_area: asignature.knowledge_area.id
        };
        dispatch( startUpdateAsignature( 
            newAsignature, 
            asignatureToUpdate, 
            toast 
        ));
        setAsignatureDialog(false);
        setShowUpdate(false);
        dispatch( startRemoveAsignatureAreas() );
    }
    
    const handleAsignatureBlock = ( asignature ) => {
        const newAsignature = { ...asignature, state: 0 };
        dispatch( startBlockAsignature( newAsignature, toast));
    }

    const handleAsignatureDelete = ( asignature ) => {
        dispatch( startDeleteAsignature( asignature.id, toast));
    }

    const handleAsignaturesDelete = () => {
        dispatch( startDeleteAsignatures(
            getSingleModelKeys( selectedAsignatures ),
            toast
        ));
        setSelectedAsignatures([]);
    }

    const handleConfirmBlockPeriodScreen = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de bloquear la siguiente Asignatura?',
          header: 'Confirmación de Bloqueo',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, bloquear',
          rejectLabel: 'No bloquear',
          acceptClassName: 'p-button-secondary',
          accept: () => handleAsignatureBlock( data ),
        });
    }

    const handleConfirmDeletePeriodScreen = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar la siguiente Asignatura?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleAsignatureDelete( data ),
        });
    }

    const handleConfirmDeleteManyTeachers = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar los siguientes Asignaturas?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleAsignaturesDelete( data ),
        });
    }

    const openNew = () => {
        dispatch( startLoadAsignatureAreas() );
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

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

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
                <Button 
                    label="Nueva Asignatura" 
                    icon="fas fa-plus" 
                    className="p-button-primary mr-2" 
                    onClick={openNew} 
                />
                <Button 
                    label="Eliminar Asignaturas" 
                    icon="fas fa-trash-alt" 
                    className="p-button-danger" 
                    disabled={selectedAsignatures.length < 2}
                    onClick={handleConfirmDeleteManyTeachers} 
                />
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    {
                        rowData.state === 1 && (
                            <>
                                <Button 
                                    icon="fas fa-pen" 
                                    className="p-button-rounded p-button-warning mr-2"
                                    tooltip='Editar Asignatura'
                                    tooltipOptions={{position:'bottom'}}
                                    onClick={() => openUpdate(rowData)} 
                                />
                                <Button 
                                    icon="fas fa-ban" 
                                    className="p-button-rounded p-button-secondary mr-2"
                                    tooltip='Bloquear Asignatura'
                                    tooltipOptions={{position:'bottom'}}
                                    onClick={() => 
                                        handleConfirmBlockPeriodScreen(rowData)
                                    } 
                                />
                            </>
                        )
                    }
                    <Button 
                        icon="fas fa-trash" 
                        className="p-button-rounded p-button-danger"
                        tooltip='Eliminar Asignatura'
                        tooltipOptions={{position:'bottom'}} 
                        onClick={() => handleConfirmDeletePeriodScreen(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const asignatureDialogFooter = (
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
        <small className="p-error">{formik.errors[name]}</small>;
    };

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
                        text="No se puede generar Áreas de Conocimiento si no está 
                        creado el Período Lectivo" 
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
                        header={
                            <OwnerHeaderApp
                              title={'Administrar Asignaturas'}
                              icon={'fas fa-book-reader mr-2 icon-primary'}
                              placeholder={'Buscar Asignaturas...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <RowAsignatureExpansionApp 
                                asignature={e}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Asignaturas.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks 
                        NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} 
                        Asignaturas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedAsignatures(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                    >
                        <Column expander style={{ width: '4em' }} />
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
                            field="knowledge_area.name" 
                            header="Área de Conocimiento" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field="state" 
                            header="Estado"
                            body={(e) => <AdminStateTableApp data={e} />}
                            sortable
                        ></Column>
                        <Column
                            className='text-center' 
                            field='created_at' 
                            header="Fecha de Creación"
                            body={(e) => <AdminDateTableApp data={e} />} 
                            sortable
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('knowledge_area') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='knowledge_area'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('knowledge_area') 
                                        })}
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('objective') 
                                        })}
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
