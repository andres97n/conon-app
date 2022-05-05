import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { TeamDefinitionReferencesStepSixAbpApp } from './TeamDefinitionReferencesStepSixAbpApp';
import { ProblemDefinitionFormStepSixAbpApp } from './ProblemDefinitionFormStepSixAbpApp';

import { 
  startLoadProblemDefinitionAndReferencesAbpList,
  startRemoveProblemDefinitionStepSixAbpList 
} from '../../../../../actions/student/abp_steps/problemDefinitionStepSixAbp';

export const StudentStepSixAbpApp = React.memo(({
  teamDetail,
  isModerator,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    currentProblemDefinition,
    loadingProblemDefinition, 
  } = useSelector( state => state.dashboard.problemDefinitionStepSix );
  const { name } = useSelector( state => state.auth );

  const handleLoadProblemDefinitionAbpList = useCallback(
    ( teamAbpId ) => {
      dispatch( startLoadProblemDefinitionAndReferencesAbpList(teamAbpId) );
    },
    [dispatch],
  );

  const handleRemoveProblemDefinitionAbpList = useCallback(
    () => {
      dispatch( startRemoveProblemDefinitionStepSixAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    if ( teamDetail && Object.keys(teamDetail).length > 0 ) {
      handleLoadProblemDefinitionAbpList( teamDetail.id );
    }
  
    return () => {
      if ( teamDetail && Object.keys(teamDetail).length > 0 ) {
        handleRemoveProblemDefinitionAbpList()
      }
    }
  }, [
    teamDetail, 
    handleLoadProblemDefinitionAbpList, 
    handleRemoveProblemDefinitionAbpList
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
                      Esta es nuestra Definición del Problema...
                    </h5>
                  )
                  : (
                    <h5 className='text-center'>
                      <i className="fas fa-users mr-2" />
                      Esta es la Definición del Problema del equipo
                    </h5>
                  )
              }
            </div>
            {
              currentProblemDefinition.length > 0
                ? (
                  <ProblemDefinitionFormStepSixAbpApp 
                    problemDefinition={
                      currentProblemDefinition[0].problem_definition
                    }
                    teamId={teamDetail.id}
                    isModerator={isModerator}
                    toast={toast}
                  />
                )
                : (
                  <div className='col-12'>
                    <small>
                      Aún no existe información agregada sobre este paso.
                    </small>
                  </div>
                )
            }
          </div>
        </div>
      </div>
      {
        loadingProblemDefinition
          ? (
            <EmptyTeamStepsDataAbpApp />
          )
          : (
            currentProblemDefinition.length > 0 &&
              <TeamDefinitionReferencesStepSixAbpApp 
                currentReferences={currentProblemDefinition[0].references}
                userId={teamDetail.user.id}
                teamId={teamDetail.id}
                name={name}
                toast={toast}
              />
          )
      }
    </>
  )
});
