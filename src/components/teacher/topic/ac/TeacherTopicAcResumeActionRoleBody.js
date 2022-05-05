import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';
import { TeacherTopicAcActionRoleDetailApp } from './TeacherTopicAcActionRoleDetailApp';

import { startLoadCurrentRubricAc, startRemoveRubricDetailAcList } from '../../../../actions/teacher/rubricAc';
import { startRemoveEvaluationDetailAcList } from '../../../../actions/teacher/evaluationAc';
import { getIconRole, getLabelRole } from '../../../../helpers/topic/table/topicTable';


export const TeacherTopicAcResumeActionRoleBody = React.memo(({
  student,
  topic,
  currentMethodology,
  toast,
}) => {

  const dispatch = useDispatch();
  const { 
    currentRubric, 
    loadingRubricDetailAc 
  } = useSelector(state => state.dashboard.rubricAc);

  const handleLoadEvaluationData = useCallback(
    ( methodologyId ) => {
      dispatch(startLoadCurrentRubricAc( methodologyId ));
    }, [dispatch],
  );

  const handleRemoveEvaluationData = useCallback(
    () => {
      dispatch( startRemoveRubricDetailAcList() );
      dispatch( startRemoveEvaluationDetailAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if (Object.keys(currentMethodology).length > 0) {
      handleLoadEvaluationData( currentMethodology.id );
    }

    return () => {
      if (Object.keys(currentMethodology).length > 0) {
        handleRemoveEvaluationData();
      }
    }
  }, [currentMethodology, handleLoadEvaluationData, handleRemoveEvaluationData]);

  if (loadingRubricDetailAc || currentRubric.length === 0) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  if (!currentRubric[0].rubric_ac || !currentRubric[0].rubric_detail_ac) {
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
          <i className="fas fa-user-check mr-2 icon-success" />
          Calificar Rendimiento
        </h5>
        <h5 className='text-center'>
          <i className={
            `${getIconRole(student.role_type)} icon-primary`
          } />
          { student.owner.name } - {getLabelRole(student.role_type)}
        </h5>
      </div>
      <div className='col-12'>
        <Accordion>
          {
            <AccordionTab header='Calificar Rendimiento'>
              <div className='col-12'>
                <div className='card'>
                  <TeacherTopicAcActionRoleDetailApp 
                    methodologyId={currentMethodology?.id}
                    teamDetailId={student?.id}
                    currentRubric={currentRubric}
                    toast={toast}
                  />
                </div>
              </div>
            </AccordionTab>
          }
        </Accordion>
      </div>
    </div>
  )
});
