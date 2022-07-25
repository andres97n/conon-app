import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, AccordionTab } from 'primereact/accordion';
import { EmptyContentScreen } from '../../ui/EmptyContentScreen';

import { 
  startLoadStudentEvaluationAcByAcAndTeamDetail, startRemoveEvaluationAcList 
} from '../../../actions/teacher/evaluationAc';
import { 
  TopicStudentAutoEvaluationAcApp 
} from './evaluation/TopicStudentAutoEvaluationAcApp';
import { TopicStudentCoEvaluationAcApp } from './evaluation/TopicStudentCoEvaluationAcApp';


export const StudentAcEvaluationApp = React.memo(({
  currentMethodology,
  userAc,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    evaluationsAc, 
    loadingEvaluationAc 
  } = useSelector( state => state.dashboard.evaluationAc );

  const handleLoadCurrentStudentEvaluation = useCallback(
    ( acId, teamDetailId ) => {
      dispatch( startLoadStudentEvaluationAcByAcAndTeamDetail( acId, teamDetailId ) );
    }, [dispatch],
  );

  const handleRemoveCurrentStudentEvaluation = useCallback(
    () => {
      dispatch( startRemoveEvaluationAcList() );
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
    if (currentMethodology && userAc) {
     handleLoadCurrentStudentEvaluation( currentMethodology?.id, userAc?.id );   
    }
  
    return () => {
      if (currentMethodology && userAc) {
        handleRemoveCurrentStudentEvaluation();
      }
    }
  }, [
    currentMethodology, 
    userAc, 
    handleLoadCurrentStudentEvaluation,
    handleRemoveCurrentStudentEvaluation
  ]);

  if (loadingEvaluationAc || evaluationsAc.length === 0) {
    return (
      <EmptyContentScreen />
    );
  }

  if (!evaluationsAc[0].details || !evaluationsAc[0].evaluation) {
    return (
      <EmptyContentScreen />
    );
  }

  return (
    <>
      <div className='col-8'>
        <div className='card'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="far fa-file-alt mr-2 icon-primary" />
              Evaluaciones para el Estudiante
            </h5>
          </div>
          <div className='col-12'>
            <Accordion>
              <AccordionTab headerTemplate={headerTabTemplate('Autoevaluación')}>
                <TopicStudentAutoEvaluationAcApp
                  currentMethodology={currentMethodology}
                  userAc={userAc}
                  evaluation={evaluationsAc[0].evaluation}
                  details={evaluationsAc[0].details}
                  toast={toast}
                />
              </AccordionTab>
              <AccordionTab headerTemplate={headerTabTemplate("Coevaluación")}>
                <TopicStudentCoEvaluationAcApp
                  currentMethodology={currentMethodology}
                  userAc={userAc}
                  evaluation={evaluationsAc[0].evaluation}
                  details={evaluationsAc[0].details}
                  toast={toast}
                />
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
      <div className='col-4'>
        <div className='card'>
          <div className='col-12'>
            <h5>
              Esta es mi Nota Final...
            </h5>
          </div>
          {
            (evaluationsAc[0].evaluation.final_value || 
            evaluationsAc[0].evaluation.final_value > 0)
              ? (
                <div className='col-12'>
                  <h2 className='text-center'>
                    <i className="fas fa-book-reader mr-3 icon-primary" />
                    {evaluationsAc[0].evaluation.final_value}
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
    </>
  )
});
