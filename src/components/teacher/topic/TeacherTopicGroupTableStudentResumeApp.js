import React from 'react';

export const TeacherTopicGroupTableStudentResumeApp = React.memo(({
  details,
  type
}) => {
  return (
    <>
      {
        details && details.length > 0
          ? (
            details.map( student => (
              <p key={student.id}>{
                type === 2
                  ? student.user.name
                  : student.owner.name
              }</p>
            ))
          )
          : (
            <p></p>
          )
      }
    </>
  )
})
