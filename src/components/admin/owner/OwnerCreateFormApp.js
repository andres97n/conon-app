import React, { useEffect } from 'react';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import { OwnerSearchApp } from './OwnerSearchApp';


export const OwnerCreateFormApp = React.memo(({
  values,
  errors,
  setFieldValue,
  handleReset
}) => {

  useEffect(() => {
    return () => {
      handleReset();
    }
  }, [handleReset]);

  return (
    <>
      <OwnerSearchApp
        person={values.person}
        setFieldValue={setFieldValue}
        errors={errors}
      />
      <div className="field col-6">
        <span className="p-float-label">
          <InputText
            id='email'
            name='email'
            value={values.email}
            autoComplete="off"
            className={classNames({ 'p-invalid': errors['email'] })}
            onChange={e => setFieldValue('email', e.target.value)}
          />
          <label 
            htmlFor='email'
            className={classNames({ 'p-error': errors['email'] })}
          >Correo Electrónico*</label>
        </span>
        <small className="p-error">{ errors['email'] }</small>
      </div>
      <div className="field col-6">
        <span className="p-float-label">
          <InputText
            id='username'
            name='username'
            value={values.username.toLowerCase()}
            keyfilter={/[^\s]/}
            tooltip='Recomendación: ingrese concatenando sus 
            nombres y los dos últimos dígitos de la cédula, no debe ingresar 
            tildes (El usuario debe ser único).'
            autoComplete="off"
            className={classNames({ 'p-invalid': errors['username'] })}
            onChange={e => setFieldValue('username', e.target.value)}
          />
          <label 
            htmlFor='username'
            className={classNames({ 'p-error': errors['username'] })}
          >Nombre de Usuario*</label>
        </span>
        <small className="p-error">{ errors['username'] }</small>
      </div>
      <div className='field col-12'>
        <div className='center-inside'>
          <div className="col-6">
            <span className="p-float-label">
              <Password
                id='password'
                name='password'
                value={values.password}
                toggleMask
                promptLabel='Ingrese una contraseña'
                weakLabel='Débil'
                mediumLabel='Medio'
                strongLabel='Fuerte'
                className={classNames(
                  { 'p-invalid': !!errors['password'] }
                )}
                onChange={e => setFieldValue('password', e.target.value)}
              />
              <label 
                htmlFor='password'
                className={classNames(
                  { 'p-error': !!errors['password'] }
                )}
              >Nueva Contraseña</label>
            </span> 
            <small className="p-error">{errors['password']}</small>
          </div>
        </div>
      </div>
    </>
  )
});
