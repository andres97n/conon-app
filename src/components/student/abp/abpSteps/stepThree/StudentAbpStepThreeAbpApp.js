import React, { useCallback, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LearnedConceptFormStepThreeApp } from './LearnedConceptFormStepThreeApp';
import { TeamLearnedConceptsStepThreeApp } from './TeamLearnedConceptsStepThreeApp';

import { 
  startLoadLearnedConceptsStepThreeAbpList, 
  startRemoveLearnedConceptStepThreeAbpList 
} from '../../../../../actions/student/abp_steps/learnedConceptStepThreeAbp';


export const StudentAbpStepThreeAbpApp = React.memo(({
  is_moderator,
  teamDetail,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { 
    currentTeamLearnedConcepts, 
    loadingTeamLearnedConcepts 
  } = useSelector(state => state.dashboard.learnedConceptStepThree);

  const handleLoadLearnedConceptAbpData = useCallback(
    ( teamId ) => {
      dispatch( startLoadLearnedConceptsStepThreeAbpList( teamId ) );
    },
    [dispatch],
  );

  const handleRemoveLearnedConceptAbpData = useCallback(
    () => {
      dispatch( startRemoveLearnedConceptStepThreeAbpList() );
    },
    [dispatch],
  )
  
  useEffect(() => {
    if (
      teamDetail && 
      Object.keys(teamDetail).length > 0
    ) {
      handleLoadLearnedConceptAbpData( teamDetail.id );
    }
  
    return () => {
      if (
        teamDetail && 
        Object.keys(teamDetail).length > 0
      ) {
        handleRemoveLearnedConceptAbpData();
      }
    }
  }, [teamDetail, handleLoadLearnedConceptAbpData, handleRemoveLearnedConceptAbpData]);

  return (
    <>
      <div className='col-12'>
        {
          is_moderator && 
          <LearnedConceptFormStepThreeApp 
            teamId={teamDetail.id}
            conceptsSize={currentTeamLearnedConcepts.length}
            toast={toast}
          />
        }
      </div>
      <div className='col-12'>
        <div className='card'>
          <TeamLearnedConceptsStepThreeApp
            currentTeamLearnedConcepts={currentTeamLearnedConcepts}
            loadingTeamLearnedConcepts={loadingTeamLearnedConcepts}
            userId={teamDetail.user.id}
            isModerator={is_moderator}
            toast={toast}
          />
        </div>
      </div>
    </>
  )
});
