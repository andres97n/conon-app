import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Panel } from 'primereact/panel';

import { StudentAcTeamHeaderApp } from './StudentAcTeamHeaderApp';
import { StudentAcViewRubricApp } from './StudentAcViewRubricApp';
import { StudentAcRubricSectionApp } from './StudentAcRubricSectionApp';

import { startLoadCurrentTeamAc } from '../../../actions/teacher/teamAc';
import { startLoadCurrentRubricAc } from '../../../actions/teacher/rubricAc';


export const StudentAcHeaderApp = React.memo(({
  acId,
  userId,
  userAc
}) => {

  const dispatch = useDispatch();
  const { currentTeam, loadingTeamDetailAc } = useSelector(state => state.dashboard.teamAc);
  const { 
    currentRubric,
    loadingRubricDetailAc 
  } = useSelector(state => state.dashboard.rubricAc);

  const handleLoadTeamAcData = useCallback(
    ( acId, userId ) => {
      dispatch( startLoadCurrentTeamAc(acId, userId) );
    }, [dispatch],
  );

  const handleLoadRubricAcData = useCallback(
    ( acId ) => {
      dispatch( startLoadCurrentRubricAc(acId) );
    }, [dispatch],
  );

  useEffect(() => {
    if (userAc.role_type === 2 ) {
      if (userId && acId) {
        handleLoadTeamAcData( acId, userId );
      }
    }
  }, [userAc, acId, userId, handleLoadTeamAcData]);
  
  useEffect(() => {
    if (acId) {
      handleLoadRubricAcData( acId );
    }
  }, [acId, handleLoadRubricAcData]);

  return (
    <>
      <div className='card'>
        <Panel 
          header="Integrantes del Grupo" 
          toggleable
          collapsed={true}
          expandIcon='fas fa-plus'
          collapseIcon="fas fa-minus"
        >
          <div className='grid p-fluid'>
            <StudentAcTeamHeaderApp 
              currentTeam={currentTeam}
              loadingTeamDetailAc={loadingTeamDetailAc}
            />
          </div>
        </Panel>
        <Panel 
          header="Rúbrica de Calificación" 
          toggleable
          collapsed={true}
          expandIcon='fas fa-plus'
          collapseIcon="fas fa-minus"
        >
          <StudentAcViewRubricApp 
            currentRubric={currentRubric}
            loadingRubricDetailAc={loadingRubricDetailAc}
          />
        </Panel>
        <Panel 
          header="Detalles de Rúbrica" 
          toggleable
          collapsed={true}
          expandIcon='fas fa-plus'
          collapseIcon="fas fa-minus"
        >
          <StudentAcRubricSectionApp 
            currentRubric={currentRubric}
            loadingRubricDetailAc={loadingRubricDetailAc}
          />
        </Panel>
      </div>
    </>
  )
});
