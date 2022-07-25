import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CoordinatorPerformanceStategyApp } from './CoordinatorPerformanceStategyApp';
import { 
  CoordinatorPerformanceMemberActionApp 
} from './CoordinatorPerformanceMemberActionApp';
import { CoordinatorPerformanceProblemResolutionApp } from './CoordinatorPerformanceProblemResolutionApp';

import { 
  startLoadCoordinatorStrategiesAcList, 
  startRemoveCoordinatorStrategyAcList 
} from '../../../../../actions/student/ac_roles/coordinatorAc/coordinatorStategyAc';
import { 
  startLoadMemberPerformanceCoodirnatorAcList, 
  startRemoveMemberPerformanceCoordinatorAcList 
} from '../../../../../actions/student/ac_roles/coordinatorAc/memberPerformanceCoordinatorAc';
import { 
  startLoadProblemResolutionGroupByTeamDetailAc, 
  startRemoveProblemResolutionGroupAcList 
} from '../../../../../actions/student/ac_roles/coordinatorAc/problemResolutionGroupAc';


export const TeacherTopicCoordinatorPerformanceApp = React.memo(({
  student
}) => {

  const dispatch = useDispatch();
  const { 
    coordinatorStrategies,
    memberPerformancesCoordinator,
    problemResolutionGroup,
    loadingCoordinatorStrategy,
    loadingMemberPerformancesCoordinator,
    loadingProblemResolutionGroup 
  } = useSelector( state => state.dashboard.coordinatorAc );
  const isMounted = useRef(true);

  const handleLoadCoordinatorActions = useCallback(
    ( teamDetailId ) => {
      dispatch( startLoadCoordinatorStrategiesAcList( teamDetailId ));
      dispatch( startLoadMemberPerformanceCoodirnatorAcList( teamDetailId ));
      dispatch( startLoadProblemResolutionGroupByTeamDetailAc( teamDetailId ));
    }, [dispatch],
  );

  const handleRemoveCoordinatorActions = useCallback(
    () => {
      dispatch( startRemoveCoordinatorStrategyAcList() );
      dispatch( startRemoveMemberPerformanceCoordinatorAcList() );
      dispatch( startRemoveProblemResolutionGroupAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (student && isMounted.current) {
      handleLoadCoordinatorActions( student?.id );
    }
  
    return () => {
      if (student) {
        handleRemoveCoordinatorActions();
      }
    }
  }, [
    student, 
    handleLoadCoordinatorActions, 
    handleRemoveCoordinatorActions
  ]);

  return (
    <>
      <div className='col-6'>
        <div className='card'>
          <CoordinatorPerformanceStategyApp
            coordinatorStrategies={coordinatorStrategies}
            loadingCoordinatorStrategy={loadingCoordinatorStrategy}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <CoordinatorPerformanceMemberActionApp 
            memberPerformancesCoordinator={memberPerformancesCoordinator}
            loadingMemberPerformancesCoordinator={loadingMemberPerformancesCoordinator}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <CoordinatorPerformanceProblemResolutionApp 
            problemResolutionGroup={problemResolutionGroup}
            loadingProblemResolutionGroup={loadingProblemResolutionGroup}
          />
        </div>
      </div>
    </>
  )
});
