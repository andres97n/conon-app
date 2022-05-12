import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { 
  StudentAcCoordinatorAssignDetailViewApp 
} from './StudentAcCoordinatorAssignDetailViewApp';

import { getIconRole } from '../../../../../helpers/topic/table/topicTable';
import { 
  startLoadMemberPerformanceCoordinatorAcByMember, startSaveMemberPerformanceCoordinatorAc 
} from '../../../../../actions/student/ac_roles/coordinatorAc/memberPerformanceCoordinatorAc';


export const StudentAcCoordinatorAssignDetailApp = React.memo(({
  student,
  teamDetailAc,
  toast
}) => {

  const dispatch = useDispatch();
  const { 
    memberPerformancesCoordinator,
    loadingMemberPerformancesCoordinator 
  } = useSelector( state => state.dashboard.coordinatorAc );
  const [studentRate, setStudentRate] = useState(0);
  const isMounted = useRef(true);

  const handleLoadMemberPerformance = useCallback(
    ( teamDetailId, memberId ) => {
      dispatch( startLoadMemberPerformanceCoordinatorAcByMember( teamDetailId, memberId ));
    }, [dispatch],
  );

  const handleSubmitStudentCalification = () => {
    const newMemberPerformance = {
      team_detail_ac: teamDetailAc.id,
      member_ac: student.id,
      member_assessment: studentRate,
      active: true
    };
    dispatch( startSaveMemberPerformanceCoordinatorAc( newMemberPerformance, toast ) );
  }

  const handleConfirmSaveStudentCalification = () => {
    confirmDialog({
      message: '¿Está seguro que desea guardar la siguiente calificación?',
      header: 'Confirmación de guardado',
      icon: 'fas fa-exclamation-triangle icon-warn',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSubmitStudentCalification(),
    });
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (
      Object.keys(student).length > 0 && 
      Object.keys(teamDetailAc).length > 0 && 
      isMounted.current
    ) {
      handleLoadMemberPerformance( teamDetailAc.id, student.id );
    }
  }, [student, teamDetailAc, handleLoadMemberPerformance]);

  if (loadingMemberPerformancesCoordinator) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    )
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className={`${getIconRole(student.role_type)} icon-primary`} />
          {student.owner.name}
        </h5>
      </div>
      <div className='col-12'>
        <h4 className='text-center'>
          <i className="fas fa-handshake fa-lg mr-2 icon-primary" />
        </h4>
        <h3 className='text-center'>
          {
            memberPerformancesCoordinator.length === 0
              ? studentRate : memberPerformancesCoordinator[0].member_assessment
          } / 10
        </h3>
      </div>
      {
        memberPerformancesCoordinator.length === 0
          ? (
            <>
              <div className='col-12'>
                <div className='center-inside'>
                  <Rating 
                    stars={10} 
                    value={studentRate}
                    tooltip='Seleccione una estrella para asignar, caso contrario 
                    seleccione el ícono de cancelar para limpiar'
                    tooltipOptions={{position:'bottom'}}
                    onChange={(e) => e.value ? setStudentRate(e.value) : setStudentRate(0)}
                  />
                </div>
              </div>
              <div className='col-12'>
                <div className='center-inside'>
                  <div className='col-6'>
                    <Button 
                      label='Calificar Integrante'
                      icon='fas fa-user-check'
                      className='p-button-raised'
                      disabled={studentRate === 0}
                      onClick={handleConfirmSaveStudentCalification}
                    />
                  </div>
                </div>
              </div>
            </>
          )
          : (
            <StudentAcCoordinatorAssignDetailViewApp 
              memberPerformance={memberPerformancesCoordinator[0]}
              toast={toast}
            />
          )
      }
    </div>
  )
});
