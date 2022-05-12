import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from 'primereact/message';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { StudentAcCoordinatorAssignDetailApp } from './StudentAcCoordinatorAssignDetailApp';

import { 
  startLoadCurrentTeamAc, 
  startRemoveTeamAcDetailList 
} from '../../../../../actions/teacher/teamAc';


export const StudentAcCoordinatorAssignFormApp = React.memo(({
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

  const accordationTabHeaderTemplate = ( owner ) => (
    <React.Fragment>
      <p>
        <i className="fas fa-user mr-2 icon-primary" />
        {owner.name}
      </p>
    </React.Fragment>
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
          Calificar Rendimiento
        </h5>
      </div>
      <div className='col-12'>
        <Message 
          severity="info" 
          text='Saber que cada integrante cumple con su rol y aporta al equipo es 
          importante, de tal manera el Coordinador tiene la tarea de calificar ese aporte.'
        />
      </div>
      <div className='col-12'>
        <Accordion>
          {
            currentTeam[0].team_detail_ac.map( student =>(
              <AccordionTab 
                header={ accordationTabHeaderTemplate(student.owner) }
                key={student.id}
              >
                <StudentAcCoordinatorAssignDetailApp 
                  student={student}
                  teamDetailAc={teamDetailAc}
                  toast={toast}
                />
              </AccordionTab>
            ))
          }
        </Accordion>
      </div>
    </>
  )
});
