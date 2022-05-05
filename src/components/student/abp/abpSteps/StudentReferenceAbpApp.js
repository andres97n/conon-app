import React from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { InputText } from 'primereact/inputtext';
import { confirmDialog } from 'primereact/confirmdialog';

import { isValidHttpUrl } from '../../../../helpers/abp-steps';
import { Button } from 'primereact/button';

export const StudentReferenceAbpApp = React.memo(({
  conceptId,
  isDisabled,
  handleSubmitReference,
}) => {

  const formik = useFormik({
    initialValues: {
      reference: ''
    },
    validate: (data) => {
      let errors = {}
      
      if (!data.reference) {
        errors.reference = 'Si desea ingresar un enlace a este concepto, deberá hacerlo.';
      } else if (data.reference && !isValidHttpUrl(data.reference)) {
        errors.reference = 'El enlace ingresado no es válido.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveConceptReference( data );
    }
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  const handleConfirmSaveConceptReference = ( data ) => {
    confirmDialog({
        message: '¿Está seguro que desea guardar el siguiente enlace?',
        header: 'Confirmación de guardado',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, guardar',
        rejectLabel: 'No guardar',
        accept: () => handleSubmitReference( data, conceptId ),
    });
  }

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='grid p-fluid'>
          {
            values.reference && !errors.reference
              && (
                <div className='col-12'>
                  <div className='center-inside'>
                    <h6 className='icon-success'>
                      <i className="fas fa-check-circle mr-2"/>
                      URL válido
                    </h6>
                  </div>
                </div>
              )
          }
          <div className='col-12'>
            <span 
              className="p-float-label p-input-icon-left mt-2"
            >
              <i className="fas fa-link" />
              <InputText
                id={'reference'}
                name={'reference'}
                value={values.reference}
                disabled={isDisabled}
                className={ classNames(
                  { 
                    'p-invalid': 
                    errors.reference
                  }
                )} 
                onChange={handleChange} 
              />
              <label htmlFor={'reference'}>
                Enlace externo
              </label>
            </span>
            {
              (
                errors.reference
              )
                ? (
                  <small className="p-error mt-1">
                    {errors.reference}
                  </small>
                )
                : (
                  <small 
                    id={'reference-help'} 
                    className="p-d-block mt-1"
                  >
                      Ingrese un enlace hacia una página externa con más 
                      información.
                  </small>
                )
            }
          </div>
          <div className='col-12'>
            <div className='center-inside'>
              <Button
                icon="fas fa-save"
                label='Guardar Enlace'
                type='submit'
                disabled={isDisabled}
                className='p-button-raised p-button-primary'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
