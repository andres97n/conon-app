import React from 'react';
import { useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { startBlockStudentIdeaStepTwoAbp } from '../../../../../actions/student/abp_steps/studentIdeaStepTwoAbp';

export const IdeasSavedStepTwoAbpApp = React.memo(({
  currentStudentIdeas,
  loadingStudentIdea,
  decrement,
  toast
}) => {

  const dispatch = useDispatch();

  const handleBlockStudentIdea = ( ideaId ) => {
    console.log(ideaId);
    dispatch( startBlockStudentIdeaStepTwoAbp( ideaId, toast ) );
    decrement();
  }

  const handleConfirmBlockStudentIdea = ( ideaId ) => {
    confirmDialog({
        message: 'Está seguro que desea bloquear la siguiente Idea??',
        header: 'Confirmación de bloqueo',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, bloquear idea',
        acceptClassName: 'p-button-secondary',
        rejectLabel: 'No bloquear',
        accept: () => handleBlockStudentIdea( ideaId ),
    });
  }

  return (
    <div className='col-12 mt-2'>
      <div className='card'>
        <div className='grid p-grid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-th-list mr-2"/>
              Mi Lluvia de Ideas...
            </h5>
          </div>
          {
            (loadingStudentIdea)
              ? (
                <ProgressSpinner />
              )
              : (
                currentStudentIdeas && currentStudentIdeas.map( (idea, index) => (
                  <div className='col-12' key={index}>
                    <div className='grid p-fluid'>
                      <div className='col-11'>
                        <div className='card'>
                          <div className='grid p-fluid'>
                            <div className='col-12'>
                              <p className='align-justify'>
                              <i className="fas fa-minus mr-2" />
                                {idea.student_idea}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-1' style={{position: 'relative'}}>
                        <div className='vertical-center-grid'>
                        <Button 
                          icon="fas fa-ban" 
                          tooltip='Bloquear Comentario'
                          tooltipOptions={{position: 'bottom'}}
                          className="p-button-secondary"
                          onClick={() => handleConfirmBlockStudentIdea(idea.id)}
                        />
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
