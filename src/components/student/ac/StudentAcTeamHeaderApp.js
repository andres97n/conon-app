import React, { useEffect, useRef } from 'react';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';

import { 
  getStudentLabelRole, 
  getStudentRoleIcon 
} from '../../../helpers/topic/student/ac/studentAcHeader';


export const StudentAcTeamHeaderApp = React.memo(({
  currentTeam,
  loadingTeamDetailAc
}) => {

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  if (loadingTeamDetailAc) {
    return (
      <EmptyContentScreen />
    );
  }

  if (currentTeam.length === 0) {
    return (
      <small>No existe información del equipo</small>
    );
  }

  return (
    <>
      {
        currentTeam[0].team_detail_ac && (
          <>
            <div className='col-12'>
              <h5 className='text-center'>
                <i className="fas fa-users mr-2 icon-black" />
                Los integrantes del grupo son ...
              </h5>
            </div>
            {
              currentTeam[0].team_detail_ac.map( student => (
                <div className='col-3' key={student.id}>
                  <div className='col-12'>
                    <div className='card'>
                      <i 
                        className={
                          `${getStudentRoleIcon(student.role_type)} 
                          mb-2 fa-lg text-center icon-primary`
                        } 
                      />
                      <b className='text-center'>
                        { getStudentLabelRole(student.role_type) }
                      </b>
                      <h6 className='text-center'>
                        {student.owner.name}
                      </h6>
                    </div>
                  </div>
                </div>
              ))
            }
          </>

        )
      }
    </>
  )
});
