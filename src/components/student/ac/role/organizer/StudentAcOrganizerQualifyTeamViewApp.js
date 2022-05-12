import React from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux';

import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';

import { 
  startBlockDescribeUnderstadingOrganizerAc 
} from '../../../../../actions/student/ac_roles/organizerAc/describeUnderstadingOrganizerAc';


export const StudentAcOrganizerQualifyTeamViewApp = React.memo(({
  currentOrganizerDescribeUnderstanding,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockStudentObservation = ( data ) => {
    dispatch( startBlockDescribeUnderstadingOrganizerAc( data, toast ));
  }

  const handleConfirmBlockStudentObservation = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear la siguiente descripción?',
      header: 'Confirmación de bloqueo',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-raised-button p-button-secondary',
      accept: () => handleBlockStudentObservation( data ),
    });
  };

  return (
    <>
      <div className='col-12'>
        <h6 className='text-center'>
          Valoración del Entendimiento Global sobre el Problema
        </h6>
        <div className='center-inside'>
          <Rating 
            stars={10} 
            value={currentOrganizerDescribeUnderstanding.member_assessment}
            readOnly={true}
          />
        </div>
      </div>
      <div className='col-12'>
        <h6 className='text-center'>
          Esto es lo que este Integrante entendió sobre el tópico en general...
        </h6>
        <p id='area_wrap'>{currentOrganizerDescribeUnderstanding.understanding}</p>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-5'>
            <Button 
              label='Bloquear Descripción'
              className='p-raised-button p-button-secondary'
              icon='fas fa-ban'
              onClick={() => handleConfirmBlockStudentObservation(
                currentOrganizerDescribeUnderstanding.id
              )}
            />
          </div>
        </div>
      </div>
    </>
  )
});
