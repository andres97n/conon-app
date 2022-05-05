import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { 
  TeacherTopicEditHeaderDuaActivityDetail 
} from './TeacherTopicEditHeaderDuaActivityDetail';

import { 
  startLoadActivityWithQuestions, 
  startRemoveCurrentActivity 
} from '../../../../../actions/teacher/activity';


export const TeacherTopicEditHeaderDuaActivityApp = React.memo(({
  currentMethodology
}) => {

  const dispatch = useDispatch();
  const { 
    currentActivity, 
    loadingActivity 
  } = useSelector(state => state.dashboard.activity);
  const isMounted = useRef(true);

  const handleLoadDuaActivity = useCallback(
    ( duaId ) => {
      dispatch( startLoadActivityWithQuestions( duaId ) );
    }, [dispatch],
  );
  
  const handleRemoveDuaActivity = useCallback(
    () => {
      dispatch( startRemoveCurrentActivity() );
    }, [dispatch],
  );

  useEffect(() => {
    if (Object.keys(currentMethodology).length > 0 && isMounted.current) {
      handleLoadDuaActivity( currentMethodology.id );
    }
  
    return () => {
      if (Object.keys(currentMethodology).length > 0) {
        handleRemoveDuaActivity( currentMethodology.id );
      }
    }
  }, [currentMethodology, handleLoadDuaActivity, handleRemoveDuaActivity]);

  if (loadingActivity || currentActivity.length === 0) {
    return (
      <EmptyContentScreen />
    )
  }

  if (!currentActivity[0].activity || !currentActivity[0].questions) {
    return (
      <div className='col-12'>
        <small>No se encontró la información solicitada.</small>
      </div>
    )
  }

  if (Object.keys(currentActivity[0].activity).length === 0) {
    return (
      <div className='col-12'>
        <small>Aún no existe actividad para este tópico.</small>
      </div>
    )
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-6'>
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-12'>
              <h5 className='text-center'>Descripción</h5>
              <p className='align-justify'>{ currentActivity[0].activity.description }</p>
            </div>
            <div className='col-12'>
              <h5 className='text-center'>Objetivo</h5>
              <p className='align-justify'>{ currentActivity[0].activity.objective }</p>
            </div>
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-12'>
              <h5 className='text-center'>Preguntas Ingresadas</h5>
            </div>
            <TeacherTopicEditHeaderDuaActivityDetail 
              questions={currentActivity[0].questions}
            />
          </div>
        </div>
      </div>
    </div>
  )
});
