import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyTeamStepsDataAbpApp } from './abpSteps/EmptyTeamStepsDataAbpApp';
import { TopicStudentAutoEvaluationApp } from '../evaluation/TopicStudentAutoEvaluationApp';
import { TopicStudentCoEvaluationApp } from '../evaluation/TopicStudentCoEvaluationApp';

import { 
  startLoadEvaluationDetailAbpList, 
  startRemoveEvaluationDetailAbpList 
} from '../../../actions/teacher/evaluationAbp';
import { getEvaluation } from '../../../helpers/school';

// TODO: Cuando se guarde la nota global esta deberá acumular el resultado anterior

export const StudentAbpEvaluationApp = React.memo(({
  abpId,
  rubrics,
  teamDetail,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    evaluationDetailAbp,
    loadingEvaluationAbp, 
  } = useSelector( state => state.dashboard.evaluationAbp );
  const currentTeamDetail = teamDetail[0] || [];
  const { 
    team_detail_abp = null,
    is_moderator = null,
  } = currentTeamDetail;

  const currentEvaluation = evaluationDetailAbp[0] || {};
  const { evaluation = null, details = null } = currentEvaluation;

  const currentAutoEvaluation = useMemo(
    () => getEvaluation( rubrics, 'Autoevaluación' ),[rubrics]
  );

  const currentCoEvaluation = useMemo(
    () => getEvaluation( rubrics, 'Coevaluación' ),[rubrics]
  );

  const handleLoadCurrentEvaluationAbp = useCallback(
    ( abpId, teamDetailAbpId ) => {
      dispatch( startLoadEvaluationDetailAbpList(abpId, teamDetailAbpId) );
    }, [dispatch],
  );

  const handleRemoveCurrentEvaluationAbp = useCallback(
    () => {
      dispatch( startRemoveEvaluationDetailAbpList() );
    }, [dispatch],
  );

  const headerTabTemplate = ( title ) => (
    <React.Fragment>
      <span>
        <i className="fas fa-clipboard-check mr-2 icon-primary" />
        {title}
      </span>
    </React.Fragment>
  );

  useEffect(() => {
    if ( team_detail_abp && abpId ) {
      handleLoadCurrentEvaluationAbp( abpId, team_detail_abp );
    }
  
    return () => {
      if ( team_detail_abp && abpId ) {
        handleRemoveCurrentEvaluationAbp();
      }
    }
  }, [
    abpId,
    team_detail_abp, 
    handleLoadCurrentEvaluationAbp, 
    handleRemoveCurrentEvaluationAbp
  ]);

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
              {
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
              }
            </AccordionTab>
            <AccordionTab headerTemplate={headerTabTemplate("Coevaluación")}>
            {
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
            }
            </AccordionTab>
          </Accordion>
        </div>
        {
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
        }
      </div>
    </div>
  )
})
