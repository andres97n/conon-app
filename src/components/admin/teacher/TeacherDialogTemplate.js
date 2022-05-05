import React from 'react';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import { gender_choices, identification_choices } from '../../../helpers/admin';
import { InputTextarea } from 'primereact/inputtextarea';

export const TeacherDialogTemplate = ({
    formik,
    showUpdate,
    hideDialog,
    teacherDialog,
    isFormFieldValid,
    teacherDialogFooter,
    getFormErrorMessage
}) => {
    console.log('HOLA DESDE TEACHER DIALOG TEMPLATE');
    return (
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
                    <Dropdown 
                        id='identification_type'
                        name= 'identification_type'
                        placeholder="Tipo de Identificación*"
                        optionLabel="label" 
                        value={formik.values.identification_type} 
                        options={identification_choices} 
                        className={classNames({ 'p-invalid': isFormFieldValid('identification_type') })}
                        onChange={formik.handleChange}
                    />
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
                    <Dropdown 
                        id='gender'
                        name= 'gender'
                        placeholder="Seleccione un Género*"
                        optionLabel="label" 
                        value={formik.values.gender} 
                        options={gender_choices} 
                        onChange={formik.handleChange}
                        className={classNames({ 'p-invalid': isFormFieldValid('gender') })}
                        />
                    {getFormErrorMessage('gender')}
                </div>

                <div className="field col-6">
                    <span className="p-float-label">
                        <InputNumber 
                            id='age'
                            name= 'age'
                            value={formik.values.age} 
                            onValueChange={formik.handleChange} 
                            min={0} max={50}
                            showButtons buttonLayout="horizontal"
                            decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="fas fa-plus" decrementButtonIcon="fas fa-minus" 
                            className={classNames({ 'p-invalid': isFormFieldValid('age') })}
                            // placeholder='Edad*'
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
                            value={formik.values.username}
                            className={classNames({ 'p-invalid': isFormFieldValid('username') })}
                            onChange={formik.handleChange}
                            // placeholder='Nombre de Usuario*'
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
                            className={classNames({ 'p-invalid': isFormFieldValid('email') })}
                            onChange={formik.handleChange}
                            // placeholder='Correo Electrónico*'
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
                            keyfilter='int'
                            value={formik.values.title}
                            className={classNames({ 'p-invalid': isFormFieldValid('title') })}
                            onChange={formik.handleChange}
                            // placeholder='Teléfono de Contacto' 
                        />
                        <label 
                            htmlFor='title'
                            className={classNames({ 'p-error': isFormFieldValid('title') })}
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
                            className={classNames({ 'p-invalid': isFormFieldValid('objective') })}
                            onChange={formik.handleChange}
                            // placeholder='Observaciones'
                        />
                        <label htmlFor='objective'>
                            Objetivo
                        </label>
                    </span>
                    {getFormErrorMessage('objective')}  
                </div>

            </div>

        </Dialog>
    )
}
