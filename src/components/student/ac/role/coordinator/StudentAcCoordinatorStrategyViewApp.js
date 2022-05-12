import React from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';

import { 
  startBlockCoordinatorStrategyAc 
} from '../../../../../actions/student/ac_roles/coordinatorAc/coordinatorStategyAc';


export const StudentAcCoordinatorStrategyViewApp = React.memo(({
  coordinatorStrategies,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockCoordinatorStrategy = ( data ) => {
    dispatch( startBlockCoordinatorStrategyAc( data, toast ) );
    console.log(data);
  }

  const handleConfirmBlockCoordinatorStrategy = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear la siguiente estrategia?',
      header: 'Confirmación de bloqueo',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-button-raised p-button-secondary',
      accept: () => handleBlockCoordinatorStrategy( data ),
    });
  };

  return (
    <div className='grid p-fluid'>
      {
        coordinatorStrategies.map( (item, index) => (
          <div className='col-12' key={index}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <p>{item.strategy}</p>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-5'>
                      <Button 
                        label='Bloquear Estrategia'
                        icon='fas fa-ban'
                        className='p-button-raised p-button-secondary'
                        onClick={ () => handleConfirmBlockCoordinatorStrategy( item.id ) }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
});
