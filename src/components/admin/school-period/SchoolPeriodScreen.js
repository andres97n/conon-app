import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addLocale } from 'primereact/api';
import { confirmDialog } from 'primereact/confirmdialog';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { RowSchoolPeriodExpansionApp } from './RowSchoolPeriodExpansionApp';
import { AdminStateTableApp } from '../AdminStateTableApp';

import { 
    startBlockSchoolPeriod,
    startDeleteSchoolPeriod, 
    startLoadSchoolPeriods, 
    startRemoveSchoolPeriods, 
    startSaveSchoolPeriod, 
    startUpdateSchoolPeriod 
} from '../../../actions/admin/schoolPeriod';
import {  
    transformToDateObject, 
    validateSaveSchoolPeriod 
} from '../../../helpers/admin';
import { getToastMsg } from '../../../helpers/abp';


export const SchoolPeriodScreen = () => {

    const dispatch = useDispatch();
    const { schoolPeriods, loading } = useSelector(
        state => state.dashboard.school_period
    );
    const [schoolPeriodUpdate, setSchoolPeriodUpdate] = useState(null);
    const [schoolPeriodDialog, setSchoolPeriodDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            init_date: '',
            end_date: '',
            school_end_date: '',
            observations: '',
        },
        validate: (data) => {
            let errors = {}

            if (!data.name) {
                errors.name = 'El nombre es requerido.';
            }
            if (!data.init_date) {
                errors.init_date = 'La fecha de inicio es requerida.';
            }
            if (!data.end_date) {
                errors.end_date = 'La fecha de finalización es requerida.';
            }
            if (!data.school_end_date) {
                errors.school_end_date = 'La fecha de finalización de clases es rerquerida.';
            }

            return errors;
        },
        onSubmit: (data) => {
            if (showUpdate) {
                handleSchoolPeriodUpdate(data)
            } else {
                handleSchoolPeriodSubmit(data);
            }
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const handleLoadSchoolPeriod = useCallback( () => {
        dispatch( startLoadSchoolPeriods( false ) );
    }, [dispatch]);

    const handleSchoolPeriodSubmit = ( schoolPeriod ) => {
        dispatch( startSaveSchoolPeriod(schoolPeriod, toast) );
        setSchoolPeriodDialog(false);
    }

    const handleSchoolPeriodUpdate = ( schoolPeriod ) => {
        dispatch( startUpdateSchoolPeriod( 
            schoolPeriod, 
            schoolPeriodUpdate.id, 
            toast 
        ));
        setSchoolPeriodDialog(false);
        setShowUpdate(false);
    }

    const handleSchoolPeriodBlock = ( schoolPeriod ) => {
        const newSchoolPeriod = { ...schoolPeriod, state: 0 }
        dispatch( startBlockSchoolPeriod( newSchoolPeriod, toast));
    }

    const handleSchoolPeriodDelete = ( schoolPeriod ) => {
        dispatch( startDeleteSchoolPeriod( schoolPeriod.id, toast));
    }

    const handleConfirmBlockPeriodScreen = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de bloquear el siguiente Período Lectivo?',
          header: 'Confirmación de Bloqueo',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, bloquear',
          rejectLabel: 'No bloquear',
          acceptClassName: 'p-button-secondary',
          accept: () => handleSchoolPeriodBlock( data ),
        });
    }

    const handleConfirmDeletePeriodScreen = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar el siguiente Período Lectivo?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleSchoolPeriodDelete( data ),
        });
    }

    const openNew = () => {
        if ( validateSaveSchoolPeriod( schoolPeriods ) ) {
            setSchoolPeriodDialog(true);
        } else {
            getToastMsg(
                toast, 
                'warn', 
                'No se puede crear un nuevo Período Lectivo porque ' + 
                'ya existe un período en vigencia.' 
            );
        }
    }

    const openUpdate = ( schoolPeriod ) => {
        setSchoolPeriodUpdate({...schoolPeriod});
        formik.setValues({
            name: schoolPeriod.name,
            init_date: transformToDateObject(schoolPeriod.init_date),
            end_date: transformToDateObject(schoolPeriod.end_date),
            school_end_date: transformToDateObject(schoolPeriod.school_end_date),
            observations: schoolPeriod.observations,
        });
        setSchoolPeriodDialog(true);
        setShowUpdate(true);
    }

    const hideDialog = () => {
        setSchoolPeriodDialog(false);
        setShowUpdate(false);
        formik.resetForm();
    }

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && 
        <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
      );

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthNamesShort: [
            'ene', 'feb', 'mar', 'abr', 'may', 'jun', 
            'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
        ],
        today: 'Hoy'
    });

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Nuevo Período Lectivo" 
                    icon="fas fa-plus" 
                    className="p-button-primary mr-2" 
                    onClick={openNew} 
                />
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='center-inside'>
                    <div className="actions">
                        {
                            rowData.state === 1 && (
                                <>
                                    <Button 
                                        icon="fas fa-pen"
                                        tooltip='Editar Período Lectivo'
                                        tooltipOptions={{position: 'bottom'}}
                                        className="p-button-rounded p-button-warning mr-2" 
                                        onClick={() => openUpdate(rowData)} 
                                    />
                                    <Button 
                                        icon="fas fa-ban"
                                        tooltip='Bloquear Período Lectivo'
                                        tooltipOptions={{position: 'bottom'}}
                                        className="p-button-rounded p-button-secondary mr-2" 
                                        onClick={() => 
                                            handleConfirmBlockPeriodScreen(rowData)
                                        } 
                                    />
                                </>
                            )
                        }
                        <Button 
                            icon="fas fa-trash"
                            tooltip='Eliminar Período Lectivo'
                            tooltipOptions={{position: 'bottom'}}
                            className="p-button-rounded p-button-danger" 
                            onClick={() => {
                                handleConfirmDeletePeriodScreen(rowData);
                            }} 
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    const schoolPeriodDialogFooter = (
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

    useEffect(() => {
        handleLoadSchoolPeriod();
        return () => {
            dispatch( startRemoveSchoolPeriods() );
        }
    }, [handleLoadSchoolPeriod, dispatch]);

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>
                    <DataTable
                        ref={dataTable} 
                        value={schoolPeriods} 
                        globalFilter={globalFilter}
                        header={
                            <OwnerHeaderApp
                              title={'Administrar Períodos Lectivos'}
                              icon={'fas fa-school mr-2 icon-primary'}
                              placeholder={'Buscar Período Lectivo...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <RowSchoolPeriodExpansionApp 
                                schoolPeriod={e}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Períodos Lectivos.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks 
                        NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} 
                        Períodos"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onRowToggle={(e) => setExpandedRows(e.data)}
                    >
                        <Column 
                            expander 
                            style={{ width: '4em' }} 
                        />
                        <Column
                            className='text-center'
                            field="name" 
                            header="Nombre" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field="init_date" 
                            header="Fecha de Inicio" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field="end_date" 
                            header="Fecha de Finalización" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field='state' 
                            header="Estado" 
                            body={(e) => <AdminStateTableApp data={e} />} 
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
                                ? ('Actualizar Período Lectivo')
                                : ('Nuevo Período Lectivo')
                        }
                        visible={schoolPeriodDialog} 
                        onHide={hideDialog}
                        footer={schoolPeriodDialogFooter} 
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
                                    <Calendar 
                                        id="init_date"
                                        name='init_date' 
                                        locale="es" 
                                        showIcon
                                        dateFormat="dd/mm/yy" 
                                        icon='fas fa-calendar'
                                        value={formik.values.init_date}
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('init_date') 
                                        })} 
                                        onChange={formik.handleChange} 
                                    />
                                    <label 
                                        htmlFor='init_date'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('init_date') 
                                        })}
                                    >Fecha de Inicio*</label>
                                </span>
                                {getFormErrorMessage('init_date')}
                            </div>
                            <div className="field col-12">
                                <span className="p-float-label">
                                    <Calendar 
                                        id="end_date"
                                        name='end_date' 
                                        locale="es"
                                        showIcon 
                                        dateFormat="dd/mm/yy"
                                        icon='fas fa-calendar'
                                        value={formik.values.end_date}
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('end_date') 
                                        })} 
                                        onChange={formik.handleChange} 
                                    />
                                    <label 
                                        htmlFor='end_date'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('end_date') 
                                        })}
                                    >Fecha de Finalización*</label>
                                </span>
                                {getFormErrorMessage('end_date')}
                            </div>
                            <div className="field col-12">
                                <span className="p-float-label">
                                    <Calendar 
                                        id="school_end_date"
                                        name='school_end_date' 
                                        locale="es"
                                        showIcon 
                                        dateFormat="dd/mm/yy" 
                                        icon='fas fa-calendar'
                                        value={formik.values.school_end_date}
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('school_end_date') 
                                        })} 
                                        onChange={formik.handleChange} 
                                    />
                                    <label htmlFor='school_end_date'>
                                        Fecha de Finalización de Clases*
                                    </label>
                                </span>
                                {getFormErrorMessage('school_end_date')}
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
