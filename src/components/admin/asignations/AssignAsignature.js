import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import { Message } from 'primereact/message';
import { Tooltip } from 'primereact/tooltip';

import { AssignAsignatureDetailTable } from './AssignAsignatureDetailTable';
import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { AdminDateTableApp } from '../AdminDateTableApp';

import { 
    startLoadAsignatures, 
    startLoadAsignaturesDetailByAsignature, 
    startLoadClasroomForAsignatures, 
    startLoadTeachersForAsignatures, 
    startRemoveAsignatureClassrooms, 
    startRemoveAsignatures, 
    startRemoveAsignaturesDetail, 
    startRemoveAsignatureTeachers, 
    startSaveAsignatureDetail 
} from '../../../actions/admin/asignature';


export const AssignAsignature = () => {

    const dispatch = useDispatch();
    const { asignatures, classrooms, teachers, loading } = useSelector(
        state => state.dashboard.asignature
    );
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

    const handleLoadAsignatures = useCallback( () => {
        dispatch( startLoadAsignatures( true ) );
    }, [dispatch]);

    const handleRemoveAsignatures = useCallback(
      () => {
        dispatch( startRemoveAsignatures() );
        dispatch( startRemoveAsignaturesDetail() );
      }, [dispatch],
    );

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

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
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
                <h2>
                    <Tooltip target=".info-icon" />
                    <i 
                        className="fas fa-info-circle info-icon icon-primary" 
                        data-pr-tooltip="Debe seleccionar un registro para asignar un 
                        registro" 
                        data-pr-position="bottom"
                    />
                </h2>
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

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && 
        <small className="p-error">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        handleLoadAsignatures();
        return () => {
            handleRemoveAsignatures();
        }
    }, [handleLoadAsignatures, handleRemoveAsignatures]);

    if (!schoolPeriod) {
        return (
            <div className='grid p-fluid'>
                <div className='col-12'>
                    <Message
                        severity="warn" 
                        text="No se puede ingresar a este módulo si no está creado
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
                        header={
                            <OwnerHeaderApp
                              title={'Asignaciones - Asignaturas'}
                              icon={'fas fa-hand-pointer mr-2 icon-primary'}
                              placeholder={'Buscar Asignaturas...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={() => 
                            <AssignAsignatureDetailTable 
                                toast={toast}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Asignaturas.'
                        selectionMode='single'
                        selection={asignature}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                        LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} 
                        Asignaturas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setAsignature(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
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
                            field="knowledge_area.name" 
                            header="Área de Conocimiento" 
                            sortable
                        ></Column>
                        <Column
                            className='text-center'
                            field='created_at' 
                            header="Fecha de Creación"
                            body={(e) => <AdminDateTableApp data={e} />}
                            sortable
                        ></Column>
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('classroom') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='classroom'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('classroom') 
                                        })}
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
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('teacher') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='teacher'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('teacher') 
                                        })}
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
