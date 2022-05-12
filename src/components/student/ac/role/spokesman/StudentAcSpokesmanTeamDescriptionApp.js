import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from 'primereact/message';
import { Accordion, AccordionTab } from 'primereact/accordion';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { 
  StudentAcSpokesmanTeamDescriptionDetailApp 
} from './StudentAcSpokesmanTeamDescriptionDetailApp';

import { 
  startLoadCurrentTeamAc, 
  startRemoveTeamAcDetailList 
} from '../../../../../actions/teacher/teamAc';


export const StudentAcSpokesmanTeamDescriptionApp = React.memo(({
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
          <i className="fas fa-list-ul mr-2 icon-primary" />
          Visualizar Actividades del Equipo
        </h5>
      </div>
      <div className='col-12'>
        <Message 
          severity="info" 
          text='Es importante saber el rendimiento del equipo y que ningún integrante
          pase desapercibido, es por esto que tiene la facultad de visualizar las
          actividades del mismo y describir o poner observaciones de lo que hacen.'
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
                <StudentAcSpokesmanTeamDescriptionDetailApp 
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
