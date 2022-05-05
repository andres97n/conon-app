import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';

import { StudentAcOrganizerActionFormApp } from './StudentAcOrganizerActionFormApp';
import { StudentAcOrganizerAssignFormApp } from './StudentAcOrganizerAssignFormApp';
import { StudentAcOrganizerTeamDescriptionApp } from './StudentAcOrganizerTeamDescriptionApp';


export const StudentAcOrganizerRoleBodyApp = React.memo(({
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
        detail: 'El rol de Organizador contempla el orden y la organización del equipo, se ' +
        'encarga de que todos entiendan cuál es el problema, cómo se resuelve y qué ' +
        'solución plantea el equipo.',
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
          <StudentAcOrganizerActionFormApp />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcOrganizerAssignFormApp 
            acId={currentMethodology.id}
            userId={userId}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentAcOrganizerTeamDescriptionApp />
        </div>
      </div>
    </div>
  )
});
