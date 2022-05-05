import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Messages } from 'primereact/messages';
import { Tooltip } from 'primereact/tooltip';

import { startUpdateInteractionStepOneAbp } from '../../../../../actions/student/abp_steps/opinionStepOneAbp';
import { 
    getInteractionStepOne, 
    getInteractionStepOneDatabaseObject 
} from '../../../../../helpers/abp-steps';
import { getValueInteraction } from '../../../../../helpers/abp';

export const TeamOpinionsStepOneApp = React.memo(({
    loadingOpinionStepOneAbp,
    opinionsTeamAbp,
    userId
}) => {

    const dispatch = useDispatch();
    const [interactions, setInteractions] = useState([]);
    const infoMsg = useRef(null);

    const handleChangeInteractions = (opinionId, interactionId, value) => {
        const currentOpinionObject = getInteractionStepOne( 
            opinionsTeamAbp, opinionId, interactionId, value
        );
        const currentInteraction = getInteractionStepOneDatabaseObject( 
            interactions, opinionId, interactionId, value 
        );
        if (currentOpinionObject && currentInteraction) {
            dispatch(startUpdateInteractionStepOneAbp( 
                currentInteraction, currentOpinionObject 
            ));
            setInteractions(
                interactions.map( opinion => opinion.opinion === opinionId
                    ? (
                        {
                            opinion: opinionId,
                            interactions: opinion.interactions.map( interaction => 
                                interaction.interaction === interactionId
                                    ? ({
                                        interaction: interactionId,
                                        user: interaction.user,
                                        opinion_interaction: value
                                    })
                                    : ( interaction )
                            )
                        }
                    )
                    : ( opinion ) 
                )
            );
        } else{
            Swal.fire(
                'Error', 
                'No se pudo actualizar su interacción.', 
                'error'
            );
        }
    }

    const teamOpinionsTemplate = (
        <React.Fragment>
            <div className='grid p-fluid '>
            {
                interactions.length > 0 && opinionsTeamAbp.map(
                (studentInteraction, index) => (
                    <div className='col-12' key={index}>
                        <div className='grid p-fluid'>
                            <div className='col-9' >
                                <div className='card'>
                                    <div className='grid p-fluid'>
                                        <div className='col-12'>
                                            <p className='align-justify'>
                                            <i className="fas fa-asterisk mr-2" />
                                                {studentInteraction.opinion.opinion}
                                            </p>
                                        </div>
                                    </div>
                                    <p className='align-justify'>
                                        
                                    </p>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='grid p-fluid'>
                                    {
                                        studentInteraction.interactions && 
                                        studentInteraction.interactions.map(
                                            (interaction, i) => (
                                            <div className='col-4' key={i}>
                                                <div className='grid p-fluid'>
                                                    <div className='col-12'>
                                                        <h6 className='text-center'>
                                                            <i className="fas fa-book-reader mr-2"/>
                                                        </h6>
                                                        <p className='text-center'>
                                                            {interaction.user.name}
                                                        </p>
                                                    </div>
                                                    <div className='col-12'>
                                                        <TriStateCheckbox 
                                                            value={
                                                                interactions[index]?.interactions[i].opinion_interaction
                                                            }
                                                            disabled={userId !== interaction.user.id} 
                                                            className='center-element'
                                                            tooltip={
                                                                userId !== interaction.user.id
                                                                    ? ('Bloqueado')
                                                                    : ('Dispone de 3 opciones')
                                                            }
                                                            tooltipOptions={{position: 'bottom'}}
                                                            onChange={(e) => 
                                                                handleChangeInteractions(
                                                                    studentInteraction.opinion.id,
                                                                    interaction.id,
                                                                    e.value
                                                                )
                                                            } 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </React.Fragment>
    );

    useEffect(() => {
        if (infoMsg.current?.state.messages?.length === 0) {
            infoMsg.current.show({ 
                severity: 'info', 
                detail: "Demuestra tu participación interactuando con " +
                "cada opinión y demostrando lo que te parece cada una de ellas." , 
                sticky: true 
            });
        }
    }, [infoMsg]);
    

    useEffect(() => {
      if (opinionsTeamAbp.length > 0 && interactions.length === 0) {
        setInteractions(
            opinionsTeamAbp.map( opinion => ({
                opinion: opinion.opinion.id,
                interactions: opinion.interactions.map( interaction => ({
                    interaction: interaction.id,
                    user: interaction.user.id,
                    opinion_interaction: getValueInteraction(
                        interaction.opinion_interaction
                    )   
                }))
            }))
        );
      }
    }, [opinionsTeamAbp, interactions]);

  return (
    <div className='card'>
        <div className='grid p-fluid'>
            <div className='col-11'>
                <h5>
                    <i className="info fas fa-comments mr-2"></i>
                    Opiniones del equipo...
                </h5>
            </div>
            <div className='col-1'>
                <h2 className='text-center'>
                    <Tooltip target=".info-icon" />
                    <i 
                        className="fas fa-info-circle info-icon" 
                        data-pr-tooltip="Puede interactuar con las casillas que corresponden a su usuario" 
                        data-pr-position="bottom"
                    />
                </h2>
            </div>
            <div className='col-12'>
                <Messages
                    ref={infoMsg} 
                    className='align-justify'
                />
            </div>
            <div className='col-12'>
                {
                    (loadingOpinionStepOneAbp)
                        ? (
                            <ProgressSpinner />
                        )
                        : ( opinionsTeamAbp.length > 0 )
                            ? (teamOpinionsTemplate)
                            : (
                                <small>Aún no existen opiniones del equipo.</small>
                            )
                }
            </div>
        </div>
    </div>
  )
});
