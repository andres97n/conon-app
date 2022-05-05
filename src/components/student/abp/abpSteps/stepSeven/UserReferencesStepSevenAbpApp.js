import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Message } from 'primereact/message';

import { StudentReferenceAbpApp } from '../StudentReferenceAbpApp';

import { 
  startSaveInformationReferenceStepSevenAbp 
} from '../../../../../actions/student/abp_steps/getInformationStepSevenAbp';

export const UserReferencesStepSevenAbpApp = React.memo(({
  showUrlSavedMsg,
  teamId,
  userId,
  name,
  toast
}) => {

  const dispatch = useDispatch();
  const { showFirstMsg, showSecondMsg, showThreeMsg } = showUrlSavedMsg;

  const handleSubmitInformationReference = useCallback(
    ( data ) => {
      const newReference = {
        team_abp: teamId,
        user: userId,
        information_reference: data.reference,
        active: true
      };
      dispatch( startSaveInformationReferenceStepSevenAbp( newReference, name, toast ) );
    },
    [dispatch, teamId, userId, name, toast],
  );

  return (
    <>
      <div className='col-6'>
      {
        showFirstMsg
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
              handleSubmitReference={handleSubmitInformationReference}
            />
          )
      }
      </div>
      <div className='col-6'>
        {
          showSecondMsg
            ? (
              <Message
                severity="success" 
                text="Esta referencia ya existe." 
              />
            )
            : (
              <StudentReferenceAbpApp 
                conceptId={1}
                isDisabled={!showFirstMsg}
                handleSubmitReference={handleSubmitInformationReference}
              />
            )
        }
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-6'>
            {
              showThreeMsg
                ? (
                  <Message
                    severity="success" 
                    text="Esta referencia ya existe." 
                  />
                )
                : (
                  <StudentReferenceAbpApp 
                    conceptId={1}
                    isDisabled={!showSecondMsg}
                    handleSubmitReference={handleSubmitInformationReference}
                  />
                )
            }
          </div>
        </div>
      </div>
    </>
  )
});
