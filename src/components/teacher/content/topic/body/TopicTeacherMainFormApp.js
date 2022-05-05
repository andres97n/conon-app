import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from 'primereact/messages';

import { TopicTeacherTitleFormApp } from './TopicTeacherTitleFormApp';
import { TopicTeacherCalendarFormApp } from './TopicTeacherCalendarFormApp';

import { getInfoMsg } from '../../../../../helpers/abp';


export const TopicTeacherMainFormApp = React.memo(({
  topicData,
  values,
  errors,
  isTitleSaved,
  setFieldValue,
  setIsTitleSaved,
  setSchoolData
}) => {

  const infoMsg = useRef(null);

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      getInfoMsg( 
        infoMsg, 
        'info',
        'El título debe ser conciso y claro, ya que es el identificador del Tópico.',
        true
      );
    }
  }, []);

  return (
    <div className='grid p-fluid mt-2'>
      <div className="col-12">
        <h4 className='text-center'>
          <i className="fas fa-clipboard-list icon-primary mr-2" />
          Información General
        </h4>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <TopicTeacherTitleFormApp 
        topicData={topicData}
        title={values.title}
        errors={errors}
        isTitleSaved={isTitleSaved}
        setFieldValue={setFieldValue}
        setIsTitleSaved={setIsTitleSaved}
        setSchoolData={setSchoolData}
      />
      <div className="field col-12">
        <span className="p-float-label">
          <InputTextarea
            id='description'
            name='description'
            required rows={3} cols={20} 
            value={values.description}
            className={classNames({ 'p-invalid': errors['description'] })}
            onChange={e => setFieldValue('description', e.target.value)}
          />
          <label 
            htmlFor='description'
            className={classNames({ 'p-error': errors['description'] })}
          >
            Descripción*
          </label>
        </span>
      </div>
      <div className="field col-12">
        <span className="p-float-label">
          <InputTextarea 
            id='objective'
            name='objective'
            required rows={3} cols={20} 
            value={values.objective}
            className={classNames({ 'p-invalid': errors['objective'] })}
            onChange={e => setFieldValue('objective', e.target.value)}
          />
          <label 
            htmlFor='objective'
            className={classNames({ 'p-error': errors['objective'] })}
          >
            Objetivo*
          </label>
        </span>
      </div>
      <TopicTeacherCalendarFormApp 
        values={values}
        errors={errors}
        setFieldValue={setFieldValue}
      />
      <div className="field col-12">
        <span className="p-float-label">
          <InputTextarea
            id='observations'
            name='observations'
            required rows={3} cols={20} 
            value={values.observations}
            className={classNames({ 'p-invalid': errors['observations'] })}
            onChange={e => setFieldValue('observations', e.target.value)}
          />
          <label 
            htmlFor='observations'
            className={classNames({ 'p-error': errors['observations'] })}
          >
            Observaciones
          </label>
        </span>
        <small 
          id="observations-help" 
          className="p-d-block"
          >
            Las observaciones sólo las podrá visualizar el Docente o Administrador.
        </small>
      </div>
    </div>
    
  )
});
