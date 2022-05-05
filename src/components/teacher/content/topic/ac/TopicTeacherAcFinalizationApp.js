import React from 'react';
import classNames from 'classnames';

import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';

import { TopicTeacherAudioTabApp } from '../dua/TopicTeacherAudioTabApp';
import { TopicYoutubeUrlApp } from '../../../../student/videoUrl/TopicYoutubeUrlApp';

// TODO: Validar los enlaces que ingresa

export const TopicTeacherAcFinalizationApp = React.memo(({
  schoolData,
  values,
  errors,
  toast,
  setFieldValue
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='card'>
          <h4 className='text-center mb-4'>
            <i className="fas fa-audio-description icon-primary mr-2" />
            Crear Explicación Oral
          </h4>
          {
            Object.keys(schoolData).length === 0
            ? (
              <Message 
                severity="warn" 
                text='Este componente está bloqueado, se requiere el título del Tópico.' 
              />
            )
            : (
              <TopicTeacherAudioTabApp
                schoolData={schoolData}
                value={values.context_audio}
                field={'context_audio'}
                maxAudios={2}
                toast={toast}
                setFieldValue={setFieldValue}
              />
            )
          }
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fab fa-youtube icon-primary mr-2" />
            Vídeo de Youtube
          </h5>
          {
            Object.keys(schoolData).length === 0
            ? (
              <Message 
                severity="warn" 
                text='Este componente está bloqueado, se requiere el título del Tópico.' 
              />
            )
            : (
              <TopicYoutubeUrlApp
                field={'context_video'}
                value={values.context_video}
                toast={toast}
                setVideoValue={setFieldValue}
              />
            )
          }
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fab fa-link icon-primary mr-2" />
            Enlace Contenido Externo
          </h5>
          {
            Object.keys(schoolData).length === 0
            ? (
              <Message 
                severity="warn" 
                text='Este componente está bloqueado, se requiere el título del Tópico.' 
              />
            )
            : (
              <span className="p-float-label p-input-icon-left">
                <i className="fas fa-link"></i>
                <InputText
                    id='path_reference'
                    name='path_reference'
                    value={values.path_reference}
                    type={'url'}
                    className={classNames({ 'p-invalid': errors['path_reference'] })}
                    onChange={e => setFieldValue('path_reference', e.target.value)}
                />
                <label 
                  htmlFor='path_reference'
                  className={classNames({ 'p-error': errors['path_reference'] })}
                >
                  Contenido Adicional
                </label>
              </span>
            )
          }
        </div>
      </div>
    </div>
  )
});
