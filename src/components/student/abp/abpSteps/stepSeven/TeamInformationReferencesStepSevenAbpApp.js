import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Messages } from 'primereact/messages';

import { UserReferencesStepSevenAbpApp } from './UserReferencesStepSevenAbpApp';
import { 
  TeamInformationReferencesSavedStepSevenAbpApp 
} from './TeamInformationReferencesSavedStepSevenAbpApp';

export const TeamInformationReferencesStepSevenAbpApp = React.memo(({
  currentReferences,
  userId,
  teamId,
  name,
  toast
}) => {

  const initialState = {
    showFirstMsg: false,
    showSecondMsg: false,
    showThreeMsg: false,
  };
  const [userReferencesCount, setUserReferencesCount] = useState(0);
  const [showUrlSavedMsg, setShowUrlSavedMsg] = useState(initialState);
  const infoMsg = useRef(null);

  const handleLoadStudentReferences = useCallback(
    ( sizeReferences ) => {
      setShowUrlSavedMsg(() => {
        if (sizeReferences === 1) {
          return { 
            showFirstMsg: true,
            showSecondMsg: false,
            showThreeMsg: false 
          }
        }
        if (sizeReferences === 2) {
          return { 
            showFirstMsg: true, 
            showSecondMsg: true,
            showThreeMsg: false 
          }
        }
        if (sizeReferences === 3) {
          return {
            showFirstMsg: true,
            showSecondMsg: true,
            showThreeMsg: true
          }
        }
        return {
          showFirstMsg: false,
          showSecondMsg: false,
          showThreeMsg: false
        };
      });
      setUserReferencesCount(sizeReferences);
    },
    [
      setShowUrlSavedMsg,
      setUserReferencesCount
    ],
  );

  useEffect(() => {
    if ( infoMsg.current?.state.messages?.length === 0 && userReferencesCount < 3) {
        infoMsg.current.show({
          severity: 'info',
          detail: 'De la misma manera que el paso anterior se puede ingresar referencias ' +
          'que respalden el trabajo en grupo y sobre todo la información que ingrese ' +
          'el moderador; se recomienda que sean enlaces distintos a los anteriores pasos.',
          sticky: true
        });
    }
  }, [ userReferencesCount ]);

  useEffect(() => {
    if (currentReferences && currentReferences.length > 0 && userId) {
      let sizeReferences = 0;
      currentReferences.forEach( reference => {
        if (reference.user.id === userId) {
          sizeReferences = sizeReferences + 1;
        }
      });
      handleLoadStudentReferences( sizeReferences );
    } else  if (currentReferences && currentReferences.length === 0 && userId) {
      handleLoadStudentReferences(0); 
    }
  }, [currentReferences, userId, handleLoadStudentReferences]);

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <h5 className='text-center'>
              <i className="fas fa-link mr-2" />
              {
                userReferencesCount === 3
                  ? ('Mis referencias fueron subidas')
                  : ('Estas son mis referencias...')
              }
            </h5>
          </div>
          <div className='col-12'>
            <Messages
              ref={infoMsg}
              className='align-justify'
            />
          </div>
          <UserReferencesStepSevenAbpApp 
            showUrlSavedMsg={showUrlSavedMsg}
            teamId={teamId}
            userId={userId}
            name={name}
            toast={toast}
          />
          <div className='col-12'>
            <div className='card'>
              <div className='col-12'>
                <h5 className='text-center'>
                  <i className="fas fa-users mr-2" />
                  Referencias del Equipo
                </h5>
              </div>
              {
                currentReferences.length > 0
                  ? (
                    <TeamInformationReferencesSavedStepSevenAbpApp
                      currentReferences={currentReferences}
                      userId={userId}
                      toast={toast}
                    />
                  )
                  : (
                    <div className='col-12'>
                      <small>
                        Aún no existen referencias que respalden la obtención de información.
                      </small>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});
