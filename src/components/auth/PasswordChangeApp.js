import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import { startChangeUserPassword, startClearIsUsernameValid } from '../../actions/auth';
import { startRemoveUiUser } from '../../actions/ui';

export const PasswordChangeApp = React.memo(() => {

    const dispatch = useDispatch();
    const { uiUser } = useSelector(state => state.ui);
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            repeatedPassword: '',
        },
        validate: (data) => {
            let errors = {}
            if (!data.newPassword) {
                errors.newPassword = 'La nueva contraseña es requerida.';
            } else if (data.newPassword.length < 6) {
                errors.newPassword = 'La contraseña no puede tener menos de 6 caracteres.';
            } else if (data.newPassword !== data.repeatedPassword){
                errors.newPassword = 'Las contraseñas ingresadas no se parecen.';
            }
            if (!data.repeatedPassword) {
                errors.repeatedPassword = 'Debe repetir la nueva contraseña.';
            } else if (data.repeatedPassword.length < 6) {
                errors.repeatedPassword = 
                'La contraseña no puede tener menos de 6 caracteres.';
            } else if (data.repeatedPassword !== data.newPassword){
                errors.repeatedPassword = 'Las contraseñas ingresadas no se parecen.';
            }
            return errors;
        },
        onSubmit: (data) => {
            handleConfirmChangePassword(data);
            formik.resetForm();
        }
    });
    const { values, errors, handleChange, handleSubmit } = formik;
    
    const handleRemoveUiUser = useCallback(
      () => {
        dispatch( startRemoveUiUser() );
      }, [dispatch],
    );
    
    const handleBackToLoginScreen = () => {
        dispatch( startClearIsUsernameValid() );
    }

    const handleConfirmChangePassword = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de guardar esta contraseña?',
          header: 'Panel de Confirmación',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, guardar',
          rejectLabel: 'No guardar',
          accept: () => handleChangePassword( data )
        });
    }

    const handleChangePassword = ( data ) => {
        const newPasswords = {
            password: data.newPassword,
            repeated_password: data.repeatedPassword
        }
        dispatch( startChangeUserPassword( uiUser.id, newPasswords ) );
        handleBackToLoginScreen();
    }

    useEffect(() => {
      return () => {
        handleRemoveUiUser();
      }
    }, [handleRemoveUiUser]);

  return (
    <div className='grid p-fluid'>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='col-10'>
                    <span className="p-float-label">
                        <Password
                            id='newPassword'
                            name='newPassword'
                            value={values.newPassword}
                            toggleMask
                            promptLabel='Ingrese una contraseña'
                            weakLabel='Débil'
                            mediumLabel='Medio'
                            strongLabel='Fuerte'
                            className={classNames(
                                { 'p-invalid': !!errors['newPassword'] }
                            )}
                            onChange={handleChange}
                        />
                        <label 
                            htmlFor='newPassword'
                            className={classNames(
                                { 'p-error': !!errors['newPassword'] }
                            )}
                        >Nueva Contraseña</label>
                    </span> 
                    <small className="p-error">{errors['newPassword']}</small>
                </div>
            </div>
        </div>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='field col-10'>
                    <span className="p-float-label">
                        <Password
                            id='repeatedPassword'
                            name='repeatedPassword'
                            value={values.repeatedPassword}
                            toggleMask
                            className={classNames(
                                { 'p-invalid': !!errors['repeatedPassword'] }
                            )}
                            onChange={handleChange}
                        />
                        <label 
                            htmlFor='repeatedPassword'
                            className={classNames(
                                { 'p-error': !!errors['repeatedPassword'] }
                            )}
                        >Repetir Contraseña</label>
                    </span> 
                    <small className="p-error">{errors['repeatedPassword']}</small>
                </div>
            </div>
        </div>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='col-2'>
                    <Button
                        icon='fas fa-hand-point-left'
                        tooltip='Regresar'
                        tooltipOptions={{position: 'bottom'}}
                        className="p-button-rounded p-button-raised p-button-primary" 
                        onClick={handleBackToLoginScreen}
                    />
                </div>
                <div className='col-9'>
                    <Button
                        label="Cambiar Contraseña"
                        icon='fas fa-key'
                        type='submit' 
                        className="p-button-raised p-button-success" 
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    </div>
  )
});
