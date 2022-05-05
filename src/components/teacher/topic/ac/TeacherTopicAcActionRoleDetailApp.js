import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';
import { Message } from 'primereact/message';

import { TeacherTopicAcQualifyFormApp } from './TeacherTopicAcQualifyFormApp';

import { startLoadStudentEvaluationDetailAbpList } from '../../../../actions/teacher/evaluationAc';
import { getAcQualifySections } from '../../../../helpers/topic/table/topicTable';


export const TeacherTopicAcActionRoleDetailApp = React.memo(({
  methodologyId,
  teamDetailId,
  currentRubric,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { 
    evaluationDetailAc, 
    loadingEvaluationDetailAc 
  } = useSelector(state => state.dashboard.evaluationAc);
  const [qualifySections, setQualifySections] = useState([]);
  const isMounted = useRef(true);

  const handleLoadEvaluationData = useCallback(
    ( rubricId, teamDetailId ) => {
      dispatch(startLoadStudentEvaluationDetailAbpList( rubricId, teamDetailId ));
    }, [dispatch],
  );

  const handleSetQualifySections = useCallback(
    ( value ) => {
      setQualifySections( value );
    }, [],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (currentRubric.length > 0 && teamDetailId) {
      if (Object.keys(currentRubric[0].rubric_ac).length > 0) {
        if (isMounted.current) {
          handleLoadEvaluationData( currentRubric[0].rubric_ac.id, teamDetailId );
        }
      }
    }
  }, [currentRubric, teamDetailId, handleLoadEvaluationData]);

  useEffect(() => {
    if (currentRubric.length > 0 && evaluationDetailAc.length > 0) {
      if (currentRubric[0].rubric_detail_ac && evaluationDetailAc[0].evaluation) {
        if (evaluationDetailAc[0].details) {
          const newQualifySections = getAcQualifySections( 
            currentRubric[0].rubric_detail_ac, evaluationDetailAc[0].details 
          );
          handleSetQualifySections( newQualifySections );
        }
      }
    }
  }, [currentRubric, evaluationDetailAc, handleSetQualifySections]);

  if (loadingEvaluationDetailAc || evaluationDetailAc.length === 0) {
    return (
      <div className='grid p-fluid'>
        <div className='col-12'>
          <small>No se encontró la rúbrica correspondiente.</small>
        </div>
      </div>
    );
  }

  if (!evaluationDetailAc[0].evaluation && !evaluationDetailAc[0].details) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-clipboard-check mr-2 icon-primary" />
          Notal Final 
        </h5>
        <h3 className='text-center'>
          {
            (evaluationDetailAc[0].evaluation &&
            Object.keys(evaluationDetailAc[0].evaluation).length === 0)
              ? 0
              : evaluationDetailAc[0].evaluation.final_value
          } / {currentRubric[0].rubric_ac.ac_final_value}
        </h3>
      </div>
      {
        qualifySections.length === 0 
          ? (
            <EmptyContentScreen />
          )
          : (
            qualifySections.map( (section, index) => (
              <div className='col-4' key={index}>
                <div className='card'>
                  <div className='col-12'>
                    <h6 className='text-center'>
                      {section.rubric_detail_ac.detail_title}
                    </h6>
                  </div>
                  <div className='col-12'>
                    <h5 className='text-center'>
                      <i className="fas fa-percentage mr-2 icon-primary" />
                      {section.rubric_detail_ac.percentage_grade}
                    </h5>
                  </div>
                  {
                    (section.evaluation_detail_ac && 
                    Object.keys(section.evaluation_detail_ac).length > 0)
                      ? (
                        <div className='col-12'>
                          <h4 className='text-center'>
                            <i className="fas fa-check-circle mr-2 icon-success" />
                            {section.evaluation_detail_ac.detail_value} / {section.rubric_detail_ac.rating_value}
                          </h4>
                        </div>
                      )
                      : (
                        section.rubric_detail_ac.detail_title === 'Autoevaluación' ||
                        section.rubric_detail_ac.detail_title === 'Coevaluación'
                      )
                        ? (
                          <div className='col-12'>
                            <Message
                              severity="info" 
                              text="El estudiante se encarga de esta nota." 
                            />
                          </div>
                        )
                        : (
                          <TeacherTopicAcQualifyFormApp
                            evaluationAc={evaluationDetailAc[0].evaluation || {}}
                            section={section}
                            rubricId={currentRubric[0].rubric_ac.id}
                            teamDetailId={teamDetailId}
                            toast={toast}
                          />
                        )
                  }
                </div>
              </div>
            ))
          )
      }
    </div>
  )
});
