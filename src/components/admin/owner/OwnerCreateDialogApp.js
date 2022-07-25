import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { OwnerCreateFormApp } from './OwnerCreateFormApp';
import { startSaveAdmin } from '../../../actions/admin/admin';


export const OwnerCreateDialogApp = React.memo(({
  isShow,
  toast,
  handleSetShow
}) => {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      person: null,
    },
    validate: (data) => {
      let errors = {};

      if (!data.person) {
        errors.person = 'Se debe seleccionar una persona.';
      }
      if (!data.email) {
        errors.email = 'El email es requerido.';
      }
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Correo inválido. Ej: ejemplo@email.com.';
      }
      if (!data.username) {
        errors.username = 'El nombre de usuario es requerido.';
      } else if (data.username.length < 4) {
        errors.username = 'El nombre de usuario debe tener por lo menos 4 caracteres.';
      }
      if (!data.password) {
        errors.password = 'La contraseña de usuario es requerida.';
      } else if (data.password.length < 6) {
        errors.password = 'La contraseña de usuario debe tener por lo menos 6 caracteres.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveAdmin( data );
    }
  });
  
  const { values, errors, setFieldValue, handleReset, handleSubmit } = formik;

  const handleSubmitAdmin = ( data ) => {
    const newUser = {
      person: data.person.person,
      username: data.username,
      password: data.password,
      email: data.email,
      type: 0,
      is_active: true,
    };
    dispatch(startSaveAdmin( newUser, data.person.name, toast ));
    handleSetShow(false);
  }

  const handleConfirmSaveAdmin = ( data ) => {
    confirmDialog({
      message: '¿Está seguro de guardar el siguiente Administrador?',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitAdmin( data ),
    });
  }

  const handleSetFieldValue = useCallback(
    ( field, value ) => {
      setFieldValue( field, value );
    }, [setFieldValue],
  );

  const handleResetForm = useCallback(
    () => {
      handleReset();
    }, [handleReset],
  );

  const adminDialogFooter = (
    <React.Fragment>
      <div className='center-inside'>
        <Button
          label="Cancelar" 
          icon="fas fa-times-circle" 
          className="p-button-text p-button-danger" 
          onClick={() => handleSetShow(false)}
        />
        <Button 
          label="Guardar" 
          icon="fas fa-check-circle" 
          className="p-button-text p-button-success" 
          type='submit'
          onClick={handleSubmit}
        />
      </div>
    </React.Fragment>
  );

  return (
    <Dialog 
      header="Crear Nuevo Administrador" 
      visible={isShow} 
      style={{ width: '50vw' }} 
      footer={adminDialogFooter} 
      onHide={() => handleSetShow(false)}
    >
      <div className='grid p-fluid'>
        <OwnerCreateFormApp
          values={values}
          errors={errors}
          setFieldValue={handleSetFieldValue}
          handleReset={handleResetForm}
        />
      </div>
    </Dialog>
  )
});
