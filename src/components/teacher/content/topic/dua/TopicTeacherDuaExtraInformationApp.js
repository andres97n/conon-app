import React from 'react';
import classNames from 'classnames';

import { InputText } from 'primereact/inputtext';

import { TopicYoutubeUrlApp } from '../../../../student/videoUrl/TopicYoutubeUrlApp';


export const TopicTeacherDuaExtraInformationApp = React.memo(({
  values,
  errors,
  toast,
  setFieldValue
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fab fa-youtube icon-primary mr-2" />
            Vídeo de Youtube
          </h5>
          <TopicYoutubeUrlApp 
            field={'video'}
            value={values.video}
            toast={toast}
            setVideoValue={setFieldValue}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h5 className='text-center'>
            <i className="fas fa-link icon-primary mr-2" />
            Enlace Contenido Externo
          </h5>
          <span className="p-float-label p-input-icon-left">
            <i className="fas fa-link"></i>
            <InputText
                id='extra_information'
                name='extra_information'
                value={values.extra_information}
                type={'url'}
                className={classNames({ 'p-invalid': errors['extra_information'] })}
                onChange={e => setFieldValue('extra_information', e.target.value)}
            />
            <label 
              htmlFor='extra_information'
              className={classNames({ 'p-error': errors['extra_information'] })}
            >
              Contenido Adicional
            </label>
          </span>
        </div>
      </div>
    </div>
  )
});
