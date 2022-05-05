import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';

import { TopicTeacherAudioTabApp } from '../dua/TopicTeacherAudioTabApp';
import { TopicUploadImageApp } from '../../../../student/upload/TopicUploadImageApp';


export const TopicTeacherAbpFinalizationApp = React.memo(({
  schoolData,
  values,
  errors,
  toast,
  setFieldValue
}) => {

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

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
              <Message severity="error" text='Estos componentes estás bloqueados' />
            )
            : (
              <TopicTeacherAudioTabApp
                schoolData={schoolData}
                value={values.oral_explication}
                field={'oral_explication'}
                maxAudios={2}
                toast={toast}
                setFieldValue={setFieldValue}
              />
            )
          }
        </div>
      </div>
      <div className='col-6'>
          <h4 className='text-center mb-4'>
            <i className="fas fa-image icon-primary mr-2" />
            Imagen Descriptiva
          </h4>
          {
            Object.keys(schoolData).length === 0
              ? (
                <Message severity="error" text='Estos componentes estás bloqueados' />
              )
              : (
                <TopicUploadImageApp
                  isMounted={isMounted}
                  schoolData={schoolData}
                  field={'descriptive_image'}
                  value={values?.descriptive_image}
                  errorField={'descriptive_image'}
                  errors={errors}
                  toast={toast}
                  setFieldValue={setFieldValue}
                />
              )
          }
      </div>
      <div className='col-6'>
          <h4 className='text-center'>
            <i className="fas fa-link icon-primary mr-2 mb-2" />
            Enlace Contenido Externo
          </h4>
        <div className='card'>
          <span className="p-float-label p-input-icon-left">
            <i className="fas fa-link"></i>
            <InputText
              id='reference_url'
              name='reference_url'
              value={values.reference_url}
              type={'url'}
              className={classNames({ 'p-invalid': errors['reference_url'] })}
              onChange={e => setFieldValue('reference_url', e.target.value)}
            />
            <label 
              htmlFor='reference_url'
              className={classNames({ 'p-error': errors['reference_url'] })}
            >
              Contenido Adicional
            </label>
          </span>
        </div>
      </div>
    </div>
  )
});
