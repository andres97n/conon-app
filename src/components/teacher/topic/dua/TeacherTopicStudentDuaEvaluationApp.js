import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import { 
  StudentDuaViewActivityApp 
} from '../../../student/dua/studentActivity/StudentDuaViewActivityApp';
import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';

import { 
  startLoadStudentActivityWithAnswers, startRemoveCurrentStudentActivity 
} from '../../../../actions/teacher/activityStudent';


export const TeacherTopicStudentDuaEvaluationApp = React.memo(({
  userId,
  currentActivity,
  handleHideEvaluation
}) => {

  const dispatch = useDispatch();
  const { 
    currentStudentActivity, 
    loadingStudentActivity 
  } = useSelector(state => state.dashboard.studentActivity);

  const handleLoadCurrentStudentActivity = useCallback(
    ( activityId, userId ) => {
      dispatch( startLoadStudentActivityWithAnswers( activityId, userId ) );
    }, [dispatch],
  );

  const handleRemoveCurrentStudentActivity = useCallback(
    () => {
      dispatch( startRemoveCurrentStudentActivity() )
    }, [dispatch],
  );

  useEffect(() => {
    if (currentActivity.length > 0 && userId) {
      handleLoadCurrentStudentActivity( currentActivity[0].activity.id, userId );
    }

    return () => {
      if (currentActivity.length > 0 && userId) {
        handleRemoveCurrentStudentActivity();
      }
    }
  }, [
    currentActivity, 
    userId, 
    handleLoadCurrentStudentActivity, 
    handleRemoveCurrentStudentActivity
  ]);

  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <div className='center-inside'>
          <div className='col-3'>
            <Button 
              label='Retornar a Lista'
              icon='fas fa-hand-point-left'
              className='p-button-raised p-button-text'
              onClick={handleHideEvaluation}
            />
          </div>
        </div>
      </div>
      <div className="col-12">
        {
          loadingStudentActivity 
            ? (
              <EmptyContentScreen />
            )
            : currentStudentActivity.length === 0
              ? (
                <Message 
                  severity="warn" 
                  text="Todavía no existe ninguan actividad para este tópico." 
                />
              )
              : !currentStudentActivity[0].activity_student 
                ? (
                  <Message 
                    severity="warn" 
                    text="Todavía no existe ninguan actividad para este tópico." 
                  />
                )
                : (Object.keys(currentStudentActivity[0].activity_student).length === 0)
                  ? (
                    <Message 
                      severity="info" 
                      text="Aún no existe ninguna actividad realizada por el Estudiante." 
                    />
                  )
                  : (
                    <StudentDuaViewActivityApp 
                      currentActivity={currentActivity[0]}
                      currentStudentActivity={currentStudentActivity[0]}
                    />
                  )
        }
      </div>
    </div>
  )
});
