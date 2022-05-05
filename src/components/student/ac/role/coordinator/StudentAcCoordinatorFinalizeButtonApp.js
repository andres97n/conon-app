import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';


export const StudentAcCoordinatorFinalizeButtonApp = React.memo(() => {
  
  const dispatch = useDispatch();

  const handleSaveMethodologyAc = () => {
    // dispatch();
  }

  const handleConfirmSaveMethodologyAc = () => {
    confirmDialog({
      message: 'Si es que avanza hacia evaluaciones no podrá regresar, de tal manera Conon ' + 
      ' supone que la resolución del problema ha sido enviada. ¿Está seguro que desea ' + 
      ' continuar?',
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
              tooltip='Avanzar hacias evaluaciones.'
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
