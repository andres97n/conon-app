import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { startDeleteManyStudents, startDeleteStudent, startLoadStudents, startRemoveStudents, startSaveStudent, startUpdateStudent } from '../../../actions/admin/student';
import { getStudentsKeys, setRangeNumberInput, toCapitalize } from '../../../helpers/admin';
import { gender_choices, getGenderValue, getIdentificationTypeValue, identification_choices, isPhoneValid } from '../../../helpers/person';

export const StudentScreen = () => {

    // TODO: Agilizar la carga de los Estudiantes por medio del Paginador
    //  de la tabla y también la búsqueda de Estudiantes.

    // TODO: Hacer pruebas con la actualización del Token, fundamentalmente
    //  jugar cuando el Token caduca. 


    // TODO: Revisar todos los formularios de ingreso de información, y comprobar si es que
    //  existe necesidad de hacer comprobaciones cuando el formulario pierde el foco y así
    //      mejorar la retroalimentación al usuario.

    // TODO: Hacer que el nombre de usuario del estudiante sea el mismo para la contraseña
    //  de tal manera que el estudiante lo pueda cambiar en el LoginScreen

    //TODO: Tener presente que las validaciones más importantes para el User deberían ser
    //  antes de guardar, ya que así se evita inconvenientes con la creación de Person o
    //      Student.

    let emptyStudent = {
        id: null,
        username: '',
        email: '',
        person: {
            identification_type: null,
            identification: '',
            name: '',
            last_name: '',
            gender: null,
            age: null,
            phone: '',
        },
        representative_name: '',
        emergency_contact: '',
        expectations: '',
        observations: '',
    }

    const dispatch = useDispatch();
    const { students, loading } = useSelector(state => state.dashboard.student)
    const [student, setStudent] = useState(emptyStudent);
    const [studentUpdate, setStudentUpdate] = useState(null);
    const [studentDialog, setStudentDialog] = useState(false);
    const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
    const [deleteStudentsDialog, setDeleteStudentsDialog] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const formik = useFormik({
        initialValues: {
            identification_type: null,
            identification: student.person.identification,
            name: student.person.name,
            last_name: student.person.last_name,
            gender: student.person.gender,
            age: student.person.age,
            phone: student.person.phone,
            username: student.username,
            email: student.email,
            representative_name: student.representative_name,
            emergency_contact: student.emergency_contact,
            observations: student.observations,
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
            } else if (data.identification_type === 0 && data.identification.length !== 10) {
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

            if (!data.age) {
                errors.age = 'La edad es requerida.';
            } else if ( data.age < 5 || data > 50 ) {
                errors.age = 'La edad no puede ser menor a 5 o mayor que 50.';                
            }

            if (!data.phone) {
                errors.phone = 'El número de contacto es requerido.';
            } else if (!isPhoneValid(data.phone)) {
                errors.phone = 'El número de contacto no puede contener este número de caratecteres, revise por favor.'
            }

            if (!data.username) {
                errors.username = 'El nombre de usuario es requerido.';
            }

            if (!data.email) {
                errors.email = 'El email es requerido.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
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
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleLoadStudents = useCallback( () => {
        dispatch(startLoadStudents());
    }, [dispatch]);

    const handleStudentSubmit = ( student ) => {
        // Process
        student.name = toCapitalize( student.name );
        student.last_name = toCapitalize( student.last_name );
        dispatch( startSaveStudent(student, toast) );
        setStudentDialog(false);
        setStudent(emptyStudent);
    }

    const handleStudentUpdate = ( student ) => {
        // Process
        dispatch( startUpdateStudent( 
            student,
            {
                person_id: studentUpdate.person.id,
                student_id: studentUpdate.id,
                user_id: studentUpdate.user.id
            }, 
            toast
         ));
        setStudent(emptyStudent);
        setStudentDialog(false);
        setShowUpdate(false);
    }

    const handleStudentDelete = () => {
        dispatch( startDeleteStudent( 
            {
                user_id: student.user.id,
                student_id: student.id,
                person_id: student.person.id
            }, toast 
        ));
        setDeleteStudentDialog(false);
        setStudent(emptyStudent);
    }

    const handleStudentsDelete = () => {
        // PROCESS
        dispatch( startDeleteManyStudents(
            getStudentsKeys( selectedStudents ),
            toast
        ));
        setDeleteStudentsDialog(false);
        setSelectedStudents(null);
    }

    const openNew = () => {
        setStudent(emptyStudent);
        setStudentDialog(true);
    }

    const openUpdate = ( student ) => {
        setStudentUpdate({...student});
        formik.setValues({
            identification_type: getIdentificationTypeValue(student.person.identification_type),
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

    const hideDeleteStudentDialog = () => {
        setDeleteStudentDialog(false);
    }

    const hideDeleteStudentsDialog = () => {
        setDeleteStudentsDialog(false);
    }

    const confirmDeleteStudent = ( student ) => {
        setStudent(student);
        setDeleteStudentDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteStudentsDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Nuevo Estudiante" 
                    icon="fas fa-plus" 
                    className="p-button-primary mr-2" 
                    onClick={openNew}
                />
                <Button 
                    label="Eliminar Estudiantes" 
                    icon="fas fa-trash-alt"  
                    className="p-button-danger" 
                    onClick={confirmDeleteSelected} 
                    disabled={!selectedStudents || !selectedStudents.length}
                />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="fas fa-pen" 
                        className="p-button-rounded p-button-primary mr-2" 
                        onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="pi pi-trash" 
                        className="p-button-rounded p-button-danger" 
                        onClick={() => confirmDeleteStudent(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR ESTUDIANTES</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

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

    const deleteStudentDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteStudentDialog} />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleStudentDelete} />
        </React.Fragment>
    );

    const deleteStudentsDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteStudentsDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleStudentsDelete} 
            />
        </React.Fragment>
    );

    // TODO: Poner diseño en la expansión

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Detalle de {data.person.name} {data.person.last_name}</h5>
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className='card'>
                            <div className="p-d-flex p-flex-wrap">
                                <div className="p-mr-2 p-mb-2">
                                    <h6>Tipo de Identificación</h6>
                                    {data.person.identification_type}
                                </div>
                                <div className='p-mr-2 p-mb-2'>
                                    <h6>Identificación</h6>
                                    {data.person.identification}
                                </div>
                                <div>
                                    <h6>Nombres</h6>
                                    {data.person.name}
                                </div>
                                <div>
                                    <h6>Apellidos</h6>
                                    {data.person.last_name}
                                </div>
                                <div>
                                    <h6>Género</h6>
                                    {data.person.gender}
                                </div>
                            </div>
                            <div className="p-d-flex p-flex-wrap">
                                <div className="p-mr-2 p-mb-2">
                                    <h6>Edad</h6>
                                    {data.person.age}
                                </div>
                                <div className='p-mr-2 p-mb-2'>
                                    <h6>Teléfono</h6>
                                    {data.person.identification}
                                </div>
                                <div>
                                    <h6>Nombres</h6>
                                    {data.person.name}
                                </div>
                                <div>
                                    <h6>Apellidos</h6>
                                    {data.person.last_name}
                                </div>
                                <div>
                                    <h6>Género</h6>
                                    {data.person.gender}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        handleLoadStudents();
        return () => {
            dispatch( startRemoveStudents() )
        }
    }, [handleLoadStudents, dispatch]); 
    

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>

                    <DataTable 
                        ref={dataTable} 
                        value={students} 
                        selection={selectedStudents} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        className="datatable-responsive"
                        dataKey="id" paginator rows={10} 
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        // currentPageReportTemplate="Mostrando registros {first} al {last} de {totalRecords} estudiantes"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} estudiantes"
                        emptyMessage='No existen Estudiantes.'
                        resizableColumns columnResizeMode="expand"
                        onSelectionChange={(e) => setSelectedStudents(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        // rowsPerPageOptions={[5, 10, 25]}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="person.identification" header="Identificación" sortable></Column>
                        <Column field="person.name" header="Nombres" sortable></Column>
                        <Column field="person.last_name" header="Apellidos" sortable></Column>
                        {/*USER DATA */}
                        <Column field="user.username" header="Nombre de Usuario"sortable></Column>
                        <Column field="user.email" header="Email" sortable></Column>
                        {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column> */}
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                {/* TODO: Revisar el diseño de los dropdowns */}

                    <Dialog 
                        modal 
                        visible={studentDialog} 
                        style={{ width: '550px' }} 
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
                        {/* {
                            (studentDialog)
                                && (
                                    <div className='field col-12'>
                                        <Messages ref={warningMsg} />
                                    </div>
                                )
                        } */}
                            <div className="field col-6">
                                <span className="p-float-label">
                                    <Dropdown 
                                        id='identification_type'
                                        name= 'identification_type'
                                        optionLabel="label" 
                                        value={formik.values.identification_type} 
                                        options={identification_choices} 
                                        className={classNames({ 'p-invalid': isFormFieldValid('identification_type') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='identification_type'
                                        className={classNames({ 'p-error': isFormFieldValid('identification_type') })}
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
                                        className={classNames({ 'p-invalid': isFormFieldValid('identification') })}
                                        onChange={formik.handleChange}
                                        // placeholder='Identificación*' 
                                    />
                                    <label 
                                        htmlFor='identification'
                                        className={classNames({ 'p-error': isFormFieldValid('identification') })}
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
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('name') })}
                                        // placeholder='Nombres*' 
                                    />
                                    <label 
                                        htmlFor='name'
                                        className={classNames({ 'p-error': isFormFieldValid('name') })}
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
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('last_name') })}
                                        // placeholder='Apellidos*' 
                                    />
                                    <label 
                                        htmlFor='last_name'
                                        className={classNames({ 'p-error': isFormFieldValid('last_name') })}
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
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('gender') })}
                                    />
                                    <label 
                                        htmlFor='gender'
                                        className={classNames({ 'p-error': isFormFieldValid('identification') })}
                                    > Seleccione un Género*</label>
                                </span>
                                {getFormErrorMessage('gender')}
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputNumber 
                                        id='age'
                                        name= 'age'
                                        // Revisar método y hacerlo en onBlur
                                        value={setRangeNumberInput(formik.values.age, 50, 4)} 
                                        onValueChange={formik.handleChange} 
                                        min={4} max={50}
                                        showButtons buttonLayout="horizontal"
                                        decrementButtonClassName="p-button-danger" 
                                        incrementButtonClassName="p-button-success" 
                                        incrementButtonIcon="fas fa-plus" 
                                        decrementButtonIcon="fas fa-minus" 
                                        className={classNames({ 'p-invalid': isFormFieldValid('age') })}
                                    />
                                    <label 
                                        htmlFor='age'
                                        className={classNames({ 'p-error': isFormFieldValid('age')})}
                                        style={{ marginLeft: '2.2em' }}
                                    >Edad*</label>
                                </span>
                                {getFormErrorMessage('age')}
                            </div>

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputText
                                        id='phone'
                                        name='phone'
                                        keyfilter="int"
                                        value={formik.values.phone}
                                        className={classNames({ 'p-invalid': isFormFieldValid('phone') })}
                                        onChange={formik.handleChange}
                                        // placeholder='Número de Teléfono*' 
                                    /> 
                                    <label 
                                        htmlFor='phone'
                                        className={classNames({ 'p-error': isFormFieldValid('phone') })}
                                    >Número de Teléfono*</label>
                                </span>
                                {getFormErrorMessage('phone')}
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='username'
                                        name='username'
                                        value={formik.values.username.toLowerCase()}
                                        keyfilter={/[^\s]/}
                                        tooltip='Recomendación: ingrese concatenando sus 
                                        nombres y los dos últimos dígitos de la cédula, no debe ingresar 
                                        tildes (El usuario debe ser único).'
                                        className={classNames({ 'p-invalid': isFormFieldValid('username') })}
                                        onChange={formik.handleChange}
                                        tooltipOptions={{event: 'focus'}}
                                    />
                                    <label 
                                        htmlFor='username'
                                        className={classNames({ 'p-error': isFormFieldValid('username') })}
                                    >Nombre de Usuario*</label>
                                </span>
                                {getFormErrorMessage('username')}  
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='email'
                                        name='email'
                                        value={formik.values.email}
                                        tooltip='Recomendación: ingresar el correo institucional.'
                                        className={classNames({ 'p-invalid': isFormFieldValid('email') })}
                                        onChange={formik.handleChange}
                                        tooltipOptions={{event: 'focus'}}
                                    />
                                    <label 
                                        htmlFor='email'
                                        className={classNames({ 'p-error': isFormFieldValid('email') })}
                                    >Correo Electrónico*</label>
                                </span>
                                {getFormErrorMessage('email')}  
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='representative_name'
                                        name='representative_name'
                                        value={formik.values.representative_name}
                                        className={classNames({ 'p-invalid': isFormFieldValid('representative_name') })}
                                        onChange={formik.handleChange}
                                        // placeholder='Nombre del Representante' 
                                    />
                                    <label 
                                        htmlFor='representative_name'
                                        className={classNames({ 'p-error': isFormFieldValid('representative_name') })}
                                    >Nombre del Representante</label>
                                </span>
                                {getFormErrorMessage('representative_name')}  
                            </div>

                            <div className="field col-6">
                                <span className="p-float-label">
                                    <InputText
                                        id='emergency_contact'
                                        name='emergency_contact'
                                        keyfilter='int'
                                        value={formik.values.emergency_contact}
                                        className={classNames({ 'p-invalid': isFormFieldValid('emergency_contact') })}
                                        onChange={formik.handleChange}
                                        // placeholder='Teléfono de Contacto' 
                                    />
                                    <label 
                                        htmlFor='emergency_contact'
                                        className={classNames({ 'p-error': isFormFieldValid('emergency_contact') })}
                                    >Teléfono de Contacto</label>
                                </span>
                                {getFormErrorMessage('emergency_contact')}  
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
                                        // placeholder='Observaciones'
                                    />
                                    <label htmlFor='observations'>
                                        Observaciones
                                    </label>
                                </span>
                                {getFormErrorMessage('observations')}  
                            </div>

                        </div>

                    </Dialog>

                    <Dialog 
                        visible={deleteStudentDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteStudentDialogFooter} 
                        onHide={hideDeleteStudentDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {student && <span>¿Está seguro que desea eliminar a <b>{student.person.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteStudentsDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteStudentsDialogFooter} 
                        onHide={hideDeleteStudentsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {student && <span>¿Está seguro que desea eliminar los <b>{selectedStudents && selectedStudents.length}</b> estudiantes seleccionados?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
