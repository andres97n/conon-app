import React, { useEffect, useRef } from 'react';

import { Messages } from 'primereact/messages';


export const StudentAcSpokesmanTeamDescriptionApp = React.memo(() => {
  
  const infoMsg = useRef(null);
  
  useEffect(() => {
    if (infoMsg.current?.state.messages?.length === 0) {
      infoMsg.current.show({ 
        severity: 'info', 
        detail: 'Es importante saber el rendimiento del equipo y que ningún integrante ' +
        'pase desapercibido, es por esto que tiene la facultad de visualizar las ' +
        'actividades del mismo y describir o poner observaciones de lo que hacen.', 
        sticky: true 
      });
    }
  }, []);

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-list-ul mr-2 icon-primary" />
          Visualizar Actividades del Equipo
        </h5>
        <Messages
          ref={infoMsg} 
          className='align-justify'
        />
      </div>
      <div className='col-12'></div>
    </>
  )
});
