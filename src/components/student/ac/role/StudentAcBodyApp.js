import React from 'react';

import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';
import { 
  StudentAcCoordinatorRoleBodyApp 
} from './coordinator/StudentAcCoordinatorRoleBodyApp';
import { StudentAcOrganizerRoleBodyApp } from './organizer/StudentAcOrganizerRoleBodyApp';
import { StudentAcSecretaryRoleBodyApp } from './secretary/StudentAcSecretaryRoleBodyApp';
import { StudentAcSpokesmanRoleBodyApp } from './spokesman/StudentAcSpokesmanRoleBodyApp';


export const StudentAcBodyApp = React.memo(({
  userAc,
  userId,
  currentMethodology,
  selectedTopic,
  toast
}) => {
  return (
    <>
      {
        userAc.role_type === 1
          ? (
            <StudentAcCoordinatorRoleBodyApp
              userId={userId}
              teamDetailAc={userAc}
              currentMethodology={currentMethodology} 
              selectedTopic={selectedTopic}
              toast={toast}
            />
          )
          : userAc.role_type === 2
            ? (
              <StudentAcSpokesmanRoleBodyApp 
                userId={userId}
                currentMethodology={currentMethodology}
                selectedTopic={selectedTopic}
                teamDetailAc={userAc}
                toast={toast}
              />
            )
            : userAc.role_type === 3
              ? (
                <StudentAcOrganizerRoleBodyApp 
                  userId={userId}
                  currentMethodology={currentMethodology}
                  teamDetailAc={userAc}
                  toast={toast}
                />
              )
              : userAc.role_type === 4
                ? (
                  <StudentAcSecretaryRoleBodyApp 
                    userId={userId}
                    currentMethodology={currentMethodology} 
                    teamDetailAc={userAc}
                    toast={toast}
                  />
                )
                : (
                  <EmptyContentScreen />
                )
      }
    </>
  )
});
