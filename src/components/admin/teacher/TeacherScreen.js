import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';
import classNames from 'classnames';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { RowTeacherExpasionTemplate } from './RowTeacherExpasionTemplate';

import { 
    startDeleteManyTeachers, 
    startDeleteTeacher, 
    startLoadTeachers, 
    startRemoveTeachers, 
    startSaveTeacher, 
    startUpdateTeacher 
} from '../../../actions/admin/teacher';
import { getTeachersKeys, toCapitalize } from '../../../helpers/admin';
import { 
    gender_choices, 
    getGenderValue, 
    getIdentificationTypeValue, 
    identification_choices, 
    isPhoneValid 
} from '../../../helpers/person';


export const TeacherScreen = () => {

    const dispatch = useDispatch();
    const { teachers, loading } = useSelector(state => state.dashboard.teacher)
    const [teacherUpdate, setTeacherUpdate] = useState(null);
    const [teacherDialog, setTeacherDialog] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const formik = useFormik({
        initialValues: {
            identification_type: null,
            identification: '',
            name: '',
            last_name: '',
            gender: '',
            age: '',
            phone: '',
            username: '',
            email: '',
            title: '',
            objective: ''
        },
        validate: (data) => {
            let errors = {}

            if (!data.identification_type && data.identification_type !== 0) {
                errors.identification_type = 'El tipo de identificación es requerido.';
            } else if (data.identification_type > 1){
                errors.identification_type = 'El tipo de identificación es requerido.';
            }
            if (!data.identification) {
                errors.identification = 'La identificación es requerida.';
            } else if (
                data.identification_type && 
                data.identification_type === 0 && 
                data.identification.length !== 10
            ) {
                errors.identification = 'La identificación debe tener 10 números.';
            }
            if (!data.name) {
                errors.name = 'El nombre es requerido.';
            }
            if (!data.last_name) {
                errors.last_name = 'El apellido es requerido.';
            }
            if (!data.gender && data.gender !== 0) {
                errors.gender = 'El género es requerido.';
            } else if (data.gender < 0 && data.gender > 2) {
                errors.gender = 'El género es requerido.';
            }
            if ( data.age && (data.age < 17 || data > 80) ) {
                errors.age = 'La edad no puede ser menor a 17 o mayor que 80.';                
            }
            if ( data.phone && !isPhoneValid(data.phone)) {
                errors.phone = 'El número de contacto no puede contener este número de caratecteres, revise por favor.'
            }
            if (!data.username) {
                errors.username = 'El nombre de usuario es requerido.';
            }
            if (!data.email) {
                errors.email = 'El email es requerido.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Correo inválido. Ej: ejemplo@email.com.';
            }

            return errors;
        },
        onSubmit: (data) => {
            if (showUpdate) {
                handleTeacherUpdate(data)
            } else {
                handleTeacherSubmit(data);
            }
            formik.resetForm();
        }
    });

    const handleLoadTeachers = useCallback( () => {
        dispatch( startLoadTeachers( false ) );
    }, [dispatch]);

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const handleTeacherSubmit = ( teacher ) => {
        teacher.name = toCapitalize(teacher.name.trim());
        teacher.last_name = toCapitalize(teacher.last_name.trim());
        const newPerson = {
            identification_type: teacher.identification_type,
            identification: teacher.identification,
            name: teacher.name,
            last_name: teacher.last_name,
            gender: teacher.gender,
            age: teacher.age || 0,
            phone: teacher.phone,
        };
        const newUser = {
            email: teacher.email,
            username: teacher.username,
            password: teacher.username
        }
        const newTeacher = {
            title: teacher.title || 'S/N',
            objective: teacher.objective || 'S/N',
        };
        dispatch( startSaveTeacher( newPerson, newTeacher, newUser, toast ) );
        setTeacherDialog(false);
        formik.handleReset();
    }

    const handleTeacherUpdate = ( teacher ) => {
        dispatch( startUpdateTeacher( 
            teacher,
            {
                person_id: teacherUpdate.person.id,
                teacher_id: teacherUpdate.id,
                user_id: teacherUpdate.user.id
            }, 
            toast
         ));
        setTeacherDialog(false);
        setShowUpdate(false);
    }

    const handleTeacherDelete = ( teacher ) => {
        dispatch( startDeleteTeacher( 
            {
                user_id: teacher.user.id,
                teacher_id: teacher.id,
                person_id: teacher.person.id
            }, 
            toast 
        ));
    }

    const handleTeachersDelete = () => {
        dispatch( startDeleteManyTeachers(
            getTeachersKeys( selectedTeachers ),
            toast
        ));
        setSelectedTeachers([]);
    }

    const handleConfirmDeleteTeacher = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar el siguiente Docente?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleTeacherDelete( data ),
        });
    }

    const handleConfirmDeleteManyTeachers = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar los siguientes Docentes?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleTeachersDelete( data ),
        });
    }

    const openNew = () => {
        setTeacherDialog(true);
    }

    const openUpdate = ( teacher ) => {
        setTeacherUpdate({...teacher});
        formik.setValues({
            identification_type: getIdentificationTypeValue(
                teacher.person.identification_type
            ),
            identification: teacher.person.identification || '',
            name: teacher.person.name || '',
            last_name: teacher.person.last_name || '',
            gender: getGenderValue(teacher.person.gender),
            age: teacher.person.age || '',
            phone: teacher.person.phone || '',
            username: teacher.user.username || '',
            email: teacher.user.email || '',
            title: teacher.title,
            objective: teacher.objective
        });
        setTeacherDialog(true);
        setShowUpdate(true);
    }

    const hideDialog = () => {
        setTeacherDialog(false);
        setShowUpdate(false);
        formik.resetForm();
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
                label="Nuevo Docente" 
                icon="fas fa-plus" 
                className="p-button-primary mr-2" 
                onClick={openNew} 
            />
            <Button 
                label="Eliminar Docentes" 
                icon="fas fa-trash" 
                className="p-button-danger" 
                disabled={selectedTeachers.length < 2}
                onClick={handleConfirmDeleteManyTeachers} 
            />
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="fas fa-user-edit" 
                        tooltip='Actualizar Docente'
                        tooltipOptions={{position: 'bottom'}}
                        className="p-button-rounded p-button-warning mr-2" 
                        onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="fas fa-user-times"
                        tooltip='Eliminar Docente'
                        tooltipOptions={{position: 'bottom'}} 
                        className="p-button-rounded p-button-danger" 
                        onClick={() => handleConfirmDeleteTeacher(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const teacherDialogFooter = (
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

    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && 
        <small className="p-error">{formik.errors[name]}</small>;
    };

    useEffect(() => {
        handleLoadTeachers();
        return () => {
            dispatch( startRemoveTeachers() );
        }
    }, [handleLoadTeachers, dispatch]);

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbarTemplate}>
                    </Toolbar>
                    <DataTable
                        ref={dataTable} 
                        value={teachers} 
                        selection={selectedTeachers} 
                        globalFilter={globalFilter}
                        header={
                            <OwnerHeaderApp 
                                title='Administrar Docentes'
                                icon='fas fa-chalkboard-teacher mr-2 icon-primary'
                                placeholder='Buscar Docentes...'
                                withActive={false}
                                setGlobalFilter={handleSetGlobalFilter}
                                handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <RowTeacherExpasionTemplate
                                teacher={e}
                            />
                        }
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Docentes.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                        LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} 
                        docentes"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedTeachers(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column 
                            selectionMode="multiple" 
                            headerStyle={{ width: '3rem' }}
                        ></Column>
                        <Column
                            className='text-center'
                            field="person.identification" 
                            header="Identificación" 
                            sortable
                        ></Column>
                        <Column 
                            className='text-center'
                            field="person.name" 
                            header="Nombres" 
                            sortable
                        ></Column>
                        <Column 
                            className='text-center'
                            field="person.last_name" 
                            header="Apellidos" 
                            sortable
                        ></Column>
                        <Column 
                            className='text-center'
                            field="user.username" 
                            header="Nombre de Usuario"
                            sortable
                        ></Column>
                        <Column 
                            className='text-center'
                            field="user.email" 
                            header="Email" 
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
                                ? ('Actualizar Docente')
                                : ('Nuevo Docente')
                        }
                        visible={teacherDialog} 
                        onHide={hideDialog}
                        footer={teacherDialogFooter} 
                        className="p-fluid" 
                        style={{ width: '40vw' }} 
                    >
                        <div className="grid p-fluid mt-3">
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <Dropdown 
                                        id='identification_type'
                                        name= 'identification_type'
                                        optionLabel="label" 
                                        value={formik.values.identification_type} 
                                        options={identification_choices} 
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('identification_type') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='identification_type'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('identification') 
                                        })}
                                    >Tipo de Identificación*</label>
                                </span>
                                {getFormErrorMessage('identification_type')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='identification'
                                        name='identification'
                                        value={formik.values.identification}
                                        autoComplete="off"
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('identification') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='identification'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('identification') 
                                        })}
                                    >Identificación*</label>
                                </span>
                                {getFormErrorMessage('identification')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='name'
                                        name='name'
                                        autoComplete="off"
                                        value={formik.values.name}
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('name') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='name'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('name') 
                                        })}
                                    >Nombre*</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='last_name'
                                        name='last_name'
                                        autoComplete="off"
                                        value={formik.values.last_name}
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('last_name') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='last_name'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('last_name') 
                                        })}
                                    >Apellidos*</label>
                                </span> 
                                {getFormErrorMessage('last_name')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <Dropdown 
                                        id='gender'
                                        name='gender'
                                        optionLabel="label" 
                                        value={formik.values.gender} 
                                        options={gender_choices} 
                                        className={classNames({ 
                                            "p-invalid": isFormFieldValid('gender') 
                                        })}
                                        onChange={formik.handleChange}
                                        />
                                        <label 
                                            htmlFor='gender'
                                            className={classNames({ 'p-error': isFormFieldValid('identification') })}
                                        >Seleccione un Género*</label>
                                    </span>
                                {getFormErrorMessage('gender')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputNumber
                                        id='age'
                                        name= 'age'
                                        value={formik.values.age} 
                                        min={17} max={80}
                                        showButtons buttonLayout="horizontal"
                                        incrementButtonClassName="p-button-success" 
                                        decrementButtonClassName="p-button-danger" 
                                        incrementButtonIcon="fas fa-plus" 
                                        decrementButtonIcon="fas fa-minus" 
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('age') 
                                        })}
                                        onValueChange={formik.handleChange} 
                                    />
                                    <label 
                                        htmlFor='age'
                                        className={classNames({ 'p-error': 
                                            isFormFieldValid('age')
                                        })}
                                        style={{ marginLeft: '2.2em' }}
                                    >Edad</label>
                                </span>
                                {getFormErrorMessage('age')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='phone'
                                        name='phone'
                                        keyfilter="int"
                                        autoComplete="off"
                                        value={formik.values.phone}
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('phone') 
                                        })}
                                        onChange={formik.handleChange}
                                    /> 
                                    <label 
                                        htmlFor='phone'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('phone') 
                                        })}
                                    >Número de Teléfono</label>
                                </span>
                                {getFormErrorMessage('phone')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='email'
                                        name='email'
                                        value={formik.values.email}
                                        tooltip='Recomendación: ingresar el correo institucional.'
                                        autoComplete="off"
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('email') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='email'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('email') 
                                        })}
                                    >Correo Electrónico*</label>
                                </span>
                                {getFormErrorMessage('email')}  
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='username'
                                        name='username'
                                        value={formik.values.username.toLowerCase()}
                                        keyfilter={/[^\s]/}
                                        tooltip='Recomendación: concatene sus 
                                        nombres y los dos últimos dígitos de la cédula, no se
                                        permiten caracteres especiales (El usuario debe 
                                            ser único).'
                                        autoComplete="off"
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('username') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='username'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('username') 
                                        })}
                                    >Nombre de Usuario*</label>
                                </span>
                                {getFormErrorMessage('username')}  
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='password'
                                        name='password'
                                        value={formik.values.username}
                                        disabled={true}
                                        autoComplete="off"
                                        className={classNames({ 
                                            'p-invalid': formik.errors['username'] 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='password'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('username') 
                                        })}
                                    >Contraseña*</label>
                                </span>  
                                <small 
                                    id="password-help" 
                                    className="p-d-block"
                                >
                                    La contraseña será la misma que el nombre 
                                    de usuario.
                                </small>
                            </div>
                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputText
                                        id='title'
                                        name='title'
                                        value={formik.values.title}
                                        autoComplete="off"
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('title') 
                                        })}
                                        onChange={formik.handleChange} 
                                    />
                                    <label 
                                        htmlFor='title'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('title') 
                                        })}
                                    >Título de Docente</label>
                                </span>
                                {getFormErrorMessage('title')}  
                            </div>
                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputTextarea
                                        id='objective'
                                        name='objective'
                                        required rows={3} cols={20} 
                                        value={formik.values.objective}
                                        autoComplete="off"
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('objective') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label htmlFor='objective'>
                                        Objetivo del Docente para el Período Lectivo
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
