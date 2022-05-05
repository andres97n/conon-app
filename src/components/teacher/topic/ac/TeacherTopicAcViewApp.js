import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TeacherTopicAcResumeActionRoleApp } from './TeacherTopicAcResumeActionRoleApp';
import { TeacherTopicAcGroupTableListApp } from './TeacherTopicAcGroupTableListApp';

import { startRemoveEvaluationDetailAcList } from '../../../../actions/teacher/evaluationAc';
import { startRemoveRubricDetailAcList } from '../../../../actions/teacher/rubricAc';
import { startLoadTeamAcWithStudents, startRemoveTeamAcDetailList } from '../../../../actions/teacher/teamAc';


export const TeacherTopicAcViewApp = React.memo(({
  topic,
  toast,
  currentMethodology
}) => {
  
  const dispatch = useDispatch();
  const [group, setGroup] = useState({});
  const [showGroupProgress, setShowGroupProgress] = useState(false);

  const handleLoadCurrentGroups = useCallback(
    ( abpId ) => {
      dispatch( startLoadTeamAcWithStudents( abpId ) );
    }, [dispatch],
  );

  const handleRemoveCurrentGroups = useCallback(
    () => {
      dispatch( startRemoveTeamAcDetailList() );
      dispatch( startRemoveRubricDetailAcList() );
      dispatch( startRemoveEvaluationDetailAcList() );
    },[dispatch],
  );

  const handleShowResumeSteps = useCallback(
    ( group ) => {
      setGroup( group );
      setShowGroupProgress( true );
    }, [],
  );

  const handleHideShowResumeRoles = useCallback(
    () => {
      setShowGroupProgress(false);
    }, [],
  );

  useEffect(() => {
    if (Object.keys(currentMethodology).length > 0) {
      handleLoadCurrentGroups( currentMethodology.id );
    }

    return () => {
      if (Object.keys(currentMethodology).length > 0) {
        handleRemoveCurrentGroups();
      }
    }
  }, [currentMethodology, handleLoadCurrentGroups, handleRemoveCurrentGroups]);



  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        {
          !showGroupProgress
            ? (
              <TeacherTopicAcGroupTableListApp
                currentMethodology={currentMethodology}
                setShowGroupProgress={handleShowResumeSteps}
              />
            )
            : (
              <TeacherTopicAcResumeActionRoleApp 
                topic={topic}
                toast={toast}
                currentMethodology={currentMethodology}
                group={group}
                handleHideShowResumeRoles={handleHideShowResumeRoles}
              />
            )
        }
      </div>
    </div>
  )
});
