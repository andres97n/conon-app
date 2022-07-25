import React, { useEffect } from 'react';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';


export const OwnerUpdateFormApp = React.memo(({
  admin,
  values,
  errors,
  setFieldValue,
  handleReset,
  handleSetInitValues
}) => {

  useEffect(() => {
    if (admin) {
      handleSetInitValues(
        {
          person: admin.person,
          email: admin.email,
          username: admin.username
        }
      );
    }

    return () => {
      handleReset();
    }
  }, [admin, handleSetInitValues, handleReset]);

  return (
    <>
      {
       values.person?.name && (
        <div className='field col-12'>
          <h5 className='text-center'>{values.person.name}</h5>
        </div>
       ) 
      }
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
            caracteres especiales (El usuario debe ser único).'
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
    </>
  )
});
