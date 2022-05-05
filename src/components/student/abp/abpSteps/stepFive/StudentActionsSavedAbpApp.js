import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { 
  startBlockPerformActionStepFiveAbp 
} from '../../../../../actions/student/abp_steps/performActionStepFiveAbp';


export const StudentActionsSavedAbpApp = React.memo(({
  currentPerformActions,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockPerformAction = ( actionId ) => {
    dispatch( startBlockPerformActionStepFiveAbp( actionId, toast ) );
  }

  const handleConfirmBlockPerformAction = ( actionId ) => {
    confirmDialog({
        message: 'Está seguro que desea bloquear la siguiente Estrategia??',
        header: 'Confirmación de bloqueo',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, bloquear idea',
        acceptClassName: 'p-button-secondary',
        rejectLabel: 'No bloquear',
        accept: () => handleBlockPerformAction( actionId ),
    });
  }  

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-th-list mr-2"/>
              Mis Estrategias...
            </h5>
          </div>
          {
            currentPerformActions.map( (data, index) => (
              <div className='col-12' key={index}>
                <div className='card'>
                  <div className='grid p-fluid'>
                    <div className='col-12'>
                      <p className='align-justify'>
                        <i className="fas fa-minus mr-2" />
                        {data.action}
                      </p>
                    </div>
                    <div className='col-12'>
                      <div className='center-inside'>
                        <div className='col-3'>
                          <Button
                            icon="fas fa-ban" 
                            label='Bloquear Estrategia'
                            className="p-button-secondary p-button-raised"
                            onClick={() => handleConfirmBlockPerformAction(data.id)}
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
      </div>
    </div>
  )
});
