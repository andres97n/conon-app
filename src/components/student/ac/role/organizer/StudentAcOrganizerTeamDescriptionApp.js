import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from 'primereact/message';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { StudentAcOrganizerQualifyTeamApp } from './StudentAcOrganizerQualifyTeamApp';

import { getIconRole } from '../../../../../helpers/topic/table/topicTable';


export const StudentAcOrganizerTeamDescriptionApp = React.memo(() => {

  const dispatch = useDispatch();
  const { currentTeam, loadingTeamAc } = useSelector(state => state.dashboard.teamAc);

  const headerAccorditionTemplate = ( student ) => (
    <React.Fragment>
      <i className={`${getIconRole(student.role_type)} icon-primary`}></i>
      <span>{student.owner.name}</span>
    </React.Fragment>
  )

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
          <i className="fas fa-edit mr-2 icon-primary" />
          Describir el Entendimiento del Problema
        </h5>
      </div>
      <div className='col-12'>
        <Message
          severity="info" 
          text='Es fundamental que el equipo vaya en un mismo camino hacia la solución, 
          por tal motivo se espera saber si cada uno de los integrantes entienden el 
          fundamento del problema e idealizan acciones para su resolución.'
          className='align-justify'
        />
      </div>
      <div className='col-12'>
        <Accordion>
        {
          currentTeam[0].team_detail_ac.map( student =>(
            <AccordionTab 
              header={headerAccorditionTemplate(student)}
              key={student.id}
            >
              <StudentAcOrganizerQualifyTeamApp />
            </AccordionTab>
          ))
        }
        </Accordion>
      </div>
    </>
  )
});
