import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCount } from '../../../../../hooks/useCount';

import { StudentIdeaFormStepTwoAbpApp } from './StudentIdeaFormStepTwoAbpApp';
import { IdeasSavedStepTwoAbpApp } from './IdeasSavedStepTwoAbpApp';
import { TeamIdeasStepTwoAbpApp } from './TeamIdeasStepTwoAbpApp';

import { 
  startLoadIdeaStepTwoAbpList, 
  startLoadRateIdeaStepTwoAbpTeamList, 
  startRemoveRateStudentIdeaStepTwoAbpList, 
  startRemoveStudentIdeaStepTwoAbpList 
} from '../../../../../actions/student/abp_steps/studentIdeaStepTwoAbp';

export const StudentAbpStepTwoAbpApp = React.memo(({
  teamDetail,
  toast,
}) => {

  const dispatch = useDispatch();
  const { 
    currentStudentIdeas,
    ratingStudentIdeas,
    loadingStudentIdea,
    loadingRateStudentIdea 
  } = useSelector(
    state => state.dashboard.studentIdeaStepTwo
  );
  const [ count, increment, decrement, setInitialCount ] = useCount(0);

  const handleLoadStudentIdeaAbpData = useCallback(
    ( teamId, teamDetailId, user ) => {
      dispatch( startLoadIdeaStepTwoAbpList( teamDetailId ) );
      dispatch( startLoadRateIdeaStepTwoAbpTeamList( teamId, user.id ) );
    },
    [dispatch],
  );

  const handleRemoveStudentIdeaAbpData = useCallback(
    () => {
      dispatch( startRemoveStudentIdeaStepTwoAbpList() );
      dispatch( startRemoveRateStudentIdeaStepTwoAbpList() );
    },
    [dispatch],
  );
  
  useEffect(() => {
    setInitialCount( currentStudentIdeas.length );
  }, [currentStudentIdeas, setInitialCount]);
  
  useEffect(() => {
    if (
      teamDetail && 
      Object.keys(teamDetail).length > 0
    ) {
      handleLoadStudentIdeaAbpData( 
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
        handleRemoveStudentIdeaAbpData();
      }
    }
  }, [
    teamDetail, 
    handleLoadStudentIdeaAbpData, 
    handleRemoveStudentIdeaAbpData
  ]);

  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-12'>
              <h5>
                <i className="fas fa-lightbulb mr-2" />
                Inserto las siguientes ideas...
              </h5>
            </div>
            {
              <StudentIdeaFormStepTwoAbpApp 
                teamDetailId={teamDetail.team_detail_abp}
                studentIdeaCount={count}
                increment={increment}
                decrement={decrement}
                toast={toast}
              />
            }
            {
              currentStudentIdeas.length > 0 && 
                <IdeasSavedStepTwoAbpApp 
                  currentStudentIdeas={currentStudentIdeas}
                  loadingStudentIdea={loadingStudentIdea}
                  decrement={decrement}
                  toast={toast}
                />
            }
          </div>
        </div>
      </div>
      <div className='col-12'>
        {
          <TeamIdeasStepTwoAbpApp 
            ratingStudentIdeas={ratingStudentIdeas}
            loadingRateStudentIdea={loadingRateStudentIdea}
            userId={teamDetail.user.id}
            toast={toast}
          />
        }
      </div>
    </>
  )
});
