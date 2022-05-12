import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Messages } from 'primereact/messages';

import { StudentAcSpokesmanQuestionFormApp } from './StudentAcSpokesmanQuestionFormApp';
import { StudentAcSpokesmanTeamDescriptionApp } from './StudentAcSpokesmanTeamDescriptionApp';
import { StudentAcSpokesmanTeamResumeFormApp } from './StudentAcSpokesmanTeamResumeFormApp';

import { 
  startRemoveSpokesmanQuestionAcList 
} from '../../../../../actions/student/ac_roles/spokesmanAc/spokesmanQuestionAc';
import {
  startRemoveActivityDescriptionSpokesmanAcList
} from '../../../../../actions/student/ac_roles/spokesmanAc/activitityDescriptionSpokesmanAc';
import { 
  startRemovePerformanceDescriptionSpokesmanAcList 
} from '../../../../../actions/student/ac_roles/spokesmanAc/performanceDescriptionSpokesmanAc';


export const StudentAcSpokesmanRoleBodyApp = React.memo(({
  userId,
  currentMethodology,
  selectedTopic,
  teamDetailAc,
  toast
}) => {

  const dispatch = useDispatch();
  const infoMsg = useRef(null);

  const handleRemoveSpokesmanData = useCallback(
    () => {
      dispatch( startRemoveSpokesmanQuestionAcList() );
      dispatch( startRemoveActivityDescriptionSpokesmanAcList() );
      dispatch( startRemovePerformanceDescriptionSpokesmanAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'El rol de Portavoz es la persona que comunica dudas y comentarios al ' +
        'Docente y/o integrantes del equipo con el objetivo de que cada uno de los ' +
        'integrantes se sientan escuchados, y la mejor manera de hacerlo es por medio ' + 
        'de un representante que cumpla este rol.',
        sticky: true
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (Object.keys(teamDetailAc).length > 0) {
        handleRemoveSpokesmanData();
      }
    }
  }, [teamDetailAc, handleRemoveSpokesmanData]);

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
          <StudentAcSpokesmanQuestionFormApp 
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcSpokesmanTeamDescriptionApp
            userId={userId}
            acId={currentMethodology.id}
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <StudentAcSpokesmanTeamResumeFormApp 
            selectedTopic={selectedTopic}
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
    </div>
  )
});
