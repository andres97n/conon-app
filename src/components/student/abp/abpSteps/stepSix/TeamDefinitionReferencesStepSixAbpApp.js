import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Message } from 'primereact/message';
import { Messages } from 'primereact/messages';

import { StudentReferenceAbpApp } from '../StudentReferenceAbpApp';
import { 
  TeamDefinitionReferencesSavedStepSixAbpApp 
} from './TeamDefinitionReferencesSavedStepSixAbpApp';

import { 
  startSaveProblemDefinitionReferenceStepSixAbp 
} from '../../../../../actions/student/abp_steps/problemDefinitionStepSixAbp';

export const TeamDefinitionReferencesStepSixAbpApp = React.memo(({
  currentReferences,
  userId,
  teamId,
  name,
  toast
}) => {

  const dispatch = useDispatch();
  const [showFirstUrlSavedMsg, setShowFirstUrlSavedMsg] = useState(false);
  const [showSecondUrlSavedMsg, setShowSecondUrlSavedMsg] = useState(false);
  const infoMsg = useRef(null);

  const handleSubmitDefinitionReference = useCallback(
    ( data, indexReference ) => {
      const newReference = {
        team_abp: teamId,
        user: userId,
        problem_reference: data.reference,
        active: true
      };
      dispatch( startSaveProblemDefinitionReferenceStepSixAbp( newReference, name, toast ) );
    },
    [dispatch, teamId, userId, name, toast],
  );

  const handleLoadStudentReferences = useCallback(
    ( sizeReferences ) => {
      if (showFirstUrlSavedMsg) {
        if (sizeReferences < 1) {
          setShowFirstUrlSavedMsg(false);
        }
      } else {
        if (sizeReferences >= 1) {
          setShowFirstUrlSavedMsg(true);
        } 
      }
      if (showSecondUrlSavedMsg) {
        if ( sizeReferences <= 1 ) {
          setShowSecondUrlSavedMsg(false);
        }
      } else {
        if ( sizeReferences > 1 ) {
          setShowSecondUrlSavedMsg(true);
        }
      }
    },
    [
      setShowFirstUrlSavedMsg, 
      setShowSecondUrlSavedMsg, 
      showFirstUrlSavedMsg, 
      showSecondUrlSavedMsg
    ],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 ) {
        infoMsg.current.show({
          severity: 'info',
          detail: 'Puede ingresar referencias o enlaces externos que respalden la Definición ' +
          'del Problema, de tal que manera cuando el moderador ingrese la definición, ' +
          'el trabajo en grupo se vea sustentado.',
          sticky: true
        });
    }
  }, []);

  useEffect(() => {
    if (currentReferences && currentReferences.length > 0 && userId) {
      let sizeReferences = 0;
      currentReferences.forEach( reference => {
        if (reference.user.id === userId) {
          sizeReferences = sizeReferences + 1;
        }
      });
      handleLoadStudentReferences( sizeReferences );
    }
  }, [currentReferences, userId, handleLoadStudentReferences]);

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-link mr-2" />
              Estas son mis referencias...
            </h5>
          </div>
          <div className='col-12'>
            <Messages
              ref={infoMsg}
              className='align-justify'
            />
          </div>
          <div className='col-6'>
            {
              showFirstUrlSavedMsg
                ? (
                  <Message 
                    severity="success" 
                    text="Esta referencia ya existe." 
                  />
                )
                : (
                  <StudentReferenceAbpApp 
                    conceptId={1}
                    isDisabled={false}
                    handleSubmitReference={handleSubmitDefinitionReference}
                  />
                )
            }
          </div>
          <div className='col-6'>
            {
              showSecondUrlSavedMsg
                ? (
                  <Message 
                    severity="success" 
                    text="Esta referencia ya existe." 
                  />
                )
                : (
                  <StudentReferenceAbpApp 
                    conceptId={2}
                    isDisabled={!showFirstUrlSavedMsg}
                    handleSubmitReference={handleSubmitDefinitionReference}
                  />
                )
            }
          </div>
          <div className='col-12'>
            <TeamDefinitionReferencesSavedStepSixAbpApp 
              currentReferences={currentReferences}
              userId={userId}
              toast={toast}
            />
          </div>
        </div>
      </div>
    </div>
  )
});
