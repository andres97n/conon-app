import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  startLoadGetInformationModelAndReferencesAbpList, 
  startRemoveGetInformationStepSevenAbpList 
} from '../../../../../actions/student/abp_steps/getInformationStepSevenAbp';
import { EmptyTeamStepsDataAbpApp } from '../EmptyTeamStepsDataAbpApp';
import { GetInformationFormStepSevenAbpApp } from './GetInformationFormStepSevenAbpApp';
import { TeamInformationReferencesStepSevenAbpApp } from './TeamInformationReferencesStepSevenAbpApp';


export const StudentStepSevenAbpApp = React.memo(({
  teamDetail,
  selectedTopic,
  isModerator,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    currentGetInformationModel,
    loadingGetInformationModel, 
  } = useSelector( state => state.dashboard.getInformationStepSeven );
  const { name } = useSelector( state => state.auth );

  const handleLoadGetInformationAbpList = useCallback(
    ( teamAbpId ) => {
      dispatch( startLoadGetInformationModelAndReferencesAbpList(teamAbpId) );
    },
    [dispatch],
  );

  const handleRemoveGetInformationAbpList = useCallback(
    () => {
      dispatch( startRemoveGetInformationStepSevenAbpList() );
    },
    [dispatch],
  );

  useEffect(() => {
    if ( teamDetail && Object.keys(teamDetail).length > 0 ) {
      handleLoadGetInformationAbpList( teamDetail.id );
    }
  
    return () => {
      if ( teamDetail && Object.keys(teamDetail).length > 0 ) {
        handleRemoveGetInformationAbpList()
      }
    }
  }, [
    teamDetail, 
    handleLoadGetInformationAbpList, 
    handleRemoveGetInformationAbpList
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
                      Esta es la Información del Problema...
                    </h5>
                  )
                  : (
                    <h5 className='text-center'>
                      <i className="fas fa-users mr-2" />
                      Esta es la información actual del equipo
                    </h5>
                  )
              }
            </div>
            {
              currentGetInformationModel.length > 0
                ? (
                  <GetInformationFormStepSevenAbpApp 
                    getInformation={
                      currentGetInformationModel[0].information
                    }
                    teamId={teamDetail.id}
                    selectedTopic={selectedTopic}
                    isModerator={isModerator}
                    loadingGetInformationModel={loadingGetInformationModel}
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
        loadingGetInformationModel
          ? (
            <EmptyTeamStepsDataAbpApp />
          )
          : (
            currentGetInformationModel.length > 0
              ? (
                <TeamInformationReferencesStepSevenAbpApp 
                  currentReferences={currentGetInformationModel[0].references}
                  userId={teamDetail.user.id}
                  teamId={teamDetail.id}
                  name={name}
                  toast={toast}
                />
              )
              : (
                <div className='col-12'>
                  <div className='card'>
                    <small>
                      Aún no existen referencias sobre la recopilación de información.
                    </small>
                  </div>
                </div>
              )
          )
      }
    </>
  )
});
