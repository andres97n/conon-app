import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Messages } from 'primereact/messages';
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';

import { 
  TeamLearnedConceptReferencesStepThreeApp 
} from './TeamLearnedConceptReferencesStepThreeApp';
import { StudentReferenceAbpApp } from '../StudentReferenceAbpApp';

import { 
  startBlockLearnedConceptStepThreeAbp, startSaveLearnedConceptReferenceStepThreeAbp 
} from '../../../../../actions/student/abp_steps/learnedConceptStepThreeAbp';

export const TeamLearnedConceptsStepThreeApp = React.memo(({
    currentTeamLearnedConcepts,
    loadingTeamLearnedConcepts,
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
      const newReference = {
        user: userId,
        learned_concept_step_three_abp: conceptId,
        url_reference: data.reference,
        active: true
      };
      dispatch( startSaveLearnedConceptReferenceStepThreeAbp( newReference, name, toast ) );  
    },
    [dispatch, userId, name, toast],
  );

  const handleBlockConceptLearned = ( conceptId ) => {
    dispatch( startBlockLearnedConceptStepThreeAbp( conceptId, toast ) );
  }

  const handleConfirmBlockLearnedConcept = ( conceptId ) => {
    confirmDialog({
        message: '¿Está seguro que desea bloquear el siguiente concepto?',
        header: 'Confirmación de bloqueo',
        icon: 'fas fa-exclamation-triangle',
        acceptLabel: 'Sí, bloquear',
        rejectLabel: 'No bloquear',
        acceptClassName: 'p-button-secondary',
        accept: () => handleBlockConceptLearned( conceptId ),
    });
  }

  useEffect(() => {
    if ( 
      currentTeamLearnedConcepts.length > 0 && 
      infoMsg.current?.state.messages?.length === 0 
    ) {
      infoMsg.current.show({
        severity: 'info',
        detail: 'Recuerde que para ingresar un enlace de referencia, lo deberá ingresar ' +
        'con el protocolo del enlace. (ej: https://www.google.com)',
        sticky: true
      });
    }
  }, [currentTeamLearnedConcepts]);

  useEffect(() => {
    if (currentTeamLearnedConcepts.length > 0 && userId) {
      const concepts = currentTeamLearnedConcepts.map( concept => ({
        learned_concept: concept.learned_concept.id,
        is_referenced: concept.references.some( 
          reference => reference.user.id === userId 
        )
      }));
      handleLoadShowUrlConceptsInput( concepts );
    }
  }, [currentTeamLearnedConcepts, userId, handleLoadShowUrlConceptsInput]);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="far fa-list-alt mr-2" />
          Conceptos que el equipo conoce
        </h5>
      </div>
      <div className='col-12'>
        <Messages
          ref={infoMsg}
          className='align-justify'
        />
      </div>
      {
        (loadingTeamLearnedConcepts)
          ? (
            <>
              <div className='col-8'>
                <Skeleton className="mb-2" height="2rem"></Skeleton>
                <Skeleton height="2rem"className="p-mb-2"></Skeleton>
              </div>
              <div className='col-4'>
                <Skeleton className="mb-2" height="2rem"></Skeleton>
                <Skeleton height="2rem"className="p-mb-2"></Skeleton>
              </div>
            </>
          )
          : (
              (currentTeamLearnedConcepts && currentTeamLearnedConcepts.length === 0)
                ? (
                  <div className='col-12'>
                    <small className='align-justify'>
                      Aún no existen conceptos agregados, 
                      esto lo hace el <b>Moderador del Grupo</b>.
                    </small>
                  </div>
                )
                : (
                  currentTeamLearnedConcepts.map( (data, index) => (
                    <div className='col-12' key={index}>
                      <div className='card'>
                        <div className='grid p-fluid'>
                          <div className={
                            (data.references.length >= 0 && data.references.length <=2)
                              ? ('col-8')
                              : (data.references.length === 3)
                                ? ('col-7')
                                : (data.references.length >= 4)
                                  && ('col-6')
                          }>
                            <div className='card'>
                              <p className='align-justify'>
                              <i className="fas fa-asterisk mr-2" />
                                  {data.learned_concept.learned_concept}
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
                          }>
                            <div className='grid p-fluid'>
                              {
                                showUrlConceptsInput.length > 0 && 
                                showUrlConceptsInput[index]?.is_referenced
                                  ? (
                                    <TeamLearnedConceptReferencesStepThreeApp 
                                      teamReferences={data.references}
                                      userId={userId}
                                      conceptId={data.learned_concept.id}
                                      toast={toast}
                                    />
                                    )
                                    : (
                                      <StudentReferenceAbpApp
                                        conceptId={data.learned_concept.id}
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
                                      onClick={() => handleConfirmBlockLearnedConcept(
                                        data.learned_concept.id
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
                )
          )
        }
    </div>
  )
});
