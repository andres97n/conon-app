import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from 'primereact/message';
import { Panel } from 'primereact/panel';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { 
  StudentAcSecretarySendInfoDetailApp 
} from './StudentAcSecretarySendInfoDetailApp';

import { 
  startLoadCurrentTeamAc, 
  startRemoveTeamAcDetailList 
} from '../../../../../actions/teacher/teamAc';


export const StudentAcSecretarySendInfoFormApp = React.memo(({
  acId,
  userId,
  teamDetailAc,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { currentTeam, loadingTeamAc } = useSelector(state => state.dashboard.teamAc);

  const handleLoadAcInformationData = useCallback(
    ( acId, userId ) => {
      dispatch( startLoadCurrentTeamAc(acId, userId) );
    }, [dispatch],
  );

  const handleRemoveAcInformationData = useCallback(
    () => {
      dispatch( startRemoveTeamAcDetailList() );
    }, [dispatch],
  );

  useEffect(() => {
    if (acId && userId) {
      handleLoadAcInformationData( acId, userId );
    }
    return () => {
      if (acId && userId) {
        handleRemoveAcInformationData();
      }
    }
  }, [acId, userId, handleLoadAcInformationData, handleRemoveAcInformationData]);

  if (loadingTeamAc || currentTeam.length === 0) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  if (!currentTeam[0].team_ac || !currentTeam[0].team_detail_ac) {
    return (
      <div className='col-12'>
        <small>No existen integrantes en el grupo.</small>
      </div>
    );
  }

  if (
    Object.keys(currentTeam[0].team_ac).length === 0 || 
    currentTeam[0].team_detail_ac.length === 0
  ) {
    return (
      <div className='col-12'>
        <small>No existen integrantes en el grupo.</small>
      </div>
    );
  }

  return (
    <>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-hand-point-up mr-2 icon-primary" />
          Envíar Información Destacada
        </h5>
      </div>
      <div className='col-12'>
        <Message 
          severity="info" 
          text='Complementar con conocimiento hacia los demás integrantes es símbolo de 
          éxito en un equipo que colabora entre sí.'
        />
      </div>

      <div className='col-12'>
        {
          currentTeam[0].team_detail_ac.map( student =>(
            <div key={student.id}>
              {
                (student.owner.id !== userId) && (
                  <Panel
                    header={
                      <p>
                        <i className="fas fa-user mr-2 icon-primary" />
                        {student.owner.name}
                      </p>
                    } 
                    toggleable 
                    collapsed={true}
                    expandIcon='fas fa-plus'
                    collapseIcon="fas fa-minus"
                  >
                    <StudentAcSecretarySendInfoDetailApp 
                      student={student}
                      teamDetailAc={teamDetailAc}
                      toast={toast}
                    />
                  </Panel>
                )
              }
            </div>
          ))
        }      
      </div>
    </>
  )
});
