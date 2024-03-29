import { Message } from 'primereact/message';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { StudentAcOrganizerAssingDetailApp } from './StudentAcOrganizerAssingDetailApp';

import { 
  startLoadCurrentTeamAc, 
  startRemoveTeamAcDetailList 
} from '../../../../../actions/teacher/teamAc';


export const StudentAcOrganizerAssignFormApp = React.memo(({
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

  const accordionTabHeaderTemplate = ( owner ) => (
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
          Asignar Actividades
        </h5>
      </div>
      <div className='col-12'>
        <Message
          severity="info" 
          text='Organizar y plantear actividades al equipo hace que la investigación y 
          el autoaprendizaje de cada integrante tenga un camino que seguir y no se lo 
          haga sólo por cumplir.'
          className='align-justify'
        />
      </div>
      <div className='col-12'>
        <Accordion>
          {
            currentTeam[0].team_detail_ac.map( student =>(
              <AccordionTab 
                header={accordionTabHeaderTemplate(student.owner)}
                key={student.id}
              >
                <StudentAcOrganizerAssingDetailApp 
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
