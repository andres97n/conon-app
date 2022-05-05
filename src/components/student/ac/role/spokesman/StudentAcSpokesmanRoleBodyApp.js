import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';

import { StudentAcSpokesmanQuestionFormApp } from './StudentAcSpokesmanQuestionFormApp';
import { StudentAcSpokesmanTeamDescriptionApp } from './StudentAcSpokesmanTeamDescriptionApp';
import { StudentAcSpokesmanTeamResumeFormApp } from './StudentAcSpokesmanTeamResumeFormApp';


export const StudentAcSpokesmanRoleBodyApp = React.memo(({
  userId,
  currentMethodology,
  selectedTopic,
  toast
}) => {

  const infoMsg = useRef(null);

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'El rol de Portavoz es la persona que comunica dudas y comentarios al ' +
        'Docente y/o integrantes del equipo con el objetivo de que cada uno de los ' +
        'integrantes se sientan escuchados, y la mejor manera de hacerlo es por medio ' + 
        'de un representante que cumpla este rol.',
        sticky: true
      });
    }
  }, []);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcSpokesmanQuestionFormApp />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcSpokesmanTeamDescriptionApp />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentAcSpokesmanTeamResumeFormApp 
            selectedTopic={selectedTopic}
            toast={toast}
          />
        </div>
      </div>
    </div>
  )
});
