import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Messages } from 'primereact/messages';

import { StudentAcOrganizerActionFormApp } from './StudentAcOrganizerActionFormApp';
import { StudentAcOrganizerAssignFormApp } from './StudentAcOrganizerAssignFormApp';
import { StudentAcOrganizerTeamDescriptionApp } from './StudentAcOrganizerTeamDescriptionApp';

import { 
  startRemoveOrganizerActionAcList 
} from '../../../../../actions/student/ac_roles/organizerAc/organizerActionAc';
import { 
  startRemoveAssignActivityOrganizerAcList 
} from '../../../../../actions/student/ac_roles/organizerAc/assignActivityOrganizerAc';
import { 
  startRemoveDescribeUnderstadingOrganizerAcList 
} from '../../../../../actions/student/ac_roles/organizerAc/describeUnderstadingOrganizerAc';


export const StudentAcOrganizerRoleBodyApp = React.memo(({
  userId,
  currentMethodology,
  teamDetailAc,
  toast
}) => {
  
  const dispatch = useDispatch();
  const infoMsg = useRef(null);

  const handleRemoveOrganizerData = useCallback(
    () => {
      dispatch( startRemoveOrganizerActionAcList() );
      dispatch( startRemoveAssignActivityOrganizerAcList() );
      dispatch( startRemoveDescribeUnderstadingOrganizerAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'El rol de Organizador contempla el orden y la organización del equipo, se ' +
        'encarga de que todos entiendan cuál es el problema, cómo se resuelve y qué ' +
        'solución plantea el equipo.',
        sticky: true
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (Object.keys(teamDetailAc).length > 0) {
        handleRemoveOrganizerData();
      }
    }
  }, [teamDetailAc, handleRemoveOrganizerData]);
  
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
          <StudentAcOrganizerActionFormApp 
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcOrganizerAssignFormApp 
            acId={currentMethodology.id}
            userId={userId}
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentAcOrganizerTeamDescriptionApp 
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
    </div>
  )
});
