import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SpokesmanPerformanceActionApp } from './SpokesmanPerformanceActionApp';
import { SpokesmanPerformanceActivityApp } from './SpokesmanPerformanceActivityApp';
import { SpokesmanPerformanceDescriptionApp } from './SpokesmanPerformanceDescriptionApp';

import { 
  startLoadActivityDescriptionSpokesmanAcList, 
  startRemoveActivityDescriptionSpokesmanAcList 
} from '../../../../../actions/student/ac_roles/spokesmanAc/activitityDescriptionSpokesmanAc';
import { 
  startLoadPerformanceDescriptionSpokesmanAcList, 
  startRemovePerformanceDescriptionSpokesmanAcList 
} from '../../../../../actions/student/ac_roles/spokesmanAc/performanceDescriptionSpokesmanAc';
import { 
  startLoadSpokesmanQuestionAcList, 
  startRemoveSpokesmanQuestionAcList 
} from '../../../../../actions/student/ac_roles/spokesmanAc/spokesmanQuestionAc';


export const TeacherTopicSpokesmanPerformanceApp = React.memo(({
  student
}) => {
  
  const dispatch = useDispatch();
  const { 
    spokesmanQuestions,
    spokesmanActivitiesDescription,
    spokesmanPerformanceDescription,
    loadingSpokesmanQuestion,
    loadingSpokesmanActivityDescription,
    loadingSpokesmanPerformanceDescription
  } = useSelector( state => state.dashboard.spokesmanAc );
  const isMounted = useRef(true);

  const handleLoadSpokesmanActions = useCallback(
    ( teamDetailId ) => {
      dispatch( startLoadSpokesmanQuestionAcList( teamDetailId ));
      dispatch( startLoadActivityDescriptionSpokesmanAcList( teamDetailId ));
      dispatch( startLoadPerformanceDescriptionSpokesmanAcList( teamDetailId ));
    }, [dispatch],
  );

  const handleRemoveSpokesmanActions = useCallback(
    () => {
      dispatch( startRemoveSpokesmanQuestionAcList() );
      dispatch( startRemoveActivityDescriptionSpokesmanAcList() );
      dispatch( startRemovePerformanceDescriptionSpokesmanAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (student && isMounted.current) {
      handleLoadSpokesmanActions( student?.id );
    }
  
    return () => {
      if (student) {
        handleRemoveSpokesmanActions();
      }
    }
  }, [
    student, 
    handleLoadSpokesmanActions, 
    handleRemoveSpokesmanActions
  ]);

  return (
    <>
      <div className='col-6'>
        <div className='card'>
          <SpokesmanPerformanceActionApp
            spokesmanQuestions={spokesmanQuestions}
            loadingSpokesmanQuestion={loadingSpokesmanQuestion}
          />
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <SpokesmanPerformanceActivityApp 
            spokesmanActivitiesDescription={spokesmanActivitiesDescription}
            loadingSpokesmanActivityDescription={loadingSpokesmanActivityDescription}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <SpokesmanPerformanceDescriptionApp 
            spokesmanPerformanceDescription={spokesmanPerformanceDescription}
            loadingSpokesmanPerformanceDescription={loadingSpokesmanPerformanceDescription}
          />
        </div>
      </div>
    </>
  )
});
