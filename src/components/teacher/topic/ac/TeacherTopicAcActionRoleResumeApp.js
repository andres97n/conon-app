import React from 'react';

import { 
  TeacherTopicCoordinatorPerformanceApp 
} from './roles/TeacherTopicCoordinatorPerformanceApp';
import { 
  TeacherTopicOrganizerPerformanceApp 
} from './roles/TeacherTopicOrganizerPerformanceApp';
import { 
  TeacherTopicSecretaryPerformanceApp 
} from './roles/TeacherTopicSecretaryPerformanceApp';
import { 
  TeacherTopicSpokesmanPerformanceApp 
} from './roles/TeacherTopicSpokesmanPerformanceApp';


export const TeacherTopicAcActionRoleResumeApp = React.memo(({
  student
}) => {
  return (
    <>
      {
        student?.role_type === 1
          ? (
            <TeacherTopicCoordinatorPerformanceApp 
              student={student}
            />
          )
          : student?.role_type === 2
            ? (
              <TeacherTopicSpokesmanPerformanceApp 
                student={student}
              />
            )
            : student?.role_type === 3
              ? (
                <TeacherTopicOrganizerPerformanceApp 
                  student={student}
                />
              )
              : student?.role_type === 4 && (
                <TeacherTopicSecretaryPerformanceApp 
                  student={student}
                />
              )
      }
    </>
  )
});
