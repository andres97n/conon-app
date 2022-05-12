import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Messages } from 'primereact/messages';

import { 
  StudentAcCoordinatorFormResolutionApp 
} from './StudentAcCoordinatorFormResolutionApp';
import { StudentAcCoordinatorStrategyFormApp } from './StudentAcCoordinatorStrategyFormApp';
import { StudentAcCoordinatorAssignFormApp } from './StudentAcCoordinatorAssignFormApp';
import { 
  StudentAcCoordinatorFinalizeButtonApp 
} from './StudentAcCoordinatorFinalizeButtonApp';

import { 
  startRemoveCoordinatorStrategyAcList 
} from '../../../../../actions/student/ac_roles/coordinatorAc/coordinatorStategyAc';
import { 
  startRemoveMemberPerformanceCoordinatorAcList 
} from '../../../../../actions/student/ac_roles/coordinatorAc/memberPerformanceCoordinatorAc';
import { 
  startRemoveProblemResolutionGroupAcList 
} from '../../../../../actions/student/ac_roles/coordinatorAc/problemResolutionGroupAc';


export const StudentAcCoordinatorRoleBodyApp = React.memo(({
  userId,
  teamDetailAc,
  currentMethodology,
  selectedTopic,
  toast
}) => {

  const dispatch = useDispatch();
  const infoMsg = useRef(null);

  const handleRemoveCoodinatorData = useCallback(
    () => {
      dispatch( startRemoveCoordinatorStrategyAcList());
      dispatch( startRemoveMemberPerformanceCoordinatorAcList() );
      dispatch( startRemoveProblemResolutionGroupAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'El rol de Coordinador es el más importante, debido a que es el encargado ' + 
        'de controlar y manejar el desarrollo de la resolución del problema, así como ' +
        'el de llevar el orden y la participación de cada uno de sus compañeros.',
        sticky: true
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (Object.keys(teamDetailAc).length > 0) {
        handleRemoveCoodinatorData();
      }
    }
  }, [teamDetailAc, handleRemoveCoodinatorData]);

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
          <StudentAcCoordinatorStrategyFormApp 
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <StudentAcCoordinatorAssignFormApp 
            acId={currentMethodology.id}
            userId={userId}
            teamDetailAc={teamDetailAc}
            toast={toast}
          />
        </div>
      </div>
      <StudentAcCoordinatorFinalizeButtonApp 
        acId={currentMethodology.id}
        teamAcId={teamDetailAc.team_ac}
        toast={toast}
      />
      <div className='col-12'>
        <div className='card'>
          <StudentAcCoordinatorFormResolutionApp 
            selectedTopic={selectedTopic}
            teamAcId={teamDetailAc.team_ac}
            toast={toast}
          />
        </div>
      </div>
    </div>
  )
});
