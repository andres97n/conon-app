import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { OwnerUpdateFormApp } from './OwnerUpdateFormApp';

import { startUpdateAdmin } from '../../../actions/admin/admin';


export const OwnerUpdateDialogApp = React.memo(({
  admin,
  isShow,
  toast,
  handleSetShow
}) => {

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      person: {},
      email: '',
      username: '',
    },
    validate: (data) => {
      let errors = {};

      if (!data.email) {
        errors.email = 'El email es requerido.';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = 'Correo inválido. Ej: ejemplo@email.com.';
      }
      if (!data.username) {
        errors.username = 'El nombre de usuario es requerido.';
      } else if (data.username.length < 4) {
        errors.username = 'El nombre de usuario debe tener por lo menos 4 caracteres.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmUpdateAdmin( data );
    }
  });
  
  const { values, errors, setValues, setFieldValue, handleReset, handleSubmit } = formik;

  const handleUpdateAdmin = ( data ) => {
    const newAdmin = {
      person: data.person.id,
      username: data.username,
      email: data.email,
      type: 0,
      is_active: true,
    };
    const adminUpdated = { 
      ...admin, 
      username: data.username,
      email: data.email 
    };
    dispatch( startUpdateAdmin( newAdmin, adminUpdated, toast ) );
    handleSetShow( false );
    handleReset();
  }

  const handleConfirmUpdateAdmin = ( data ) => {
    confirmDialog({
      message: '¿Está seguro de guardar el siguiente Administrador?',
      header: 'Confirmación de Edición',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleUpdateAdmin( data ),
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

  const handleSetInitValues = useCallback(
    ( values ) => {
      setValues({
        person: values.person,
        email: values.email,
        username: values.username
      });
    }, [setValues],
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
      header="Actualizar Administrador" 
      visible={isShow} 
      style={{ width: '50vw' }} 
      footer={adminDialogFooter} 
      onHide={() => handleSetShow(false)}
    >
      <div className='grid p-fluid mt-3'>
        <OwnerUpdateFormApp
          admin={admin}
          values={values}
          errors={errors}
          setFieldValue={handleSetFieldValue}
          handleReset={handleResetForm}
          handleSetInitValues={handleSetInitValues}
        />
      </div>
    </Dialog>
  )
});
