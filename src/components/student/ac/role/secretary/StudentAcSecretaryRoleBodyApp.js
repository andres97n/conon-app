import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Messages } from 'primereact/messages';

import { StudentAcSecretaryPathFormApp } from './StudentAcSecretaryPathFormApp';
import { StudentAcSecretarySendInfoFormApp } from './StudentAcSecretarySendInfoFormApp';

import { 
  startRemoveSecretaryInformationAcList 
} from '../../../../../actions/student/ac_roles/secretaryAc/secretaryInformationAc';


export const StudentAcSecretaryRoleBodyApp = React.memo(({
  userId,
  currentMethodology,
  teamDetailAc,
  toast
}) => {
  
  const dispatch = useDispatch();
  const infoMsg = useRef(null);

  const handleRemoveSecretaryData = useCallback(
    () => {
      dispatch( startRemoveSecretaryInformationAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'El rol de Secretario tiene como objetivo recaudar información necesaria ' +
        'para el equipo, para complementar con el trabajo de los demás integrantes del ' +
        'equipo.',
        sticky: true
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (Object.keys(teamDetailAc).length > 0) {
        handleRemoveSecretaryData();
      }
    }
  }, [teamDetailAc, handleRemoveSecretaryData]);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcSecretaryPathFormApp 
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcSecretarySendInfoFormApp 
            acId={currentMethodology.id}
            userId={userId}
          />
        </div>
      </div>
    </div>
  )
});
