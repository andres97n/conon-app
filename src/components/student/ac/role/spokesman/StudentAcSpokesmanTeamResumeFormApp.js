import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { confirmDialog } from 'primereact/confirmdialog';
import { useFormik } from 'formik';

import { Messages } from 'primereact/messages';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { TopicTeacherAudioTabApp } from '../../../../teacher/content/topic/dua/TopicTeacherAudioTabApp';

import { getMethodologyTypeObject } from '../../../../../helpers/topic/header';


export const StudentAcSpokesmanTeamResumeFormApp = React.memo(({
  selectedTopic,
  toast
}) => {
  
  const infoMsg = useRef(null);
  const schoolPeriodName = localStorage.getItem('currentPeriodName');
  const schoolData = {
    schoolPeriod: schoolPeriodName,
    classroom: selectedTopic.classroom.name,
    asignature: selectedTopic.asignature.name,
    type: getMethodologyTypeObject(selectedTopic.type).abbrev,
    title: selectedTopic.title,
    isStudent: true
  };
  const formik = useFormik({
    initialValues: {
      description: '',
      descriptionAudio: []
    },
    validate: (data) => {
      let errors = {};

      if (!data.description) {
        errors.description = 'La descripción es requerida.';
      }

      return errors;
    },
    onSubmit: (data) => {
      handleConfirmSaveTeamDescription( data );
    }
  });

  const { values, errors, setFieldValue, handleChange, handleSubmit } = formik;

  const handleSaveTeamDescription = ( data ) => {
    console.log(data);
    // TODO: Borrar los archivos no guardados
  }

  const handleConfirmSaveTeamDescription = ( data ) => {
    confirmDialog({
      message: '¿Está seguro de guardar la siguiente información?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSaveTeamDescription( data ),
    });
  };

  useEffect(() => {
    if (infoMsg.current?.state.messages?.length === 0) {
      infoMsg.current.show({ 
        severity: 'info', 
        detail: 'Resaltar el trabajo del equipo es fundamental para el docente, así ' +
        'saber si es que de verdad el equipo puso de su parte y colaboraron para llegar ' +
        'a la solución del problema.',
        sticky: true 
      });
    }
  }, []);

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-question mr-2 icon-primary" />
          Preguntas al Docente
        </h5>
        <Messages
          ref={infoMsg} 
          className='align-justify'
        />
      </div>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <div className='card'>
            <h5 className='text-center'>
              Describa el Desempeño del Equipo
            </h5>
            <span className="p-float-label mt-3">
              <InputTextarea
                id='description'
                name='description'
                value={values.description}
                required rows={3} cols={20}
                className={classNames({ 
                  'p-invalid': !!errors.description 
                })}
                onChange={handleChange}
              />
              <label htmlFor='description'>Desempeño del Equipo*</label>
            </span>
          </div>
        </div>
        <div className='col-12'>
          <div className='card'>
            <h5 className='text-center'>
              <i className="fas fa-audio-description mr-2 icon-primary" />
              Subir Audios
            </h5>
            <TopicTeacherAudioTabApp
              schoolData={schoolData}
              value={values.descriptionAudio}
              field={'descriptionAudio'}
              maxAudios={2}
              toast={toast}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
      </div>
      {
        Object.keys(errors).length > 0 && (
          <div className='col-12'>
            <Message severity="error" text={errors.description} />
          </div>
        )
      }
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            <Button 
              label='Guardar Información'
              icon='fas fa-save'
              className='p-button-raised'
              type='submit'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
})
