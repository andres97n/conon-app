import React from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { useDispatch } from 'react-redux';

import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';

import { 
  startBlockMemberPerformanceCoordinatorAc 
} from '../../../../../actions/student/ac_roles/coordinatorAc/memberPerformanceCoordinatorAc';


export const StudentAcCoordinatorAssignDetailViewApp = React.memo(({
  memberPerformance,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockMemberCalification = ( assignId ) => {
    dispatch( startBlockMemberPerformanceCoordinatorAc( assignId, toast ) );
  }

  const handleConfirmBlockMemberCalification = ( assignId ) => {
    confirmDialog({
      message: '¿Está seguro que desea bloquear la siguiente calificación?',
      header: 'Confirmación de bloqueo',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-raised-button p-button-secondary',
      accept: () => handleBlockMemberCalification( assignId ),
    });
  };

  return (
    <>
      <div className='col-12'>
        <div className='center-inside'>
          <Rating 
            stars={10} 
            value={memberPerformance.member_assessment}
            readOnly={true}
            cancel={false}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-5'>
            <Button
              label='Bloquear Calificación'
              className='p-raised-button p-button-secondary'
              icon='fas fa-ban'
              onClick={() => handleConfirmBlockMemberCalification(memberPerformance.id)}
            />
          </div>
        </div>
      </div>
    </>
  )
});
