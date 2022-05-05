import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  startLoadStudentActivityWithAnswers, 
  startRemoveCurrentStudentActivity 
} from '../../../../actions/teacher/activityStudent';
import { EmptyTeamStepsDataAbpApp } from '../../abp/abpSteps/EmptyTeamStepsDataAbpApp';
import { StudentDuaActivityBodyApp } from './StudentDuaActivityBodyApp';
import { StudentDuaViewActivityApp } from './StudentDuaViewActivityApp';


export const StudentDuaActivityApp = React.memo(({
  currentActivity,
  userId,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    currentStudentActivity,
    loadingStudentActivity
  } = useSelector( state => state.dashboard.studentActivity );

   const handleLoadCurrentStudentActivity = useCallback(
    ( activityId, userId ) => {
      dispatch( startLoadStudentActivityWithAnswers( activityId, userId ) );
    }, [dispatch],
  );

  const handleRemoveCurrentStudentActivity = useCallback(
    () => {
      dispatch( startRemoveCurrentStudentActivity() );
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
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          {
            (
              currentStudentActivity.length > 0 && 
              Object.keys(currentStudentActivity[0].activity_student).length > 0
            ) 
              ? 
                <h5 className='text-center icon-success'>
                  <i className="fas fa-check-circle mr-2" />
                  Actividad Realizada con éxito
                </h5>
              : 
                <h5 className='text-center'>
                  Actividad Planteada por el Docente
                </h5>
          }
        </div>
        {
          currentActivity.length === 1 && 
            (
              currentActivity[0].questions && currentActivity[0].questions.length === 0
                ? (
                  <div className='col-12'>
                    <small>Aún no existe ninguna actividad realizada por el Docente.</small>
                  </div>
                )
                : (
                  loadingStudentActivity
                    ? <EmptyTeamStepsDataAbpApp />
                    : (
                      currentStudentActivity.length > 0 && 
                      Object.keys(currentStudentActivity[0].activity_student).length > 0
                    )
                      ? <StudentDuaViewActivityApp 
                        currentActivity={currentActivity[0]}
                        currentStudentActivity={currentStudentActivity[0]}
                      />
                      : <StudentDuaActivityBodyApp 
                        currentActivity={currentActivity[0]}
                        userId={userId}
                        toast={toast}
                      />
                )
            )
        }
      </div>
    </div>
  )
});
