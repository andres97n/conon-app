import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
  startLoadOrganizerActionsAcList, 
  startRemoveOrganizerActionAcList 
} from '../../../../../actions/student/ac_roles/organizerAc/organizerActionAc';
import { 
  startLoadCoordinatorStrategiesAcList,
  startRemoveCoordinatorStrategyAcList 
} from '../../../../../actions/student/ac_roles/coordinatorAc/coordinatorStategyAc';
import { startLoadSecretaryInformationsAcList } from '../../../../../actions/student/ac_roles/secretaryAc/secretaryInformationAc';


export const StudentAcSpokesmanTeamDescriptionViewApp = ({
  teamDetailId,
  teamId,
  roleType
}) => {

  const dispatch = useDispatch();
  const {
    coordinatorStrategies
  } = useSelector( state => state.dashboard.coordinatorAc );
  const {
    organizerActions
  } = useSelector( state => state.dashboard.organizerAc );
  const {
    secretaryInformations
  } = useSelector( state => state.dashboard.secretaryAc );

  const handleLoadMemberActivity = useCallback(
    ( teamDetailId, teamId, roleType ) => {
      if (roleType === 1) {
        dispatch( startLoadCoordinatorStrategiesAcList( teamDetailId ));
      } else if (roleType === 3) {
        dispatch( startLoadOrganizerActionsAcList( teamDetailId ));
      } else if (roleType === 4) {
        // dispatch( startLoadSecretaryInformationsAcList( teamId ));
      }
    }, [dispatch],
  );

  const handleRemoveMemberActivity = useCallback(
    () => {
      dispatch( startRemoveCoordinatorStrategyAcList() );
      dispatch( startRemoveOrganizerActionAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( teamDetailId && teamId && roleType ) {
      handleLoadMemberActivity( teamDetailId, teamId, roleType );
    }
  
    return () => {
      if ( teamDetailId && roleType ) {
        handleRemoveMemberActivity()
      } 
    }
  }, [teamDetailId, teamId, roleType, handleLoadMemberActivity, handleRemoveMemberActivity ]);

  return (
    <div className='grid p-fluid'>
      {
        roleType === 1
          ? (
            coordinatorStrategies.length === 0
              ? (
                <div className='col-12'>
                  <small>Aún no existen estrategias subidas.</small>
                </div>
              )
              : (
                coordinatorStrategies.map( (data, index) => (
                  <div className='col-12' key={index}>
                    <div className='card'>
                      <p id='area-wrap'>{data.strategy}</p>
                    </div>
                  </div>
                ))
              )
          )
          : roleType === 3
            ? (
              organizerActions.length === 0
                ? (
                  <div className='col-12'>
                    <small>Aún no existen acciones subidas.</small>
                  </div>
                )
                : (
                  organizerActions.map( (data, index) => (
                    <div className='col-12' key={index}>
                      <div className='card'>
                        <p id='area-wrap'>{data.action}</p>
                      </div>
                    </div>
                  ))
                )
            )
            : roleType === 4
              ? (
                secretaryInformations.length === 0
                  ? (
                    <div className='col-12'>
                      <small>Aún no existen enlaces subidos.</small>
                    </div>
                  )
                  : (
                    secretaryInformations.map( (data, index) => (
                      <div className='col-6' key={index}>
                        <div className='card'>
                            <a 
                              href={data.external_path} 
                              target="_blank" 
                              rel="noreferrer noopener"
                              className='text-center'
                            >
                              <p>
                                <i className="fas fa-external-link-alt mr-2" />
                                Enlace
                              </p>
                            </a>
                        </div>
                      </div>
                    ))
                  )
              )
              : (
                <div className='col-12'>
                  <small>No se pudo encontrar el rol de este integrante.</small>
                </div>
              )
      }
    </div>
  )
}
