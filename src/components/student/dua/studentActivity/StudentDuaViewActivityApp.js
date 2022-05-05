import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../../helpers/abp-steps';


export const StudentDuaViewActivityApp = React.memo(({
  currentActivity,
  currentStudentActivity
}) => {
  
  return (
    <div className='col-12'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <div className='center-inside'>
            <Badge
              value={
                changeObjectDate(currentStudentActivity.activity_student.created_at)
              } 
              severity='info'
            ></Badge>
          </div>
        </div>
        <div className='col-12'>
          <h5 className='text-center'>
            Calificación Final: 
          </h5>
          <h3 className='text-center'>
            <i className="fas fa-book-reader mr-3 icon-primary" />
            {currentStudentActivity.activity_student.qualification}/
            {currentActivity.activity.final_grade}
          </h3>
        </div>
        {
          currentStudentActivity.answers.length === 0
            ? (
              <div className='col-12'>
                <small>No existe ninguna respuesta agregada.</small>
              </div>
            )
            : (
              <>
                {
                  currentActivity.questions.map( (question, index) => (
                    <div className='col-12' key={question.id}>
                      <div className='card'>
                      <div className='grid p-fluid'>
                        <div className='col-12'>
                          <p className='text-justify'>
                            <b className='mr-2'>{index + 1}.</b>{question.title}
                          </p>
                        </div>
                        {
                          question.answers.map( (answer, i) => (
                            <div className='col-3' key={i}>
                              <div className='card'>
                                <div className='grid p-fluid'>
                                  <div className='col-12'>
                                    <p className='text-justify'>
                                      <b className='mr-2'>{answer.literal}.</b>
                                      {answer.detail}
                                    </p>
                                  </div>
                                  <div className='col-12'>
                                    {
                                      currentStudentActivity.answers[index].detail[i].value > 0
                                        ? <h5 className='text-center'>
                                          <i className="fas fa-check icon-success" />
                                        </h5>
                                        : <h5 className='text-center'>
                                          <i className="fas fa-times icon-black" />
                                        </h5> 
                                    }
                                  </div>
                                  <div className='col-12'>
                                    {
                                      currentStudentActivity.answers[index].detail[i].isSelected
                                        && <h6 className='text-center'>
                                          <i className="fas fa-hand-point-up mr-2 icon-primary" />
                                          Opción Seleccionada
                                        </h6>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                      </div>
                    </div>
                  ))
                }
              </>
            )
        }
      </div>
    </div>
  )
});
