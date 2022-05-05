import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TeacherTopicGroupTableListApp } from '../TeacherTopicGroupTableListApp';
import { TeacherTopicAbpResumeStepsApp } from './TeacherTopicAbpResumeStepsApp';

import { startLoadTeamAbpWithDetails } from '../../../../actions/teacher/teamAbp';
import { startRemoveTopicStudents } from '../../../../actions/admin/topic';

// TODO: Aún falta mostrar el paso 8

export const TeacherTopicAbpViewApp = React.memo(({
  topic,
  toast,
  currentMethodology
}) => {

  const dispatch = useDispatch();
  const [group, setGroup] = useState({});
  const [showGroupProgress, setShowGroupProgress] = useState(false);

  const handleLoadCurrentGroups = useCallback(
    ( abpId ) => {
      dispatch( startLoadTeamAbpWithDetails( abpId ) );
    }, [dispatch],
  );

  const handleRemoveCurrentGroups = useCallback(
    () => {
      dispatch( startRemoveTopicStudents() );
    },[dispatch],
  );

  const handleShowResumeSteps = useCallback(
    ( group ) => {
      setGroup( group );
      setShowGroupProgress( true );
    }, [],
  );

  const handleHideShowResumeSteps = useCallback(
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
              <TeacherTopicGroupTableListApp 
                type={topic.type}
                setShowGroupProgress={handleShowResumeSteps}
              />
            )
            : (
              <TeacherTopicAbpResumeStepsApp
                topic={topic}
                toast={toast}
                currentMethodology={currentMethodology}
                group={group}
                handleHideShowResumeSteps={handleHideShowResumeSteps}
              />
            )
        }
      </div>
    </div>
  )
});
