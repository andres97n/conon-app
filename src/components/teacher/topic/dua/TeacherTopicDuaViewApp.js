import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TeacherTopicStudentTableListApp } from '../TeacherTopicStudentTableListApp';
import { TeacherTopicStudentDuaEvaluationApp } from './TeacherTopicStudentDuaEvaluationApp';
import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';

import { startLoadStudentsByTopic } from '../../../../actions/admin/topic';
import { 
  startLoadActivityWithQuestions, 
  startRemoveCurrentActivity 
} from '../../../../actions/teacher/activity';


export const TeacherTopicDuaViewApp = React.memo(({
  topic,
  currentMethodology
}) => {
  
  const dispatch = useDispatch();
  const { currentActivity } = useSelector(state => state.dashboard.activity);
  const [showStudentEvaluation, setShowStudentEvaluation] = useState(false);
  const [user, setUser] = useState({});

  const handleLoadStudentsByTopic = useCallback(
    ( topic ) => {
      dispatch(startLoadStudentsByTopic( topic.id ));
    }, [dispatch],
  );

  const handleSetShowEvaluation = useCallback(
    ( duaId ) => {
      if (duaId) {
        dispatch( startLoadActivityWithQuestions(duaId) );
      }
      setShowStudentEvaluation(true);
    }, [dispatch],
  );

  const handleRemoveActivityWithQuestions = useCallback(
    () => {
      dispatch( startRemoveCurrentActivity() );
    }, [dispatch],
  );

  const handleSetCurrentUser = useCallback(
    ( value ) => {
      setUser( value );
    }, [],
  );

  const handleHideEvaluation = useCallback(
    () => {
      setShowStudentEvaluation(false);
    },[],
  );

  useEffect(() => {
    if (topic) {
      handleLoadStudentsByTopic( topic );
    }
  }, [topic, handleLoadStudentsByTopic]);

  useEffect(() => {
    return () => {
      if (currentMethodology && Object.keys(currentMethodology).length > 0) {
        handleRemoveActivityWithQuestions();
      }
    }
  }, [currentMethodology, handleRemoveActivityWithQuestions]);

  if (!currentMethodology || Object.keys(currentMethodology).length === 0) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    ); 
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        {
          !showStudentEvaluation
            ? (
              <TeacherTopicStudentTableListApp 
                isTopicView={true}
                currentMethodology={currentMethodology}
                setShowStudentEvaluation={handleSetShowEvaluation}
                setUser={handleSetCurrentUser}
              />
            )
            : (
              <TeacherTopicStudentDuaEvaluationApp
                userId={user?.user}
                currentActivity={currentActivity}
                handleHideEvaluation={handleHideEvaluation}
              />
            )
        }
      </div>
    </div>
  )
});
