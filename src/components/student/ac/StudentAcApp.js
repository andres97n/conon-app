import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';
import { StudentAcHeaderApp } from './StudentAcHeaderApp';
import { StudentAcProblemApp } from './StudentAcProblemApp';
import { StudentAcQuestionsListApp } from './role/StudentAcQuestionsListApp';
import { StudentAcBodyApp } from './role/StudentAcBodyApp';
import { StudentAcReferenceListApp } from './role/StudentAcReferenceListApp';

import { 
  startLoadUserAc, 
  startRemoveTeamAcDetailList, 
  startRemoveTeamDetailAcUser, 
  startRemoveTeamFinished, 
  startSetTeamFinishedWork
} from '../../../actions/teacher/teamAc';
import { 
  startRemoveRubricDetailAcList 
} from '../../../actions/teacher/rubricAc';
import { StudentAcEvaluationApp } from './StudentAcEvaluationApp';


export const StudentAcApp = React.memo(({
  currentMethodology,
  selectedTopic,
  userId,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    userAc, 
    isTeamFinished, 
    loadingTeamDetailAc 
  } = useSelector(state => state.dashboard.teamAc);

  const handleLoadUserAc = useCallback(
    ( acId, userId ) => {
      dispatch( startLoadUserAc( acId, userId ) );
    }, [dispatch],
  );

  const handleLoadTeamFinished = useCallback(
    ( teamDetailId ) => {
      dispatch( startSetTeamFinishedWork( teamDetailId ) );
    }, [dispatch],
  );

  const handleRemoveUserAc = useCallback(
    () => {
      dispatch( startRemoveTeamDetailAcUser() );
      dispatch( startRemoveTeamAcDetailList() );
      dispatch( startRemoveRubricDetailAcList() );
    }, [dispatch],
  );

  const handleRemoveTeamFinished = useCallback(
    () => {
      dispatch( startRemoveTeamFinished() );
    }, [dispatch],
  );

  console.log(isTeamFinished);

  useEffect(() => {
    if (currentMethodology && userId) {
      handleLoadUserAc( currentMethodology.id, userId );
    }
  
    return () => {
      if (currentMethodology && userId) {
        handleRemoveUserAc();
      }
    }
  }, [currentMethodology, userId, handleLoadUserAc, handleRemoveUserAc]);

  useEffect(() => {
    if (Object.keys(userAc).length > 0) {
      handleLoadTeamFinished( userAc.id );
    }
  
    return () => {
      if (userAc) {
        handleRemoveTeamFinished();
      }
    }
  }, [userAc, handleLoadTeamFinished, handleRemoveTeamFinished]);

  if (loadingTeamDetailAc) {
    return (
      <EmptyContentScreen />
    );
  }

  if (Object.keys(userAc).length === 0) {
    return (
      <small>No se existe información acerca de este integrante.</small>
    );
  }

  return (
    <>
      <div className='col-12'>
        <StudentAcHeaderApp 
          acId={currentMethodology.id}
          userId={userId}
          userAc={userAc}
        />
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentAcProblemApp 
            currentMethodology={currentMethodology}
          />
        </div>
      </div>
      {
        isTeamFinished === 1 
          ? (
            <>
              <div className='col-12'>
                <div className='card'>
                  <StudentAcQuestionsListApp 
                    teamDetailAc={userAc}
                    toast={toast}
                  />
                  <StudentAcReferenceListApp 
                    teamDetailAc={userAc}
                    toast={toast}
                  />
                </div>
              </div>
              <div className='col-12'>
                <StudentAcBodyApp
                  userAc={userAc}
                  userId={userId}
                  currentMethodology={currentMethodology}
                  selectedTopic={selectedTopic}
                  toast={toast}
                />
              </div>
            </>
          )
          : (
            <StudentAcEvaluationApp />
          )
      }
    </>
  );
});
