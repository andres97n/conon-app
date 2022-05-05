import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { confirmDialog } from 'primereact/confirmdialog';
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';

import { StudentReferenceAbpApp } from '../StudentReferenceAbpApp';
import { TeamUnknownReferencesStepFourAbpApp } from './TeamUnknownReferencesStepFourAbpApp';

import { 
  startBlockUnknownConceptStepFourAbp, 
  startSaveUnknownConceptReferenceStepFourAbp 
} from '../../../../../actions/student/abp_steps/unknownConceptStepFourAbp';

export const TeamUnknownConceptsStepFourAbpApp = React.memo(({
  currentTeamUnknownConcepts,
  userId,
  isModerator,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );
  const [showUrlConceptsInput, setShowUrlConceptsInput] = useState([]);
  const infoMsg = useRef(null);

  const handleLoadShowUrlConceptsInput = useCallback(
    ( data ) => {
      setShowUrlConceptsInput( data );
    },
    [setShowUrlConceptsInput],
  );

  const handleSubmitReference = useCallback(
    ( data, conceptId ) => {
      console.log('entro SUBMIT');
      const newReference = {
        user: userId,
        unknown_concept_step_four_abp: conceptId,
        url_reference: data.reference,
        active: true
      };
      dispatch( startSaveUnknownConceptReferenceStepFourAbp( newReference, name, toast ) );  
    },
    [dispatch, userId, name, toast],
  );  

  const handleBlockUnknownConcept= ( conceptId ) => {
    dispatch( startBlockUnknownConceptStepFourAbp( conceptId, toast ) );
  }

  const handleConfirmBlockUnknownConcept = ( conceptId ) => {
    confirmDialog({
        message: '¿Está seguro que desea bloquear el siguiente concepto?',
        header: 'Confirmación de bloqueo',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, bloquear',
        rejectLabel: 'No bloquear',
        acceptClassName: 'p-button-secondary',
        accept: () => handleBlockUnknownConcept( conceptId ),
    });
  }

  useEffect(() => {
    if ( 
      currentTeamUnknownConcepts.length > 0 && 
      infoMsg.current?.state.messages?.length === 0 
    ) {
      infoMsg.current.show({
        severity: 'warn',
        detail: 'Recuerde que para ingresar un enlace como referencia, lo deberá ingresar ' +
        'con el protocolo del enlace. (ej: https://www.google.com)',
        sticky: true
      });
    }
  }, [currentTeamUnknownConcepts]);

  useEffect(() => {
    if (currentTeamUnknownConcepts.length > 0 && userId) {
      const concepts = currentTeamUnknownConcepts.map( concept => ({
        unknown_concept: concept.unknown_concept.id,
        is_referenced: concept.references.some( 
          reference => reference.user.id === userId 
        )
      }));
      handleLoadShowUrlConceptsInput( concepts );
    }
  }, [currentTeamUnknownConcepts, userId, handleLoadShowUrlConceptsInput]);

  return (
    <div className='card'>
      <div className='grid p-fluid'>
        <div className='col-12'>
          <h5 className='text-center'>
            <i className="far fa-list-alt mr-2" />
            Lista de conceptos que el equipo desconoce
          </h5>
        </div>
        {
          (currentTeamUnknownConcepts && currentTeamUnknownConcepts.length === 0)
          ? (
            <div className='col-12'>
              <small className='align-justify'>
                Aún no existen conceptos agregados, 
                esto lo hace el <b>Moderador del Grupo</b>.
              </small>
            </div>
          )
          : (
            <>
              <div className='col-12'>
                <Messages
                  ref={infoMsg}
                  className='align-justify'
                />
              </div>
              {
                currentTeamUnknownConcepts.map( (data, index) => (
                  <div className='col-12' key={index}>
                    <div className='card'>
                      <div className='grid p-fluid'>
                        <div 
                          className={
                            (data.references.length >= 0 && data.references.length <=2)
                                ? ('col-8')
                                : (data.references.length === 3)
                                  ? ('col-7')
                                  : (data.references.length >= 4)
                                    && ('col-6')
                          }
                        >
                          <div className='card'>
                            <p className='align-justify'>
                            <i className="fas fa-asterisk mr-2" />
                                {data.unknown_concept.unknown_concept}
                            </p>
                          </div>
                        </div>
                        <div className={
                            data.references.length >= 0 && data.references.length <=2
                              ? ('col-4')
                              : (data.references.length === 3)
                                ? ('col-5')
                                : (data.references.length >= 4)
                                  && ('col-6')
                          }
                        >
                          <div className='grid p-fluid'>
                            {
                              showUrlConceptsInput.length > 0 &&
                              showUrlConceptsInput[index]?.is_referenced
                                ? (
                                    <TeamUnknownReferencesStepFourAbpApp 
                                      teamReferences={data.references}
                                      userId={userId}
                                      conceptId={data.unknown_concept.id}
                                      toast={toast}
                                    />
                                  )
                                  : (
                                    <StudentReferenceAbpApp
                                      conceptId={data.unknown_concept.id}
                                      isDisabled={false}
                                      handleSubmitReference={handleSubmitReference}
                                    />
                                )
                            }
                          </div>
                        </div>
                        {
                          isModerator && (
                            <div className='col-12'>
                              <div className='center-inside'>
                                <div className='col-3'>
                                  <Button 
                                    icon="pi pi-ban" 
                                    label='Bloquear Concepto'
                                    className='p-button-raised p-button-secondary'
                                    onClick={() => handleConfirmBlockUnknownConcept(
                                      data.unknown_concept.id
                                    )}  
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                ))
              }
            </>
          )
        }
      </div>
    </div>
  )
});
