import React from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';
import { startBlockOrganizerActionAc } from '../../../../../actions/student/ac_roles/organizerAc/organizerActionAc';


export const StudentAcOrganizerActionViewApp = React.memo(({
  organizerActions,
  toast
}) => {
  
  const dispatch = useDispatch();

  const handleBlockOrganizerAction = ( data ) => {
    dispatch( startBlockOrganizerActionAc( data, toast ));
  } 

  const handleConfirmBlockOrganizerAction = ( data ) => {
    confirmDialog({
      message: '¿Está seguro de bloquear la siguiente acción?',
      header: 'Confirmación de bloqueo',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-raised-button p-button-secondary',
      accept: () => handleBlockOrganizerAction( data ),
    });
  };

  return (
    <div className='grid p-fluid'>
      {
        organizerActions.map( (item, index) => (
          <div className='col-12' key={index}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <p>{item.action}</p>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-5'>
                      <Button 
                        label='Bloquear Acción'
                        className='p-raised-button p-button-secondary'
                        icon='fas fa-ban'
                        onClick={() => handleConfirmBlockOrganizerAction( item.id )}
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
