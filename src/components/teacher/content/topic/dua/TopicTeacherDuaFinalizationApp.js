import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

import { TopicTeacherImageTabApp } from '../body/TopicTeacherImageTabApp';
import { TopicTeacherDuaExtraInformationApp } from './TopicTeacherDuaExtraInformationApp';
import { TopicTeacherAudioTabApp } from './TopicTeacherAudioTabApp';


export const TopicTeacherDuaFinalizationApp = React.memo(({
  schoolData,
  values,
  errors,
  toast,
  setFieldValue
}) => {

  const infoMsg = useRef(null);

  useEffect(() => {
    if ( 
      infoMsg.current?.state.messages?.length === 0 && 
      Object.keys(schoolData).length === 0
    ) {
      infoMsg.current.show({
        severity: 'warn',
        detail: 'Los componentes multimedia que se presentan a continuación está bloqueados ' +
        'ya que el título del Tópico no ha sido guardado y es necesario para guardar la ' +
        'presente información.',
        sticky: true
      });
    }
  }, [schoolData]);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
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
                value={values.oral_conceptualization}
                field={'oral_conceptualization'}
                maxAudios={4}
                toast={toast}
                setFieldValue={setFieldValue}
              />
            )
          }
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <h4 className='text-center mb-4'>
            <i className="fas fa-images icon-primary mr-2" />
            Imágenes Descriptivas
          </h4>
          {
            Object.keys(schoolData).length === 0
              ? (
                <Message severity="error" text='Estos componentes estás bloqueados' />
              )
              : (
                <TopicTeacherImageTabApp 
                  schoolData={schoolData}
                  values={values}
                  errors={errors}
                  toast={toast}
                  setFieldValue={setFieldValue}
                />
              )
          }
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <h4 className='text-center mb-4'>
            <i className="fas fa-paperclip icon-primary mr-2" />
            Información Adicional
          </h4>
          {
            Object.keys(schoolData).length === 0
            ? (
              <Message severity="error" text='Estos componentes estás bloqueados' />
            )
            : (
              <TopicTeacherDuaExtraInformationApp 
                values={values}
                errors={errors}
                toast={toast}
                setFieldValue={setFieldValue}
              />
            )
          }
        </div>
      </div>
    </div>
  )
});
