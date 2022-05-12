import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';


export const StudentAcEvaluationApp = React.memo(() => {
  
  const headerTabTemplate = ( title ) => (
    <React.Fragment>
      <span>
        <i className="fas fa-clipboard-check mr-2 icon-primary" />
        {title}
      </span>
    </React.Fragment>
  );

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <h5 className='text-center'>
            <i className="far fa-file-alt mr-2" />
            Evaluaciones para el Estudiante
          </h5>
        </div>
        <div className='col-12'>
          <Accordion>
            <AccordionTab headerTemplate={headerTabTemplate('Autoevaluación')}>
              {/* {
                evaluationDetailAbp.length > 0
                  ? <TopicStudentAutoEvaluationApp
                    abpId={abpId}
                    teamDetailId={team_detail_abp}
                    evaluation={evaluation}
                    currentRubric={currentAutoEvaluation}
                    evaluationDetails={details}  
                    isModerator={is_moderator}
                    toast={toast}
                  />
                  : <EmptyTeamStepsDataAbpApp />
              } */}
            </AccordionTab>
            <AccordionTab headerTemplate={headerTabTemplate("Coevaluación")}>
              {/* {
                evaluationDetailAbp.length > 0
                  ? <TopicStudentCoEvaluationApp 
                    abpId={abpId}
                    teamDetailId={team_detail_abp}
                    evaluation={evaluation}
                    currentRubric={currentCoEvaluation}
                    evaluationDetails={details}  
                    isModerator={is_moderator}
                    toast={toast}
                  />
                  : <EmptyTeamStepsDataAbpApp />
              } */}
            </AccordionTab>
          </Accordion>
        </div>
        {/* {
          loadingEvaluationAbp 
            ? (
              <div className='col-12'>
                <EmptyTeamStepsDataAbpApp />
              </div>
            ) 
            : (
              <div className='col-12'>
                <div className='card'>
                  <div className='grid p-fluid'>
                    <div className='col-12'>
                      <h5>
                        Esta es mi Nota Final...
                      </h5>
                    </div>
                    {
                      details && details.length === 5 
                        ? (
                          <div className='col-12'>
                            <h2 className='text-center'>
                              <i className="fas fa-book-reader mr-3 icon-primary" />
                              {evaluation?.final_grade}
                            </h2>
                          </div>
                        ): (
                          <div className='col-12'>
                            <small>
                              Todavía no se ha calificado tu aporte en el tópico.
                            </small>
                          </div>
                        )
                    }
                  </div>
                </div>
              </div>
            )
        } */}
      </div>
    </div>
  )
});
