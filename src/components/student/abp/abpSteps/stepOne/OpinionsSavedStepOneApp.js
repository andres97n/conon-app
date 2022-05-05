import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { startBlockOpinionStepOneAbp } from '../../../../../actions/student/abp_steps/opinionStepOneAbp';


export const OpinionsSavedStepOneApp = React.memo(({
    opinionStepOneAbp,
    handleSetOpinionCount,
    toast
}) => {

    const dispatch = useDispatch();

    const handleBlockOpinion = ( studentOpinion ) => {
        dispatch( startBlockOpinionStepOneAbp( studentOpinion.id, toast ) );
        handleSetOpinionCount(0, 'less');
    }

    const handleConfirmBlockOpinion = ( studentOpinionId ) => {
        confirmDialog({
            message: 'Está seguro que desea bloquear la siguiente Opinión??',
            header: 'Confirmación de bloqueo',
            icon: 'fas fa-exclamation-triangle',
            acceptLabel: 'Sí, bloquear opinión',
            acceptClassName: 'p-button-secondary',
            rejectLabel: 'No bloquear',
            accept: () => handleBlockOpinion( studentOpinionId ),
        });
      }

  return (
    <div className='card mt-2'>
        <div className='grid p-fluid'>
            <div className='col-12'>
                <h5>
                    <i className="fas fa-archive mr-2"></i>
                    Opiniones Generadas
                </h5>
            </div>
            {
                opinionStepOneAbp && opinionStepOneAbp.map((studentOpinion, index) => (
                    <div className='col-12' key={index}>
                        <div className='grid p-fluid'>
                            <div className='col-11' >
                                <div className='card'>
                                    <div className='grid p-fluid'>
                                        <div className='col-12'>
                                            <p className='align-justify'>
                                                <i className="fas fa-minus mr-2" />
                                                {studentOpinion.opinion}
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
                                        onClick={() => handleConfirmBlockOpinion(
                                            studentOpinion
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
});
