import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
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

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { RowClassroomExpansionApp } from './RowClassroomExpansionApp';
import { AdminStateTableApp } from '../AdminStateTableApp';
import { AdminDateTableApp } from '../AdminDateTableApp';

import { 
    startBlockClassroom,
    startDeleteClassroom, 
    startDeleteClassrooms, 
    startLoadClasroomSchoolPeriods, 
    startLoadClassrooms, 
    startRemoveClassrooms, 
    startRemoveClassroomSchoolPeriods, 
    startSaveClassroom, 
    startUpdateClassroom 
} from '../../../actions/admin/classroom';
import { 
    curse_level_choices, 
    getSingleModelKeys 
} from '../../../helpers/admin';


export const ClassroomScreen = () => {

    const dispatch = useDispatch();
    const { classrooms, school_periods, loading } = useSelector(
        state => state.dashboard.classroom
    );
    const [classroomUpdate, setClassroomUpdate] = useState(null);
    const [filteredSchoolPeriods, setFilteredSchoolPeriods] = useState(null);
    const [classroomDialog, setClassroomDialog] = useState(false);
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);
    const schoolPeriod = localStorage.getItem('currentPeriodId');

    const formik = useFormik({
        initialValues: {
            name: '',
            school_period: null,
            curse_level: null,
            capacity: '',
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

    const handleLoadClassrooms = useCallback( () => {
        dispatch( startLoadClassrooms( false ) );
    }, [dispatch]);

    const handleRemoveClassrooms = useCallback(
      () => {
        dispatch( startRemoveClassrooms() );
      }, [dispatch],
    );

    const handleClassroomSubmit = ( classroom ) => {
        dispatch( startSaveClassroom( classroom, toast ) );
        setClassroomDialog(false);
        dispatch( startRemoveClassroomSchoolPeriods() );
    }

    const handleClassroomUpdate = ( classroom ) => {
        const newClassroom = {
            id: classroomUpdate.id,
            state: classroomUpdate.state,
            created_at: classroomUpdate.created_at,
            ...classroom,
        };
        const classroomToUpdate = {
            ...classroom,
            school_period: classroom.school_period.id
        };
        dispatch( startRemoveClassroomSchoolPeriods() );
        dispatch( startUpdateClassroom( 
            newClassroom, classroomToUpdate, toast 
        ));
        setClassroomDialog(false);
        setShowUpdate(false);
    }

    const handleClassroomBlock = ( classroom ) => {
        const newClassroom = { ...classroom, state: 0 };
        dispatch( startBlockClassroom( newClassroom, toast));
    }

    const handleClassroomDelete = ( classroom ) => {
        dispatch( startDeleteClassroom( classroom.id, toast));
    }

    const handleClassroomsDelete = () => {
        dispatch( startDeleteClassrooms(
            getSingleModelKeys( selectedClassrooms ),
            toast
        ));
        setSelectedClassrooms([]);
    }

    const handleConfirmBlockPeriodScreen = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de bloquear la siguiente Aula?',
          header: 'Confirmación de Bloqueo',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, bloquear',
          rejectLabel: 'No bloquear',
          acceptClassName: 'p-button-secondary',
          accept: () => handleClassroomBlock( data ),
        });
    }

    const handleConfirmDeleteClassroom = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar la siguiente Aula?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleClassroomDelete( data ),
        });
    }

    const handleConfirmDeleteManyClassrooms = () => {
        confirmDialog({
          message: '¿Está seguro de eliminar las siguientes Aulas?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleClassroomsDelete(),
        });
    }

    const openNew = () => {
        dispatch( startLoadClasroomSchoolPeriods() );
        setClassroomDialog(true);
    }

    const openUpdate = ( classroom ) => {
        dispatch( startLoadClasroomSchoolPeriods() );
        setClassroomUpdate({...classroom});
        formik.setValues({
            name: classroom.name,
            school_period: classroom.school_period,
            curse_level: classroom.curse_level,
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

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const searchPeriods = (event) => {
        let _filteredSchoolPeriods;
        if (!event.query.trim().length) {
            _filteredSchoolPeriods = [...school_periods]
        } else {
            _filteredSchoolPeriods = school_periods.filter( school_period => {
                return school_period.name.toLowerCase().includes(
                    event.query.toLowerCase()
                );
            });
        }
        setFilteredSchoolPeriods(_filteredSchoolPeriods);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Nueva Aula" 
                    icon="fas fa-plus" 
                    className="p-button-primary mr-2" 
                    onClick={openNew} 
                />
                <Button 
                    label="Eliminar Aulas" 
                    icon="fas fa-trash-alt" 
                    className="p-button-danger" 
                    disabled={selectedClassrooms.length < 2}
                    onClick={handleConfirmDeleteManyClassrooms}
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
                                    tooltip='Editar Aula'
                                    tooltipOptions={{position: 'bottom'}}
                                    className="p-button-rounded p-button-warning mr-2" 
                                    onClick={() => openUpdate(rowData)} 
                                />
                                <Button 
                                    icon="fas fa-ban"
                                    tooltip='Bloquear Aula'
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
                        tooltip='Eliminar Aula'
                        tooltipOptions={{position: 'bottom'}}
                        className="p-button-rounded p-button-danger" 
                        onClick={() => handleConfirmDeleteClassroom(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const classroomDialogFooter = (
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

    const curseLevelBodyTemplate = (rowData) => {
        return <Badge 
            value={
                rowData.curse_level === 1
                    ? 'Primero'
                    : rowData.curse_level === 2
                        ? 'Segundo'
                        : rowData.curse_level === 3 && ('Tercero')
            } 
            severity={
                rowData.curse_level === 1
                    ? 'primary'
                    : rowData.curse_level === 2
                        ? 'warning'
                        : rowData.curse_level === 3 && ('success')
            }
            size='large'
        ></Badge>;
    }

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name, formik) && 
        <small className="p-error">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        handleLoadClassrooms();
        return () => {
            handleRemoveClassrooms();
        }
    }, [handleLoadClassrooms, handleRemoveClassrooms]);

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
                        header={
                            <OwnerHeaderApp
                              title={'Administrar Aulas'}
                              icon={'fas fa-chalkboard mr-2 icon-primary'}
                              placeholder={'Buscar Aulas...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <RowClassroomExpansionApp 
                                classroom={e}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Aulas.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                        LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Aulas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedClassrooms(e.value)}
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
                            field='curse_level' 
                            header="Nivel del Curso"
                            body={curseLevelBodyTemplate}
                            sortable
                        ></Column>
                        <Column 
                            className='text-center'
                            field="school_period.name" 
                            header="Período Lectivo" 
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
                                        className={classNames({ 'p-invalid': 
                                            isFormFieldValid('name') 
                                        })}
                                    />
                                    <label 
                                        htmlFor='name'
                                        className={classNames({ 'p-error': 
                                            isFormFieldValid('name', formik) 
                                        })}
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
                                        className={classNames({ 'p-invalid': 
                                            isFormFieldValid('school_period') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='school_period'
                                        className={classNames({ 'p-error': 
                                            isFormFieldValid('school_period') 
                                        })}
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
                                        className={classNames({ 'p-invalid': 
                                            isFormFieldValid('curse_level') 
                                        })}
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
                                        className={classNames({ 'p-invalid': 
                                            isFormFieldValid('capacity') 
                                        })}
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
                </div>
            </div>
        </div>
    )
}
