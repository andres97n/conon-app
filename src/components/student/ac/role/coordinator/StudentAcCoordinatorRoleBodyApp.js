import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';

import { 
  StudentAcCoordinatorFormResolutionApp 
} from './StudentAcCoordinatorFormResolutionApp';
import { StudentAcCoordinatorStrategyFormApp } from './StudentAcCoordinatorStrategyFormApp';
import { StudentAcCoordinatorAssignFormApp } from './StudentAcCoordinatorAssignFormApp';


export const StudentAcCoordinatorRoleBodyApp = React.memo(({
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
        detail: 'El rol de Coordinador es el más importante, debido a que es el encargado ' + 
        'de controlar y manejar el desarrollo de la resolución del problema, así como ' +
        'el de llevar el orden y la participación de cada uno de sus compañeros.',
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
          <StudentAcCoordinatorStrategyFormApp />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcCoordinatorAssignFormApp 
            acId={currentMethodology.id}
            userId={userId}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentAcCoordinatorFormResolutionApp 
            selectedTopic={selectedTopic}
            toast={toast}
          />
        </div>
      </div>
    </div>
  )
});
