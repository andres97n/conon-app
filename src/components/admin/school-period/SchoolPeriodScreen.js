import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { Badge } from 'primereact/badge';
import { addLocale } from 'primereact/api';
import { InputTextarea } from 'primereact/inputtextarea';

import { startDeleteSchoolPeriod, startDeleteSchoolPeriods, startLoadSchoolPeriods, startRemoveSchoolPeriods, startSaveSchoolPeriod, startUpdateSchoolPeriod } from '../../../actions/admin/schoolPeriod';
import { getSingleModelKeys, transformToDateObject, validateSaveSchoolPeriod } from '../../../helpers/admin';
import { getToastMsg } from '../../../helpers/abp';


export const SchoolPeriodScreen = () => {
    
    let emptySchoolPeriod = {
        id: null,
        name: '',
        init_date: '',
        end_date: '',
        school_end_date: '',
        state: '',
        observations: '',
        createad_at: ''
    }

    const dispatch = useDispatch();
    const { schoolPeriods, loading } = useSelector(state => state.dashboard.school_period)
    const [schoolPeriod, setSchoolPeriod] = useState(emptySchoolPeriod);
    const [schoolPeriodUpdate, setSchoolPeriodUpdate] = useState(null);
    const [schoolPeriodDialog, setSchoolPeriodDialog] = useState(false);
    const [deleteSchoolPeriodDialog, setDeleteSchoolPeriodDialog] = useState(false);
    const [deleteSchoolPeriodsDialog, setDeleteSchoolPeriodsDialog] = useState(false);
    const [selectedSchoolPeriods, setSelectedSchoolPeriods] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: schoolPeriod.name,
            init_date: schoolPeriod.init_date,
            end_date: schoolPeriod.end_date,
            school_end_date: schoolPeriod.school_end_date,
            observations: schoolPeriod.observations,
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
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleLoadSchoolPeriod = useCallback( () => {
        dispatch( startLoadSchoolPeriods( false ) );
    }, [dispatch]);

    const handleSchoolPeriodSubmit = ( schoolPeriod ) => {
        dispatch( startSaveSchoolPeriod(schoolPeriod, toast) );
        setSchoolPeriodDialog(false);
        setSchoolPeriod(emptySchoolPeriod);
    }

    const handleSchoolPeriodUpdate = ( schoolPeriod ) => {
        dispatch( startUpdateSchoolPeriod( 
            schoolPeriod, 
            schoolPeriodUpdate.id, 
            toast 
        ));
        setSchoolPeriod(emptySchoolPeriod);
        setSchoolPeriodDialog(false);
        setShowUpdate(false);
    }

    const handleSchoolPeriodDelete = () => {
        // Process
        dispatch( startDeleteSchoolPeriod( schoolPeriod.id, toast));
        setDeleteSchoolPeriodDialog(false);
        setSchoolPeriod(emptySchoolPeriod);
    }

    const handleSchoolPeriodsDelete = () => {
        dispatch( startDeleteSchoolPeriods(
            getSingleModelKeys( selectedSchoolPeriods ),
            toast
        ));
        setDeleteSchoolPeriodsDialog(false);
        setSelectedSchoolPeriods(null);
    }

    const openNew = () => {
        if ( validateSaveSchoolPeriod( schoolPeriods ) ) {
            setSchoolPeriod(emptySchoolPeriod);
            setSchoolPeriodDialog(true);
        } else {
            getToastMsg(
                toast, 
                'warn', 
                'No se puede crear un nuevo Período Lectivo porque ya existe un período en vigencia.' 
            );
        }
        // setSchoolPeriod(emptySchoolPeriod);
        // setSchoolPeriodDialog(true);
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

    const hideDeleteSchoolPeriodDialog = () => {
        setDeleteSchoolPeriodDialog(false);
    }

    const hideDeleteSchoolPeriodsDialog = () => {
        setDeleteSchoolPeriodsDialog(false);
    }

    const confirmDeleteSchoolPeriod = ( schoolPeriod ) => {
        setSchoolPeriod( schoolPeriod );
        setDeleteSchoolPeriodDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteSchoolPeriodsDialog(true);
    }

    const onRowExpand = (event) => {
        // dispatch( startLoadTeachersByArea( event.data.id ) );
    }

    const onRowCollapse = () => {
        // dispatch( startRemoveTeachersByArea() );
    }

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy'
    });

    const stateBodyTemplate = (rowData) => {
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

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Nuevo Período Lectivo" icon="fas fa-plus" className="p-button-primary mr-2" onClick={openNew} />
                <Button label="Eliminar Período/s Lectivo/s" icon="fas fa-trash-alt"  className="p-button-danger" onClick={confirmDeleteSelected} 
                disabled={!selectedSchoolPeriods || !selectedSchoolPeriods.length}/>
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
                                <Button 
                                    icon="far fa-edit" 
                                    className="p-button-rounded p-button-primary mr-2" 
                                    onClick={() => openUpdate(rowData)} 
                                />
                            )
                        }
                        <Button 
                            icon="pi pi-trash" 
                            className="p-button-rounded p-button-danger" 
                            onClick={() => {
                                confirmDeleteSchoolPeriod(rowData);
                            }} 
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR PERÍODOS LECTIVOS</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar Período..." />
            </span>
        </div>
    );

    const schoolPeriodDialogFooter = (
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

    const deleteSchoolPeriodDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteSchoolPeriodDialog} />
            <Button label="Sí" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleSchoolPeriodDelete} />
        </React.Fragment>
    );

    const deleteSchoolPeriodsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteSchoolPeriodsDialog} />
            <Button label="Sí" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleSchoolPeriodsDelete} />
        </React.Fragment>
    );

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
                                    <h6>Fecha de Inicio</h6>
                                    {data.init_date}
                                </div>
                                <div>
                                    <h6>Fecha de Finalización</h6>
                                    {data.end_date}
                                </div>
                                <div>
                                    <h6>Fecha de Finalización de Clases</h6>
                                    {data.school_end_date}
                                </div>
                                <div>
                                    <h6>Estado</h6>
                                    {data.state}
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
                        selection={selectedSchoolPeriods} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Períodos Lectivos.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Períodos"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedSchoolPeriods(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="init_date" header="Fecha de Inicio" sortable></Column>
                        <Column field="end_date" header="Fecha de Finalización" sortable></Column>
                        <Column field='state' header="Estado" body={stateBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
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
                                    <Calendar 
                                        id="init_date"
                                        name='init_date' 
                                        locale="es" 
                                        showIcon
                                        dateFormat="dd/mm/yy" 
                                        value={formik.values.init_date}
                                        className={classNames({ 'p-invalid': isFormFieldValid('init_date') })} 
                                        onChange={formik.handleChange} 
                                    />
                                    <label 
                                        htmlFor='init_date'
                                        className={classNames({ 'p-error': isFormFieldValid('init_date') })}
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
                                        value={formik.values.end_date}
                                        className={classNames({ 'p-invalid': isFormFieldValid('end_date') })} 
                                        onChange={formik.handleChange} 
                                    />
                                    <label 
                                        htmlFor='end_date'
                                        className={classNames({ 'p-error': isFormFieldValid('end_date') })}
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
                                        value={formik.values.school_end_date}
                                        className={classNames({ 'p-invalid': isFormFieldValid('school_end_date') })} 
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
                        visible={deleteSchoolPeriodDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteSchoolPeriodDialogFooter} 
                        onHide={hideDeleteSchoolPeriodDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {schoolPeriod && <span>¿Está seguro que desea a el siguiente período lectivo: <b>{schoolPeriod.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteSchoolPeriodsDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteSchoolPeriodsDialogFooter} 
                        onHide={hideDeleteSchoolPeriodsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {schoolPeriod && <span>¿Está seguro que desea eliminar los siguientes <b>{selectedSchoolPeriods && selectedSchoolPeriods.length}</b> períodos seleccionadas?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
