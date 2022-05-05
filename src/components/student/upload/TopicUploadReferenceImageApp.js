import React from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';

import { confirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { isImgLink } from '../../../helpers/topic';

// TODO: Solucionar problema de CORS si es que se alcanza


export const TopicUploadReferenceImageApp = React.memo(({
  field,
  setImageValue,
  handleChangeTabPanel
}) => {

  const formik = useFormik({
    initialValues: {
      imageName: '',
      reference: ''
    },
    validate: (data) => {
      let errors = {}
      
      if (!data.reference) {
        errors.reference = 'Si desea ingresar un enlace deberá hacerlo.';
      } else if (!isImgLink(data.reference)) {
        errors.reference = 'La imagen ingresada no es válida.';
      }
      if (!data.imageName) {
        errors.imageName = 'El nombre de la imagen es obligatorio.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveImageReference( data );
    }
  });

  const { values, errors, setFieldValue, handleSubmit } = formik;

  const handleConfirmSaveImageReference = ( data ) => {
    confirmDialog({
        message: '¿Está seguro que desea guardar el siguiente enlace?',
        header: 'Confirmación de guardado',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, guardar',
        rejectLabel: 'No guardar',
        accept: () => handleSubmitImageReference( data ),
    });
  }

  const handleSubmitImageReference = ( data ) => {
    const newImage = {
      name: data.imageName,
      size: 0,
      path: data.reference
    };
    setImageValue( field, newImage );
  }

  const handleChangeImageReference = ( value ) => {
    if (!value) {
      handleChangeTabPanel( false );
    } else {
      handleChangeTabPanel( true, 0 );
    }
  }

  return (
    <>
      {
        (values.reference && !errors.reference) &&
          <div className='col-12'>
            <div className='center-inside'>
              <h6 className='icon-success'>
                <i className="fas fa-check-circle mr-2"/> URL válido
              </h6>
            </div>
          </div>
      }
      <div className='col-12'>
        <span 
          className="p-float-label p-input-icon-left mt-2"
        >
          <i className="fas fa-signature" />
          <InputText
            id='imageName'
            name='imageName'
            value={values.imageName}
            className={ classNames({'p-invalid': errors.imageName})} 
            onChange={(e) => {
              setFieldValue('imageName', e.target.value)
            }} 
          />
          <label htmlFor='imageName'>
            Nombre de Imagen
          </label>
        </span>
        {
          errors.imageName && <small className="p-error">{errors.imageName}</small>
        }
      </div>
      <div className='col-12  mt-2'>
        <span 
          className="p-float-label p-input-icon-left mt-2"
        >
          <i className="fas fa-link" />
          <InputText
            id='reference'
            name='reference'
            value={values.reference}
            className={ classNames({'p-invalid': errors.reference})} 
            onChange={(e) => {
              setFieldValue('reference', e.target.value)
              handleChangeImageReference( e.target.value )
            }} 
          />
          <label htmlFor={'reference'}>
            Enlace de Imagen
          </label>
        </span>
        {
          errors.reference
            ? (
              <small className="p-error mt-1">{errors.reference}</small>
            )
            : (
              <small 
                id='reference-help' 
                className="p-d-block"
              >
                Recuerde que para habilitar la otra opción el campo de texto debe estar vacío.
              </small>
            )
        }
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-8'>
            <Button
              icon="fas fa-save"
              label='Guardar Enlace'
              type='submit'
              className='p-button-raised p-button-primary'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
})
