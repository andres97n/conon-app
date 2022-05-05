import React from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { validateUsername } from '../../actions/auth';


export const ValidateUsernameApp = React.memo(() => {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validate: (data) => {
            let errors = {}

            if (!data.username) {
                errors.username = 'Se debe ingresar el Nombre de Usuario.';
            }

            return errors;
        },
        onSubmit: (data) => {
            handleValidateUsername(data);
            formik.resetForm();
        }
    });
    const { values, errors, handleChange, handleSubmit } = formik;

    const handleValidateUsername = ( data ) => {
        dispatch( validateUsername(data.username) );
    }

  return (
    <div className='grid p-fluid mt-2'>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='col-10'>
                    <span className="p-float-label p-input-icon-left">
                        <i className="fas fa-user-circle" />
                        <InputText 
                            id='username'
                            name='username'
                            value={values.username} 
                            autoComplete='off'
                            className={ classNames(
                                {'p-invalid': !!errors.username}
                            )}
                            onChange={handleChange} 
                        />
                        <label 
                            htmlFor='username'
                            className={classNames(
                                { 'p-error': !!errors['username'] }
                            )}
                        >Nombre de Usuario</label>
                    </span>
                    {
                        !errors['username'] && (
                            <small 
                                id="username-help" 
                                className="p-d-block"
                            >
                                Ingrese su nombre de usuario para continuar.
                            </small>
                        )
                    }
                </div>

            </div>
        </div>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='col-10'>
                    <Button
                        label="Comprobar Usuario"
                        icon='fas fa-user-check'
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
