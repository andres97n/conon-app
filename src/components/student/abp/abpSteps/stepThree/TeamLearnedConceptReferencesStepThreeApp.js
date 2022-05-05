import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { 
  startBlockLearnedConceptReferenceStepThreeAbp 
} from '../../../../../actions/student/abp_steps/learnedConceptStepThreeAbp';

export const TeamLearnedConceptReferencesStepThreeApp = React.memo(({
  teamReferences,
  userId,
  conceptId,
  // handleUpdateReference,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockConceptReference = ( referenceId ) => {
    dispatch( startBlockLearnedConceptReferenceStepThreeAbp(
      conceptId, referenceId, toast
    ));
      // handleUpdateReference( conceptId, false );
  }

  const handleConfirmBlockConceptReference = ( referenceId ) => {
    confirmDialog({
        message: '¿Está seguro que desea bloquear el siguiente enlace?',
        header: 'Confirmación de bloqueo',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, bloquear',
        rejectLabel: 'No bloquear',
        acceptClassName: 'p-button-secondary',
        accept: () => handleBlockConceptReference( referenceId ),
    });
  }

  return (
    <div className='col-12'>
      <div className='grid p-fluid'>
        {
          teamReferences && teamReferences.length === 0
            ? (
              <div className='col-12'>
                <div className='card'>
                  <small className='align-justify'>
                    Aún no existen referencias
                  </small>
                </div>
              </div>
            )
            : (
              teamReferences.map( reference => (
                <div 
                  className={
                    teamReferences.length >= 1 && teamReferences.length <= 2
                      ? ('col-6')
                      : (teamReferences.length === 3)
                        ? ('col-4')
                        : (teamReferences.length >= 4)
                          && ('col-3')
                  } 
                  key={reference.id}
                >
                  <div className='card'>
                    <div className='grid p-fluid'>
                      <div className='col-12'>
                        <div className='center-inside'>
                          <i className="fas fa-book-reader mr-2"/>
                        </div>
                      </div>
                      <div className='col-12'>
                        <p className='text-center'>
                          {reference.user.name}
                        </p>
                      </div>
                      <div className='col-12'>
                        <div className='center-inside'>
                        <a 
                            href={reference.url_reference} 
                            target="_blank" 
                            rel="noreferrer noopener"
                            className='text-center'
                        >
                          <p>
                            <i className="fas fa-external-link-alt mr-2" />
                            Enlace
                          </p>
                        </a>
                        </div>
                      </div>
                      {
                        reference.user.id === userId
                          && (
                            <div className='col-12'>
                              <div className='center-inside'>
                                <Button
                                  icon="pi pi-ban" 
                                  tooltip='Bloquear Referencia'
                                  tooltipOptions={{position: 'bottom'}}
                                  className='p-button-raised p-button-secondary'
                                  onClick={() => handleConfirmBlockConceptReference(
                                    reference.id
                                  )}  
                                />
                              </div>
                            </div>
                          )
                      }
                    </div>
                  </div>
                </div>
              ))
            )
        }
      </div>
    </div>
  )
});
