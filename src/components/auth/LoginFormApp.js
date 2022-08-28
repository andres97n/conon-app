import React from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import { startLogin } from '../../actions/auth';

export const LoginFormApp = React.memo(() => {

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            // lUsername: 'andres', ADMIN
            username: '',
            password: '',
        },
        validate: (data) => {
            let errors = {}

            if (!data.username) {
                errors.username = 'El nombre de usuario es requerido.';
            }

            if (!data.password) {
                errors.password = 'La contraseña es requerida.';
            }

            return errors;
        },
        onSubmit: (data) => {
            handleLogin(data);
            formik.resetForm();
        }
    });
    const { values, errors, handleChange, handleSubmit } = formik;
    
    const handleLogin = ( data ) => {
        dispatch( startLogin(data.username, data.password) );
    }

  return (
    <div className='grid p-fluid mt-2'>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='col-10'>
                    <span className="p-float-label p-input-icon-left">
                        <i className="far fa-user-circle" />
                        <InputText
                            id='username'
                            name='username'
                            value={values.username}
                            autoComplete='off'
                            className={classNames(
                                { 'p-invalid': !!errors['username'] }
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
                    <small className="p-error">{errors['username']}</small>
                </div>
            </div>
        </div>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='col-10'>
                    <span className="p-float-label">
                        <Password
                            id='password'
                            name='password'
                            value={values.password}
                            feedback={false}
                            toggleMask
                            className={classNames(
                                { 'p-invalid': !!errors['password'] }
                            )}
                            onChange={handleChange}
                        />
                        <label 
                            htmlFor='password'
                            className={classNames(
                                { 'p-error': !!errors['password'] }
                            )}
                        >Contraseña</label>
                    </span> 
                    <small className="p-error">{errors['password']}</small>
                </div>
            </div>
        </div>
        <div className='col-12'>
            <div className='center-inside'>
                <div className='col-10'>
                    <Button 
                        label="Ingresar"
                        icon='fas fa-sign-in-alt'
                        type='submit'
                        className="p-button-raised p-button-primary" 
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    </div>
  )
});
