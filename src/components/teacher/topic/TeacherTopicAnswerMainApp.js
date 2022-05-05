import React from 'react';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';
import { TeacherTopicAnswerFormApp } from './TeacherTopicAnswerFormApp';


export const TeacherTopicAnswerMainApp = React.memo(({
  questions,
  loading,
  type,
  toast
}) => {

  if (loading) {
    return (
      <div className='card'>
        <EmptyContentScreen />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className='card'>
        <div className='col-12'>
          <small>Aún no existe ninguna pregunta subida por el equipo.</small>
        </div>
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <h5 className='text-center'>
            <i className="far fa-question-circle mr-2 icon-primary" />
            Preguntas Realizadas por el Equipo
          </h5>
        </div>
        {
          questions.map( (question, index) => (
            <div className='col-6' key={index}>
              <div className='card'>
                <h6 className='text-center'>
                  <i className="fas fa-asterisk mr-2 icon-secondary" />
                  {question.moderator_question}
                </h6>
                <div className='col-12'>
                  <TeacherTopicAnswerFormApp 
                    question={question}
                    type={type}
                    toast={toast}
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
});
