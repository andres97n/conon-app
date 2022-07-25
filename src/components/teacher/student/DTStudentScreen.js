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
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';

import { OwnerHeaderApp } from '../../admin/owner/OwnerHeaderApp';
import { RowStudentExpansionApp } from '../../admin/student/RowStudentExpansionApp';

import { 
    startDeleteStudent, 
    startLoadStudents, 
    startRemoveStudents, 
    startSaveStudent, 
    startUpdateStudent
} from '../../../actions/admin/student';
import { 
    gender_choices, 
    getGenderValue, 
    getIdentificationTypeValue, 
    identification_choices, 
    isPhoneValid 
} from '../../../helpers/person';
import { setRangeNumberInput, toCapitalize } from '../../../helpers/admin';

export const DTStudentScreen = () => {

    const dispatch = useDispatch();
    const { students, loading } = useSelector(state => state.dashboard.student);
    const [studentUpdate, setStudentUpdate] = useState(null);
    const [studentDialog, setStudentDialog] = useState(false);
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
            age: 0,
            phone: '',
            username: '',
            email: '',
            representative_name: '',
            emergency_contact: '',
            observations: '',
        },
        validate: (data) => {
            let errors = {}

            if (!data.identification_type && data.identification_type !== 0) {
                errors.identification_type = 'El tipo de identificación es requerido.';
            } else if (data.identification_type < 1 && data.identification_type > 2) {
                errors.identification_type = 'El tipo de identificación es requerido.';
            }
            if (!data.identification) {
                errors.identification = 'La identificación es requerida.';
            } else if (
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
            } else if (data.gender < 1 || data.gender > 3) {
                errors.gender = 'El género es requerido.';
            }
            if ( data.age < 5 || data > 50 ) {
                errors.age = 'La edad no puede ser menor a 5 o mayor que 50.';                
            }
            if (data.phone && !isPhoneValid(data.phone)) {
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
            if (data.emergency_contact && !isPhoneValid(data.emergency_contact)) {
                errors.emergency_contact = 'El número de contacto no puede contener este número de caratecteres, revise por favor.'
            }

            return errors;
        },
        onSubmit: (data) => {
            if (showUpdate) {
                handleStudentUpdate(data)
            } else {
                handleStudentSubmit(data);
            }
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const handleLoadStudents = useCallback( () => {
        dispatch( startLoadStudents() );
    }, [dispatch]);

    const handleRemoveStudents = useCallback(
        () => {
          dispatch( startRemoveStudents() );
        }, [dispatch],
    );

    const handleStudentSubmit = ( student ) => {
        student.name = toCapitalize( student.name );
        student.last_name = toCapitalize( student.last_name );
        const newPerson = {
            identification_type: student.identification_type,
            identification: student.identification,
            name: student.name,
            last_name: student.last_name,
            gender: student.gender,
            age: student.age || 0,
            phone: student.phone,
        };
        const newUser = {
            email: student.email,
            username: student.username,
            password: student.username
        }
        const newStudent = {
            representative_name: student.representative_name || 'S/N',
            emergency_contact: student.emergency_contact,
            expectations: {},
            observations: student.observations || 'S/N'
        };
        dispatch( startSaveStudent(newPerson, newUser, newStudent, toast) );
        setStudentDialog(false);
        formik.resetForm();
    }

    const handleStudentUpdate = ( student ) => {
        dispatch( startUpdateStudent( 
            student,
            {
                person_id: studentUpdate.person.id,
                student_id: studentUpdate.id,
                user_id: studentUpdate.user.id
            }, 
            toast
         ));
        setStudentDialog(false);
        setShowUpdate(false);
    }

    const handleStudentDelete = ( student ) => {
        dispatch( startDeleteStudent( 
            {
                user_id: student.user.id,
                student_id: student.id,
                person_id: student.person.id
            }, toast 
        ));
    }

    const handleConfirmDeleteTeacher = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de eliminar el siguiente Estudiante?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleStudentDelete( data ),
        });
    }

    const openNew = () => {
        setStudentDialog(true);
    }

    const openUpdate = ( student ) => {
        setStudentUpdate({...student});
        formik.setValues({
            identification_type: getIdentificationTypeValue(
                student.person.identification_type
            ),
            identification: student.person.identification || '',
            name: student.person.name || '',
            last_name: student.person.last_name || '',
            gender: getGenderValue(student.person.gender),
            age: student.person.age || '',
            phone: student.person.phone || '',
            username: student.user.username || '',
            email: student.user.email || '',
            representative_name: student.representative_name || '',
            emergency_contact: student.emergency_contact || '',
            observations: student.observations || '',
        })
        setStudentDialog(true);
        setShowUpdate(true);
    }

    const hideDialog = () => {
        setStudentDialog(false);
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
                    label="Nuevo Estudiante" 
                    icon="fas fa-user-plus" 
                    className="p-button-primary mr-2" 
                    onClick={openNew} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="fas fa-user-edit" 
                        className="p-button-rounded p-button-warning mr-2" 
                        tooltip='Editar Estudiante'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="fas fa-user-times" 
                        className="p-button-rounded p-button-danger"
                        tooltip='Eliminar Estudiante'
                        tooltipOptions={{position:'bottom'}} 
                        onClick={() => handleConfirmDeleteTeacher(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const studentDialogFooter = (
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
        handleLoadStudents();
        return () => {
            handleRemoveStudents();
        }
    }, [handleLoadStudents, handleRemoveStudents]); 

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbarTemplate}
                    ></Toolbar>
                    <DataTable
                        ref={dataTable} 
                        value={students} 
                        globalFilter={globalFilter}
                        header={
                            <OwnerHeaderApp
                              title={'Administrar Estudiantes'}
                              icon={'fas fa-user-graduate mr-2 icon-primary'}
                              placeholder={'Buscar Estudiante...'}
                              withActive={false}
                              setGlobalFilter={handleSetGlobalFilter}
                              handleNewData={() => {}}
                            />
                        }
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={(e) => 
                            <RowStudentExpansionApp 
                                student={e}
                            />
                        }
                        selectionMode='single'
                        className="datatable-responsive"
                        dataKey="id" paginator rows={10} 
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                        LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} 
                        estudiantes"
                        emptyMessage='No existen Estudiantes.'
                        resizableColumns columnResizeMode="expand"
                        onRowToggle={(e) => setExpandedRows(e.data)}
                    >
                        <Column 
                            expander 
                            style={{ width: '4em' }} 
                        />
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
                        visible={studentDialog} 
                        style={{ width: '40vw' }} 
                        header={
                            showUpdate
                                ? ("Actualizar Estudiante")
                                : ("Nuevo Estudiante")
                        } 
                        className="p-fluid" 
                        footer={studentDialogFooter} 
                        onHide={hideDialog}
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
                                            'p-invalid': isFormFieldValid(
                                                'identification_type'
                                            )})}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='identification_type'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid(
                                                'identification_type'
                                            )})}
                                > Tipo de Identificación*</label>
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
                                    > Identificación*</label>
                                </span>
                                {getFormErrorMessage('identification')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='name'
                                        name='name'
                                        value={formik.values.name}
                                        autoComplete="off"
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
                                    > Nombre*</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='last_name'
                                        name='last_name'
                                        value={formik.values.last_name}
                                        autoComplete="off"
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
                                    > Apellidos*</label>
                                </span> 
                                {getFormErrorMessage('last_name')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <Dropdown 
                                        id='gender'
                                        name= 'gender'
                                        optionLabel="label" 
                                        value={formik.values.gender} 
                                        options={gender_choices} 
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('gender') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='gender'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('identification') 
                                        })}
                                    > Seleccione un Género*</label>
                                </span>
                                {getFormErrorMessage('gender')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputNumber 
                                        id='age'
                                        name= 'age'
                                        value={setRangeNumberInput(formik.values.age, 50, 4)} 
                                        min={4} max={50}
                                        showButtons buttonLayout="horizontal"
                                        decrementButtonClassName="p-button-danger" 
                                        incrementButtonClassName="p-button-success" 
                                        incrementButtonIcon="fas fa-plus" 
                                        decrementButtonIcon="fas fa-minus" 
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('age') 
                                        })}
                                        onValueChange={formik.handleChange} 
                                    />
                                    <label 
                                        htmlFor='age'
                                        style={{ marginLeft: '2.2em' }}
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('age')
                                        })}
                                    >Edad*</label>
                                </span>
                                {getFormErrorMessage('age')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='phone'
                                        name='phone'
                                        keyfilter="int"
                                        value={formik.values.phone}
                                        autoComplete="off"
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
                                    >Número de Teléfono*</label>
                                </span>
                                {getFormErrorMessage('phone')}
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='email'
                                        name='email'
                                        value={formik.values.email}
                                        autoComplete="off"
                                        tooltip='Recomendación: ingresar el correo 
                                        institucional.'
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
                                        autoComplete="off"
                                        tooltip='Recomendación: ingrese concatenando sus 
                                        nombres y los dos últimos dígitos de la cédula, 
                                        no debe ingresar tildes (El usuario debe ser único).'
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
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='representative_name'
                                        name='representative_name'
                                        autoComplete="off"
                                        value={formik.values.representative_name}
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid(
                                                'representative_name'
                                            )})}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='representative_name'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('representative_name') 
                                        })}
                                    >Nombre del Representante</label>
                                </span>
                                {getFormErrorMessage('representative_name')}  
                            </div>
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='emergency_contact'
                                        name='emergency_contact'
                                        value={formik.values.emergency_contact}
                                        keyfilter='int'
                                        autoComplete="off"
                                        className={classNames({ 
                                            'p-invalid': isFormFieldValid('emergency_contact') 
                                        })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='emergency_contact'
                                        className={classNames({ 
                                            'p-error': isFormFieldValid('emergency_contact') 
                                        })}
                                    >Teléfono del Representante</label>
                                </span>
                                {getFormErrorMessage('emergency_contact')}  
                            </div>
                            <div className="col-12">
                                <span className="p-float-label">
                                    <InputTextarea 
                                        id='observations'
                                        name='observations'
                                        autoComplete="off"
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
                                {getFormErrorMessage('observations')}  
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
