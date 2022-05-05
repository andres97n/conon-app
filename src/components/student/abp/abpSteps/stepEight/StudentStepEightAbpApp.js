import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';

import { ProblemResolutionFormStepEightAbpApp } from './ProblemResolutionFormStepEightAbpApp';
import { ProblemResolutionViewStepEightAbpApp } from './ProblemResolutionViewStepEightAbpApp';

import { 
  startLoadCurrentProblemResolutionAbpList, 
  startRemoveProblemResolutionStepEightAbpList 
} from '../../../../../actions/student/abp_steps/problemResolutionStepEightAbp';


export const StudentStepEightAbpApp = React.memo(({
  teamDetail,
  selectedTopic,
  isModerator,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    currentProblemResolutionAbp,
    loadingProblemResolutionAbp, 
  } = useSelector( state => state.dashboard.problemResolutionStepEight );

  const handleLoadProblemResolutionAbpList = useCallback(
    ( teamAbpId ) => {
      dispatch( startLoadCurrentProblemResolutionAbpList(teamAbpId) );
    }, [dispatch],
  );

  const handleRemoveProblemResolutionAbpList = useCallback(
    () => {
      dispatch( startRemoveProblemResolutionStepEightAbpList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( teamDetail && Object.keys(teamDetail).length > 0 ) {
      handleLoadProblemResolutionAbpList( teamDetail.id );
    }
  
    return () => {
      if ( teamDetail && Object.keys(teamDetail).length > 0 ) {
        handleRemoveProblemResolutionAbpList()
      }
    }
  }, [
    teamDetail, 
    handleLoadProblemResolutionAbpList, 
    handleRemoveProblemResolutionAbpList
  ]);

  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-12'>
            {  
              isModerator
                ? (
                  <h5 className='text-center'>
                    <i className="fas fa-lightbulb mr-2" />
                    Esta es la Resolución del Problema...
                  </h5>
                )
                : (
                  <h5 className='text-center'>
                    <i className="fas fa-users mr-2" />
                    Esta es la Solución del Equipo
                  </h5>
                )
            }
            </div>
            {
              loadingProblemResolutionAbp
              ? (
                <EmptyTeamStepsDataAbpApp />
              )
              : (
                isModerator
                  ? (
                    <ProblemResolutionFormStepEightAbpApp 
                      teamId={teamDetail.id}
                      selectedTopic={selectedTopic}
                      currentProblemResolutionAbp={currentProblemResolutionAbp}
                      toast={toast}
                    />
                  )
                  : (
                    <div className='col-12'>
                      <ProblemResolutionViewStepEightAbpApp 
                        currentProblemResolutionAbp={currentProblemResolutionAbp}
                      />
                    </div>
                  )
                )
            }
          </div>
        </div>
      </div>
    </>
  )
});
