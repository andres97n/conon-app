import React from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { getYotubeVideoId, isYoutubeVideoValid } from '../../../helpers/topic';
import { getToastMsg } from '../../../helpers/abp';


export const TopicYoutubeUrlFormApp = React.memo(({
  field,
  toast,
  setVideoValue
}) => {

  const formik = useFormik({
    initialValues: {
      youtubeReference: ''
    },
    validate: (data) => {
      let errors = {}
      
      if (!data.youtubeReference) {
        errors.youtubeReference = 'El enlace es obligatorio.';
      } else if (!isYoutubeVideoValid(data.youtubeReference)) {
        errors.youtubeReference = 'El enlace ingresado no es un vídeo de YouTube.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveYoutubeReference( data );
    }
  });

  const { values, errors, handleReset, handleChange, handleSubmit } = formik;


  const handleSubmitYoutubeReference = ( data ) => {
    const videoId = getYotubeVideoId(data.youtubeReference);
    if (videoId !== null) {
      setVideoValue( field, data.youtubeReference );
    } else {
      getToastMsg(
        toast, 
        'error', 
        'El siguiente vídeo no puede ser mostrado, por favor introduzca otro.'
      );
      handleReset();
    }
  }

  const handleConfirmSaveYoutubeReference = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea guardar el siguiente enlace?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitYoutubeReference( data ),
    });
  }

  return (
    <>
      {
        (values.youtubeReference && !errors.youtubeReference) &&
          <div className='col-12'>
            <div className='center-inside'>
              <h6 className='icon-success'>
                <i className="fas fa-check-circle mr-2"/> URL válido
              </h6>
            </div>
          </div>
      }
      <div className='col-12 mt-1'>
        <span 
          className="p-float-label p-input-icon-left mt-2"
        >
          <i className="fas fa-link" />
          <InputText
            id='youtubeReference'
            name='youtubeReference'
            value={values.youtubeReference}
            className={ classNames({'p-invalid': errors.youtubeReference})} 
            onChange={handleChange} 
          />
          <label htmlFor={'youtubeReference'}>
            Enlace de YouTube
          </label>
        </span>
        {
          ( errors.youtubeReference ) 
            ? <small className="p-error mt-1">{errors.youtubeReference}</small> 
            : (
              <small 
                id='youtubeReference-help' 
                className="p-d-block"
              >
                El enlace ingresado deberá ser un vídeo de YouTube, se mostrará un mensaje 
                si es válido.
              </small>
            )
        }
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button
              icon="fas fa-save"
              label='Guardar Vídeo'
              type='submit'
              className='p-button-raised p-button-primary'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
});
