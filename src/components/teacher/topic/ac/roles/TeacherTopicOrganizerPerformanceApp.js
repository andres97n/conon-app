import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrganizerPerformanceActionApp } from './OrganizerPerformanceActionApp';
import { OrganizerPerformanceActivityApp } from './OrganizerPerformanceActivityApp';
import { 
  OrganizerPerformanceUnderstandingApp 
} from './OrganizerPerformanceUnderstandingApp';

import { 
  startLoadAssignActivityOrganizerAcList, 
  startRemoveAssignActivityOrganizerAcList 
} from '../../../../../actions/student/ac_roles/organizerAc/assignActivityOrganizerAc';
import { 
  startLoadDescribeUnderstadingOrganizerAcList, 
  startRemoveDescribeUnderstadingOrganizerAcList 
} from '../../../../../actions/student/ac_roles/organizerAc/describeUnderstadingOrganizerAc';
import { 
  startLoadOrganizerActionsAcList,
   startRemoveOrganizerActionAcList 
} from '../../../../../actions/student/ac_roles/organizerAc/organizerActionAc';


export const TeacherTopicOrganizerPerformanceApp = React.memo(({
  student
}) => {
  
  const dispatch = useDispatch();
  const { 
    organizerActions,
    organizerAssignActivities,
    organizerDescribeUnderstandingList,
    loadingOrganizerAction,
    loadingOrganizerAssignActivity,
    loadingOrganizerDescribeUnderstanding 
  } = useSelector( state => state.dashboard.organizerAc );
  const isMounted = useRef(true);

  const handleLoadOrganizerActions = useCallback(
    ( teamDetailId ) => {
      dispatch( startLoadOrganizerActionsAcList( teamDetailId ));
      dispatch( startLoadAssignActivityOrganizerAcList( teamDetailId ));
      dispatch( startLoadDescribeUnderstadingOrganizerAcList( teamDetailId ));
    }, [dispatch],
  );

  const handleRemoveOrganizerActions = useCallback(
    () => {
      dispatch( startRemoveOrganizerActionAcList() );
      dispatch( startRemoveAssignActivityOrganizerAcList() );
      dispatch( startRemoveDescribeUnderstadingOrganizerAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (student && isMounted.current) {
      handleLoadOrganizerActions( student?.id );
    }
  
    return () => {
      if (student) {
        handleRemoveOrganizerActions();
      }
    }
  }, [
    student, 
    handleLoadOrganizerActions, 
    handleRemoveOrganizerActions
  ]);

  return (
    <>
      <div className='col-6'>
        <div className='card'>
          <OrganizerPerformanceActionApp
            organizerActions={organizerActions}
            loadingOrganizerAction={loadingOrganizerAction}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <OrganizerPerformanceActivityApp 
            organizerAssignActivities={organizerAssignActivities}
            loadingOrganizerAssignActivity={loadingOrganizerAssignActivity}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <OrganizerPerformanceUnderstandingApp 
            organizerDescribeUnderstandingList={organizerDescribeUnderstandingList}
            loadingOrganizerDescribeUnderstanding={loadingOrganizerDescribeUnderstanding}
          />
        </div>
      </div>
    </>
  )
});
