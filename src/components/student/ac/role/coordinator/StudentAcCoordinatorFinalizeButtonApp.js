import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { getToastMsg } from '../../../../../helpers/abp';
import { startUpdateTeamAc } from '../../../../../actions/teacher/teamAc';


export const StudentAcCoordinatorFinalizeButtonApp = React.memo(({
  acId,
  teamAcId,
  toast
}) => {
  
  const dispatch = useDispatch();

  const handleSaveMethodologyAc = () => {
    if (acId && teamAcId) {
      const newTeamAc = {
        ac: acId,
        team_state: 0,
        observations: '',
        active: true
      }
      dispatch( startUpdateTeamAc( teamAcId, newTeamAc, toast ));
    } else {
      getToastMsg(toast, 'error', 'No se encontró la metodogía AC para terminarla.' );
    }
  }
  const handleConfirmSaveMethodologyAc = () => {
    confirmDialog({
      message: 'Si es que avanza hacia las evaluaciones no podrá regresar, de tal manera ' + 
      '  Conon supone que la resolución del problema ha sido enviada, así como el progreso ' + 
      ' del equipo. ¿Está seguro que desea continuar?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSaveMethodologyAc(),
    });
  }

  return (
    <>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-4'>
            <Button
              label='Finalizar AC'
              icon='fas fa-running'
              iconPos='top'
              tooltip='Avanzar hacia las evaluaciones.'
              tooltipOptions={{position:'bottom'}}
              className='p-button-raised'
              onClick={handleConfirmSaveMethodologyAc}
            />
          </div>
        </div>
      </div>
    </>
  )
});
