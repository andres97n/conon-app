import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { confirmDialog } from 'primereact/confirmdialog';

import { 
  startBlockProblemDefinitionReferenceStepSixAbp 
} from '../../../../../actions/student/abp_steps/problemDefinitionStepSixAbp';
import { changeObjectDate } from '../../../../../helpers/abp-steps';

export const TeamDefinitionReferencesSavedStepSixAbpApp = React.memo(({
  currentReferences,
  userId,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockUserReference = ( referenceId ) => {
    dispatch( startBlockProblemDefinitionReferenceStepSixAbp(referenceId, toast) );
  }

  const handleConfirmBlockDefinitionReference = ( referenceId ) => {
    confirmDialog({
        message: '¿Está seguro que desea bloquear el siguiente enlace?',
        header: 'Confirmación de bloqueo',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, bloquear',
        rejectLabel: 'No bloquear',
        acceptClassName: 'p-button-raised p-button-secondary',
        accept: () => handleBlockUserReference( referenceId ),
    });
  }

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-users mr-2" />
              Referencias del Equipo
            </h5>
          </div>
          <div className='col-12'></div>
          {
            currentReferences && currentReferences.length === 0
              ? (
                <div className='col-12'>
                  <small>
                    Aún no existen referencias que respalden la definición del problema.
                  </small>
                </div>
              )
              : (
                currentReferences && currentReferences.map( (reference, index) => (
                  <div className='col-3' key={index}>
                    <div className='card'>
                      <div className='grid p-fluid'>
                        <div className='col-12'>
                          <h6 className='text-center'>
                            <i className="fas fa-book-reader icon-black mr-2" />
                            {reference.user.name}
                          </h6>
                        </div>
                        <div className='col-12'>
                          <div className='center-inside'>
                            <a 
                              href={reference.problem_reference} 
                              target="_blank" 
                              rel="noreferrer noopener"
                              className='text-center'
                            >
                              <p>
                                <i 
                                  className="fas fa-external-link-alt mr-2" />
                                Enlace
                              </p>
                            </a>
                          </div>
                        </div>
                        {
                          reference.user.id === userId && 
                            (
                              <div className='col-12'>
                                <div className='center-inside'>
                                  <div className='col-10'>
                                    <Button 
                                      label='Bloquear Enlace'
                                      icon='fas fa-ban'
                                      className='p-button-raised p-button-secondary'
                                      onClick={
                                        () => handleConfirmBlockDefinitionReference(
                                          reference.id
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                        }
                        <div className='col-12 mt-2'>
                          <div className='center-inside'>
                            <Badge
                              value={
                                changeObjectDate(reference.created_at)
                              } 
                              severity='info'
                            ></Badge>
                          </div>  
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
          }
        </div>
      </div>
    </div>
  )
});
