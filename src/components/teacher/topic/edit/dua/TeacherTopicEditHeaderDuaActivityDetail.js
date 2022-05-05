import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { Badge } from 'primereact/badge';


export const TeacherTopicEditHeaderDuaActivityDetail = React.memo(({
  questions
}) => {
  return (
    <div className='col-12'>
      <div className='card'>
        <Accordion>
          {
            questions.map( (question, index) => (
              <AccordionTab
                key={question.id}
                header={`Pregunta ${index + 1}`}
              >
                <div className='card'>
                  <div className='grid p-fluid'>
                    <div className='col-12'>
                      <h6 className='text-center'>
                        <i className="fas fa-question-circle mr-2 icon-success" />
                        {index + 1}. {question.title}
                      </h6>
                    </div>
                    <div className='col-12'>
                      <div className='center-inside'>
                        <Badge
                          value={`${question.value}/${question.value}`}
                          className="p-mr-2" 
                          size="large" 
                          severity='success'
                        ></Badge>
                      </div>
                    </div>
                    <div className='col-12'>
                      <Accordion>
                        {
                          question.answers.map( answer => (
                            <AccordionTab 
                              key={answer.id}
                              header={`Literal ${answer.literal}`}
                            >
                              <div className='col-12'>
                                <h6 className='text-center'>
                                  {answer.literal}. {answer.detail}
                                </h6>
                              </div>
                              <div className='col-12'>
                                <div className='center-inside'>
                                  <Badge
                                    value={`${answer.value}/${question.value}`}
                                    className="p-mr-2" 
                                    size="large" 
                                    severity={
                                      answer.value > 0
                                        ? ('success')
                                        : ('warn')
                                    }
                                  ></Badge>
                                </div>
                              </div>
                            </AccordionTab>
                          ))
                        }
                      </Accordion>
                    </div>
                  </div> 
                </div>
              </AccordionTab>
            ))
          }
        </Accordion>
      </div>
    </div>
  )
});
