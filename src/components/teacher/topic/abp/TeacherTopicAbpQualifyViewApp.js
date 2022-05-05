import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';

import { TeacherTopicAbpQualifyDetailViewApp } from './TeacherTopicAbpQualifyDetailViewApp';


export const TeacherTopicAbpQualifyViewApp = React.memo(({
  topicType,
  toast,
  methodologyId,
  groupDetail
}) => {

  if (!topicType || !methodologyId) {
    return (
      <div className='col-12'>
        <small>No se recibió los datos del tópico.</small>
      </div>
    )
  }

  if (!groupDetail || groupDetail.length === 0) {
    return (
      <div className='col-12'>
        <small>No se recibió los datos del equipo.</small>
      </div>
    )
  }

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-user-check mr-2 icon-success" />
          Calificar rendimiento de los estudiantes
        </h5>
      </div>
      <div className='col-12'>
        <Accordion>
          {
            groupDetail.map( (detail, index) => (
              <AccordionTab
                header={detail.user.name} 
                key={index}
              >
                <TeacherTopicAbpQualifyDetailViewApp 
                  methodologyId={methodologyId}
                  teamDetailId={detail.id}
                  toast={toast}
                />
              </AccordionTab>
            ))
          }
        </Accordion>
      </div>
    </>
  )
});
