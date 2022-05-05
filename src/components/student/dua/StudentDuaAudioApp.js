import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';
import { showMessageComponent } from '../../../helpers/topic';


export const StudentDuaAudioApp = React.memo(({
  duaAudio
}) => {

  const infoMsg = useRef(null);

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      showMessageComponent( 
        infoMsg, 
        'info', 
        'Está comprobado científicamente que escuchar no es lo mismo que oír, lo que ' + 
        'significa que para poder escuchar la persona tiene que concentrarse en lo que ' + 
        'se está diciendo para poder descifrarlo e interpretarlo; ese es el objetivo con el ' + 
        'que el Docente presenta material auditivo.',
        true
      );
    }
  }, []);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-audio-description mr-2 icon-primary" />
          Explicación Auditiva
        </h5>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      {
        duaAudio && duaAudio.length > 0
          ? (
            duaAudio.map( (audio, index) => (
              <div className='col-6' key={index}>
                <div className='card'>
                  <h5 className='text-center'>{audio.name}</h5>
                  <div className='center-inside'>
                    <audio controls src={audio.path} />
                  </div>
                </div>
              </div>
            ))
          )
          : (
            <div className='col-12'>
              <small>No se encontró ningún audio presentado por el Docente.</small>
            </div>
          )
      }
    </div>
  )
});
