import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import { Message } from 'primereact/message';

import { AssignAsignatureDetailTable } from './AssignAsignatureDetailTable';

import { startLoadAsignatures, startLoadAsignaturesDetailByAsignature, startLoadClasroomForAsignatures, startLoadTeachersForAsignatures, startRemoveAsignatureClassrooms, startRemoveAsignatures, startRemoveAsignaturesDetail, startRemoveAsignatureTeachers, startSaveAsignatureDetail } from '../../../actions/admin/asignature';


export const AssignAsignature = () => {

    const dispatch = useDispatch();
    const { asignatures, classrooms, teachers, loading } = useSelector(state => state.dashboard.asignature);
    const [asignature, setAsignature] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [filteredClassrooms, setFilteredClassrooms] = useState(null);
    const [filteredTeachers, setFilteredTeachers] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [asignatureDetailDialog, setAsignatureDetailDialog] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const formik = useFormik({
        initialValues: {
            classroom: '',
            teacher: '',
            observations: '',
        },
        validate: (data) => {
            let errors = {}

            if (!data.classroom) {
                errors.classroom = 'El aula es requerida.';
            }

            if (!data.teacher) {
                errors.teacher = 'El docente es requerido.';
            }

            return errors;
        },
        onSubmit: (data) => {

            handleAsignatureDetailSubmit(data);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleLoadAsignatures = useCallback( () => {
        dispatch( startLoadAsignatures( true ) );
    }, [dispatch]);

    const handleAsignatureDetailSubmit = ( asignatureDetail ) => {
        dispatch( startSaveAsignatureDetail(
            asignatureDetail,
            asignature.id,
            toast
        ));
        setAsignatureDetailDialog(false);
        setAsignature(null);
        dispatch( startRemoveAsignatureClassrooms() );
        dispatch( startRemoveAsignatureTeachers() );
    }

    const openNew = () => {
        dispatch( startLoadClasroomForAsignatures( asignature.id ) );
        dispatch( startLoadTeachersForAsignatures( asignature.id ) );
        setAsignatureDetailDialog(true);
    }

    const hideDialog = () => {
        setAsignatureDetailDialog(false);
        setAsignature(null);
        formik.resetForm();
        dispatch( startRemoveAsignatureClassrooms() );
        dispatch( startRemoveAsignatureTeachers() );
    }

    const searchClassrooms = (event) => {
        
        let _filteredClassrooms;
        if (!event.query.trim().length) {
            _filteredClassrooms = [...classrooms]
        } else {
            _filteredClassrooms = classrooms.filter( classroom => {
                return classroom.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }

        setFilteredClassrooms(_filteredClassrooms);

    }

    const searchTeachers = (event) => {
        
        let _filteredTeachers;
        if (!event.query.trim().length) {
            _filteredTeachers = [...teachers]
        } else {
            _filteredTeachers = teachers.filter( classroom => {
                return classroom.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }

        setFilteredTeachers(_filteredTeachers);

    }

    const onRowExpand = (event) => {
        setAsignature(event.data);
        dispatch( startLoadAsignaturesDetailByAsignature( event.data.id ) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveAsignaturesDetail() );
    }
    
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ASIGNAR AULAS Y DOCENTES A ASIGNATURAS</h5>
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
                    label="Asignar" 
                    icon="fas fa-plus" 
                    className="p-button-primary mr-2" 
                    onClick={openNew} 
                    disabled={!asignature}
                />
            </React.Fragment>
        );
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <h4>Expanda el registro para desasignar</h4>
            </React.Fragment>
        )
    }

    const asignatureDetailDialogFooter = (
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
                                    {/* <h6>Nombre</h6>
                                    {data.name} */}
                                    <AssignAsignatureDetailTable 
                                        asignature={ data }
                                        toast = { toast }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        handleLoadAsignatures();
        return () => {
            dispatch( startRemoveAsignatures() );
            dispatch( startRemoveAsignaturesDetail() );
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
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
                    >
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={asignatures}  
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Asignaturas.'
                        selectionMode='single'
                        selection={asignature}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Asignaturas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setAsignature(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                        <Column field="name" header="Nombre" sortable></Column>
                        <Column field="knowledge_area.name" header="Área de Conocimiento" sortable></Column>
                        <Column field='created_at' header="Fecha de Creación" sortable></Column>
                        {/* <Column body={actionBodyTemplate}></Column> */}
                    </DataTable>

                    <Dialog
                        modal 
                        header={asignature && `Asignar hacia [${asignature.name}]`}
                        visible={asignatureDetailDialog} 
                        onHide={hideDialog}
                        footer={asignatureDetailDialogFooter} 
                        className="p-fluid" 
                        style={{ width: '550px' }} 
                    >
                        <div className="grid p-fluid mt-3">

                            {/* TODO: Mejorar el estilo del componente Message */}

                            <Message 
                                severity='info'
                                text='Los campos con asteriscos(*) son obligatorios'
                            />

                            {/* { ( showUpdate )
                                && (
                                    <div className="field col-12">
                                        <span className="p-float-label">
                                            <InputText
                                                id='asignature'
                                                name='asignature'
                                                value={asignature && asignature.name}
                                                disabled={!asignature}
                                            />
                                            <label 
                                                htmlFor='asignature'
                                            > Asignatura*</label>
                                        </span>
                                    </div>

                                )

                            } */}


                            <div className="field col-12">
                                <span className="p-float-label">
                                    <AutoComplete 
                                        id='classroom'
                                        name='classroom'
                                        field='name'
                                        dropdown
                                        forceSelection
                                        value={formik.values.classroom}
                                        suggestions={filteredClassrooms}
                                        completeMethod={searchClassrooms}
                                        itemTemplate={itemTemplate}
                                        className={classNames({ 'p-invalid': isFormFieldValid('classroom') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='classroom'
                                        className={classNames({ 'p-error': isFormFieldValid('classroom') })}
                                    > Aula*</label>
                                </span>
                                {getFormErrorMessage('classroom')}
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <AutoComplete 
                                        id='teacher'
                                        name='teacher'
                                        field='name'
                                        dropdown
                                        forceSelection
                                        value={formik.values.teacher}
                                        suggestions={filteredTeachers}
                                        completeMethod={searchTeachers}
                                        itemTemplate={itemTemplate}
                                        className={classNames({ 'p-invalid': isFormFieldValid('teacher') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='teacher'
                                        className={classNames({ 'p-error': isFormFieldValid('teacher') })}
                                    >Docente*</label>
                                </span>
                                {getFormErrorMessage('teacher')}
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

                </div>
            </div>
        </div>
    )
}
