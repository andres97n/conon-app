import React, { useEffect, useRef } from 'react';

import { Panel } from 'primereact/panel';

// TODO: Mostrar preguntas realizadas.

export const StudentAcQuestionsListApp = React.memo(() => {

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <>
      <Panel
        header={
          <p>
            <i className="fas fa-question-circle mr-2 icon-primary" />
            Preguntas Realizadas al Docente
          </p>
        } 
        toggleable 
        collapsed={true}
        expandIcon='fas fa-plus'
        collapseIcon="fas fa-minus"
      >
        {
          isMounted.current && (
            <div className='grid p-fluid'>
              <div className='col-12'>
                <small>Aún no existen preguntas realizadas.</small>
              </div>
              <div className='col-12'></div>
            </div>
          )
        }
      </Panel>
    </>
  )
});
