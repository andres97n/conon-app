import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';

import { TopicTextEditorApp } from '../../../../student/editor/TopicTextEditorApp';
import { TopicViewTextEditorApp } from '../../../../student/editor/TopicViewTextEditorApp';


export const TopicTeacherDuaEditorApp = React.memo(({
  schoolData,
  value,
  field,
  errors,
  title,
  icon,
  toast,
  setFieldValue
}) => {

  const isMounted = useRef(true);
  const infoMsg = useRef(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if ( 
      infoMsg.current?.state.messages?.length === 0 && 
      Object.keys(schoolData).length === 0
    ) {
      infoMsg.current.show({
        severity: 'warn',
        detail: 'El editor que se presenta a continuación está bloqueado ya que el título ' +
        'del Tópico no ha sido guardado y es necesario para guardar la presente información.',
        sticky: true
      });
    }
  }, [schoolData]);

  return (
    <div className='grid p-fluid mt-2'>
      <div className='col-12'>
        <h4 className='text-center'>
          <i className={`fas fa-${icon} icon-primary mr-2`} />
          {title}
        </h4>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <div className='col-12'>
        {
          Object.keys(schoolData).length > 0
            ? (
              <TopicTextEditorApp
                isMounted={isMounted}
                schoolData={schoolData}
                maxImages={2}
                value={value}
                field={field}
                errors={errors}
                toast={toast}
                setFieldValue={setFieldValue}
              />
            )
            : (
              <TopicViewTextEditorApp 
                height={'200px'}
                value={value}
              />
            )
        }
      </div>
    </div>
  )
});
