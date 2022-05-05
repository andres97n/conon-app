import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useFormik } from 'formik';
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

import { startDeleteManyTeachers, startDeleteTeacher, startLoadTeachers, startRemoveTeachers, startSaveTeacher, startUpdateTeacher } from '../../../actions/admin/teacher';
import { getTeachersKeys, toCapitalize } from '../../../helpers/admin';
import { gender_choices, getGenderValue, getIdentificationTypeValue, identification_choices, isPhoneValid } from '../../../helpers/person';

export const TeacherScreen = () => {

    let emptyTeacher = {
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
        title: '',
        objective: '',
    }

    const dispatch = useDispatch();
    const { teachers, loading } = useSelector(state => state.dashboard.teacher)
    const [teacher, setTeacher] = useState(emptyTeacher);
    const [teacherUpdate, setTeacherUpdate] = useState(null);
    const [teacherDialog, setTeacherDialog] = useState(false);
    const [deleteTeacherDialog, setDeleteTeacherDialog] = useState(false);
    const [deleteTeachersDialog, setDeleteTeachersDialog] = useState(false);
    const [selectedTeachers, setSelectedTeachers] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const [showUpdate, setShowUpdate] = useState(false);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const formik = useFormik({
        initialValues: {
            identification_type: teacher.person.identification_type,
            identification: teacher.person.identification,
            name: teacher.person.name,
            last_name: teacher.person.last_name,
            gender: teacher.person.gender,
            age: teacher.person.age,
            phone: teacher.person.phone,
            username: teacher.username,
            email: teacher.email,
            title: teacher.title,
            objective: teacher.objective
        },
        validate: (data) => {
            let errors = {}

            if (!data.identification_type && data.identification_type !== 0) {
                errors.identification_type = 'El tipo de identificación es requerido.';
            } else if (data.identification_type > 1){
                console.log('entro');
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

            if (!data.title) {
                errors.title = 'El título del Docente es requerido.';
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
    
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const handleTeacherSubmit = ( teacher ) => {
        teacher.name = toCapitalize(teacher.name);
        teacher.last_name = toCapitalize(teacher.last_name);
        dispatch( startSaveTeacher( teacher, toast ) );
        setTeacherDialog(false);
        setTeacher(emptyTeacher);
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
        setTeacher(emptyTeacher);
        setTeacherDialog(false);
        setShowUpdate(false);
    }

    const handleTeacherDelete = () => {
        // Process
        dispatch( startDeleteTeacher( 
            {
                user_id: teacher.user.id,
                teacher_id: teacher.id,
                person_id: teacher.person.id
            }, 
            toast 
        ));
        setDeleteTeacherDialog(false);
        setTeacher(emptyTeacher);
    }

    const handleTeachersDelete = () => {
        dispatch( startDeleteManyTeachers(
            getTeachersKeys( selectedTeachers ),
            toast
        ));
        setDeleteTeachersDialog(false);
        setSelectedTeachers(null);
    }

    const openNew = () => {
        setTeacher(emptyTeacher);
        setTeacherDialog(true);
    }

    const openUpdate = ( teacher ) => {
        setTeacherUpdate({...teacher});
        formik.setValues({
            identification_type: getIdentificationTypeValue(teacher.person.identification_type),
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

    const hideDeleteTeacherDialog = () => {
        setDeleteTeacherDialog(false);
    }

    const hideDeleteTeachersDialog = () => {
        setDeleteTeachersDialog(false);
    }

    const confirmDeleteTeacher = ( teacher ) => {
        setTeacher(teacher);
        setDeleteTeacherDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteTeachersDialog(true);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
            <Button label="Nuevo Docente" icon="fas fa-plus" className="p-button-primary mr-2" onClick={openNew} />
            <Button label="Eliminar Docente/s" icon="fas fa-trash-alt"  className="p-button-danger" onClick={confirmDeleteSelected} 
            disabled={!selectedTeachers || !selectedTeachers.length}/>
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button 
                        icon="far fa-edit" className="p-button-rounded p-button-primary mr-2" onClick={() => openUpdate(rowData)} 
                    />
                    <Button 
                        icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteTeacher(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR DOCENTES</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const teacherDialogFooter = (
        <React.Fragment>
            <Button 
                label="Cancel" icon="fas fa-times-circle" 
                className="p-button-text p-button-danger" onClick={hideDialog}
            />
            <Button 
                label="Save" icon="fas fa-check-circle" 
                className="p-button-text p-button-success" type='submit'
                onClick={formik.handleSubmit}
            />
        </React.Fragment>
    );

    const deleteTeacherDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteTeacherDialog} />
            <Button label="Yes" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleTeacherDelete} />
        </React.Fragment>
    );

    const deleteTeachersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="fas fa-times-circle" className="p-button-text p-button-success" onClick={hideDeleteTeachersDialog} />
            <Button label="Yes" icon="fas fa-check-circle" className="p-button-text p-button-danger" onClick={handleTeachersDelete} />
        </React.Fragment>
    );

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
                        </div>
                    </div>
                </div>
            </div>
        );
    }



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
                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={teachers} 
                        selection={selectedTeachers} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Docentes.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} docentes"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedTeachers(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="person.identification" header="Identificación" sortable></Column>
                        <Column field="person.name" header="Nombres" sortable></Column>
                        <Column field="person.last_name" header="Apellidos" sortable></Column>
                        {/*USER DATA */}
                        <Column field="user.username" header="Nombre de Usuario"sortable></Column>
                        <Column field="user.email" header="Email" sortable></Column>
                        <Column body={actionBodyTemplate}></Column>
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
                        style={{ width: '550px' }} 
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
                                        className={classNames({ 'p-invalid': isFormFieldValid('identification_type') })}
                                        onChange={formik.handleChange}
                                    />
                                    <label 
                                        htmlFor='identification_type'
                                        className={classNames({ 'p-error': isFormFieldValid('identification') })}
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
                                        onChange={formik.handleChange}
                                        className={classNames({ 'p-invalid': isFormFieldValid('identification') })}
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
                                        name='gender'
                                        optionLabel="label" 
                                        value={formik.values.gender} 
                                        options={gender_choices} 
                                        onChange={formik.handleChange}
                                        className={classNames({ "p-invalid": isFormFieldValid('gender') })}
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
                                        value={formik.values.age} 
                                        onValueChange={formik.handleChange} 
                                        min={5} max={50}
                                        showButtons buttonLayout="horizontal"
                                        incrementButtonClassName="p-button-success" 
                                        decrementButtonClassName="p-button-danger" 
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
                                        nombres y los dos últimos dígitos de la cédula (El usuario debe ser único).'
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

                            <div className="field col-12">
                                <span className="p-float-label">
                                    <InputText
                                        id='title'
                                        name='title'
                                        value={formik.values.title}
                                        className={classNames({ 'p-invalid': isFormFieldValid('title') })}
                                        onChange={formik.handleChange}
                                        // placeholder='Teléfono de Contacto' 
                                    />
                                    <label 
                                        htmlFor='title'
                                        className={classNames({ 'p-error': isFormFieldValid('title') })}
                                    >Título de Docente*</label>
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
                                        className={classNames({ 'p-invalid': isFormFieldValid('objective') })}
                                        onChange={formik.handleChange}
                                        // placeholder='Observaciones'
                                    />
                                    <label htmlFor='objective'>
                                        Objetivo del Docente para el Período Lectivo
                                    </label>
                                </span>
                            </div>

                        </div>

                    </Dialog>

                    <Dialog 
                        visible={deleteTeacherDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteTeacherDialogFooter} 
                        onHide={hideDeleteTeacherDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {teacher && <span>¿Está seguro que desea eliminar a <b>{teacher.person.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteTeachersDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteTeachersDialogFooter} 
                        onHide={hideDeleteTeachersDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {teacher && <span>¿Está seguro que desea eliminar los siguientes <b>{selectedTeachers && selectedTeachers.length}</b> docentes seleccionados?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
