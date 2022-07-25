import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton } from 'primereact/skeleton';

import { TeamUnknownConceptsStepFourAbpApp } from './TeamUnknownConceptsStepFourAbpApp';
import { UnknownConcepStepFourFormAbpApp } from './UnknownConcepStepFourFormAbpApp';

import { 
  startLoadUnknownConceptStepFourAbpList, 
  startRemoveUnknownConceptStepFourAbpList 
} from '../../../../../actions/student/abp_steps/unknownConceptStepFourAbp';


export const StudentStepFourAbpApp = React.memo(({
  is_moderator,
  teamDetail,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    currentTeamUnknownConcepts, 
    loadingTeamUnknownConcepts 
  } = useSelector(state => state.dashboard.unknownConceptStepFour); 

  const handleLoadUnknownConceptAbpData = useCallback(
    ( teamId ) => {
      dispatch( startLoadUnknownConceptStepFourAbpList( teamId ) );
    },
    [dispatch],
  );

  const handleRemoveUnknownConceptAbpData = useCallback(
    () => {
      dispatch( startRemoveUnknownConceptStepFourAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    if (
      teamDetail && 
      Object.keys(teamDetail).length > 0
    ) {
      handleLoadUnknownConceptAbpData( teamDetail.id );
    }
  
    return () => {
      if (
        teamDetail && 
        Object.keys(teamDetail).length > 0
      ) {
        handleRemoveUnknownConceptAbpData();
      }
    }
  }, [
    teamDetail, 
    handleLoadUnknownConceptAbpData, 
    handleRemoveUnknownConceptAbpData
  ]);

  return (
    <>
      {
        is_moderator && (
          <div className='col-12'>
            <UnknownConcepStepFourFormAbpApp 
              teamId={teamDetail.id}
              conceptsSize={currentTeamUnknownConcepts.length}
              toast={toast}
            />
          </div>
        )
      }
      {
        loadingTeamUnknownConcepts
          ? (
            <>
              <div className='col-8'>
                <Skeleton className="mb-2" height="2rem"></Skeleton>
                <Skeleton height="2rem"className="p-mb-2"></Skeleton>
              </div>
              <div className='col-4'>
                <Skeleton className="mb-2" height="2rem"></Skeleton>
                <Skeleton height="2rem"className="p-mb-2"></Skeleton>
              </div>
            </>
          )
          : (
            <div className='col-12'>
              <TeamUnknownConceptsStepFourAbpApp 
                currentTeamUnknownConcepts={currentTeamUnknownConcepts}
                userId={teamDetail.user.id}
                isModerator={is_moderator}
                toast={toast}
              />
            </div>
          )
      }
    </>
  )
});
