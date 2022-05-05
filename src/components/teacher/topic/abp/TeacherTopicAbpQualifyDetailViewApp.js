import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Message } from 'primereact/message';

import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';
import { TeacherTopicAbpQualifyFormApp } from './TeacherTopicAbpQualifyFormApp';

import { startLoadEvaluationDetailAbpList } from '../../../../actions/teacher/evaluationAbp';
import { startLoadCurrentRubricAbp } from '../../../../actions/teacher/rubricAbp';
import { getQualifySections } from '../../../../helpers/topic/table/topicTable';


export const TeacherTopicAbpQualifyDetailViewApp = React.memo(({
  methodologyId,
  teamDetailId,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { currentRubric, loadingRubricAbp } = useSelector(state => state.dashboard.rubricAbp);
  const { 
    evaluationDetailAbp, 
    loadingEvaluationAbp 
  } = useSelector(state => state.dashboard.evaluationAbp);
  const [qualifySections, setQualifySections] = useState([]);
  const isMounted = useRef(true);

  const handleLoadEvaluationData = useCallback(
    ( methodologyId, teamDetailId ) => {
      dispatch(startLoadCurrentRubricAbp( methodologyId ));
      dispatch(startLoadEvaluationDetailAbpList( methodologyId, teamDetailId ));
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
    if (methodologyId && teamDetailId && isMounted.current) {
      handleLoadEvaluationData( methodologyId, teamDetailId );
    }
  }, [methodologyId, teamDetailId, handleLoadEvaluationData]);

  useEffect(() => {
    if (currentRubric.length > 0 && evaluationDetailAbp.length > 0) {
      if (currentRubric[0].rubric_detail_abp && evaluationDetailAbp[0].evaluation) {
        if (evaluationDetailAbp[0].details) {
          const newQualifySections = getQualifySections( 
            currentRubric, evaluationDetailAbp[0].details 
          );
          handleSetQualifySections( newQualifySections );
        }
      }
    }
  }, [currentRubric, evaluationDetailAbp, handleSetQualifySections]);

  if (currentRubric.length === 0 || evaluationDetailAbp.length === 0) {
    return (
      <div className='grid p-fluid'>
        <div className='col-12'>
          <small>No se encontró la rúbrica correspondiente.</small>
        </div>
      </div>
    );
  }

  if (loadingEvaluationAbp || loadingRubricAbp) {
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
            (evaluationDetailAbp[0].evaluation &&
            Object.keys(evaluationDetailAbp[0].evaluation).length === 0)
              ? 0
              : evaluationDetailAbp[0].evaluation.final_grade
          } / {currentRubric[0].abp_final_value}
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
                      {section.rubric_detail_abp.title}
                    </h6>
                  </div>
                  <div className='col-12'>
                    <h5 className='text-center'>
                      <i className="fas fa-percentage mr-2 icon-primary" />
                      {section.rubric_detail_abp.grade_percentage}
                    </h5>
                  </div>
                  {
                    (section.evaluation_detail_abp && 
                    Object.keys(section.evaluation_detail_abp).length > 0)
                      ? (
                        <div className='col-12'>
                          <h4 className='text-center'>
                            <i className="fas fa-check-circle mr-2 icon-success" />
                            {section.evaluation_detail_abp.rating_value} / {section.rubric_detail_abp.rating_value}
                          </h4>
                        </div>
                      )
                      : (
                        section.rubric_detail_abp.title === 'Autoevaluación' ||
                        section.rubric_detail_abp.title === 'Coevaluación'
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
                          <TeacherTopicAbpQualifyFormApp
                            evaluationAbp={evaluationDetailAbp[0].evaluation || {}}
                            section={section}
                            methodologyId={methodologyId}
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
