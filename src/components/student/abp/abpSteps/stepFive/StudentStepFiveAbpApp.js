import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { StudentActionsSavedAbpApp } from './StudentActionsSavedAbpApp';
import { StudentPerformActionFormApp } from './StudentPerformActionFormApp';
import { TeamActionsStepFiveAbpApp } from './TeamActionsStepFiveAbpApp';

import { 
  startLoadStudentPerformActionStepFiveAbpList, 
  startLoadTeamPerformActionStepFiveAbpListExcludeStudent, 
  startRemovePerformActionStepFiveAbpList, 
  startRemoveRatePerformActionStepFiveAbpList 
} from '../../../../../actions/student/abp_steps/performActionStepFiveAbp';


export const StudentStepFiveAbpApp = React.memo(({
  teamDetail,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { 
    currentPerformActions,
    ratingPerformActions,
    loadingPerformAction,
    loadingRatePerformAction 
  } = useSelector(
    state => state.dashboard.performActionStepFive
  );

  const handleLoadStudentPerformActionAbpData = useCallback(
    ( teamId, teamDetailId, user ) => {
      dispatch( startLoadStudentPerformActionStepFiveAbpList( teamDetailId ) );
      dispatch( startLoadTeamPerformActionStepFiveAbpListExcludeStudent( teamId, user.id ) );
    },
    [dispatch],
  );

  const handleRemoveStudentPerformActionAbpData = useCallback(
    () => {
      dispatch( startRemovePerformActionStepFiveAbpList() );
      dispatch( startRemoveRatePerformActionStepFiveAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    if (
      teamDetail && 
      Object.keys(teamDetail).length > 0
    ) {
      handleLoadStudentPerformActionAbpData( 
        teamDetail.id, 
        teamDetail.team_detail_abp, 
        teamDetail.user 
      );
    }
    return () => {
      if (
        teamDetail && 
        Object.keys(teamDetail).length > 0
      ) {
        handleRemoveStudentPerformActionAbpData();
      }
    }
  }, [
    teamDetail, 
    handleLoadStudentPerformActionAbpData, 
    handleRemoveStudentPerformActionAbpData
  ]);
  
  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <div className='grid-p-fluid'>
            {
              <StudentPerformActionFormApp 
                performActionListSize={currentPerformActions.length}
                teamDetailId={teamDetail.team_detail_abp}
                toast={toast}
              />
            }
            {
              loadingPerformAction
                ? (
                  <EmptyTeamStepsDataAbpApp />
                )
                : (
                  currentPerformActions.length > 0 && 
                  <StudentActionsSavedAbpApp 
                    currentPerformActions={currentPerformActions}
                    toast={toast}
                  />
                )
            }
          </div>
        </div>
      </div>
      <div className='col-12'>
        {
          loadingRatePerformAction
            ? (
              <EmptyTeamStepsDataAbpApp />
            )
            : (
              <TeamActionsStepFiveAbpApp 
                ratingPerformActions={ratingPerformActions}
                userId={teamDetail.user.id}
              />
            )
        }
      </div>
    </>
  )
});
