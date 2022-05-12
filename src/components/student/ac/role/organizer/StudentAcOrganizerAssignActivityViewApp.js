import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { 
  startBlockAssignActivityOrganizerAc 
} from '../../../../../actions/student/ac_roles/organizerAc/assignActivityOrganizerAc';


export const StudentAcOrganizerAssignActivityViewApp = React.memo(({
  organizerAssignActivities,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockMemberActivity = ( data ) => {
    dispatch( startBlockAssignActivityOrganizerAc( data, toast ));
  }

  const handleConfirmSaveOrganizerActivity = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear las siguiente actividad?',
      header: 'Confirmación de bloqueo',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-raised-button p-button-secondary',
      accept: () => handleBlockMemberActivity( data ),
    });
  };

  return (
    <div className='grid p-fluid'>
      {
        organizerAssignActivities.map( (activity, index) => (
          <div className='col-12' key={index}>
            <div className='card'>
              <div className='grid p-fluid'>
                <div className='col-12'>
                  <p id='area_wrap'>{activity.member_activity}</p>
                </div>
                <div className='col-12'>
                  <div className='center-inside'>
                    <div className='col-5'>
                      <Button 
                        label='Bloquear Actividad'
                        className='p-raised-button p-button-secondary'
                        icon='fas fa-ban'
                        onClick={() => handleConfirmSaveOrganizerActivity(activity.id)}
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
