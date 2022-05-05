import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';
import { StudentAcSecretaryPathFormApp } from './StudentAcSecretaryPathFormApp';
import { StudentAcSecretarySendInfoFormApp } from './StudentAcSecretarySendInfoFormApp';


export const StudentAcSecretaryRoleBodyApp = React.memo(({
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
        detail: 'El rol de Secretario tiene como objetivo recaudar información necesaria ' +
        'para el equipo, para complementar con el trabajo de los demás integrantes del ' +
        'equipo.',
        sticky: true
      });
    }
  }, []);

  // TODO: La descripción hacia las preguntas del docente deberá ser en el mismo componente

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
          <StudentAcSecretaryPathFormApp />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcSecretarySendInfoFormApp 
            acId={currentMethodology.id}
            userId={userId}
          />
        </div>
      </div>
    </div>
  )
});
