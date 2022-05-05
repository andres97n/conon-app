import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { 
  TeacherTopicEditHeaderRubricAcDetailApp 
} from './TeacherTopicEditHeaderRubricAcDetailApp';

import { 
  startLoadCurrentRubricAc, 
  startRemoveRubricDetailAcList 
} from '../../../../../actions/teacher/rubricAc';


export const TeacherTopicEditHeaderRubricAcApp = React.memo(({
  currentMethodology
}) => {
  
  const dispatch = useDispatch();
  const { 
    currentRubric, 
    loadingRubricDetailAc 
  } = useSelector(state => state.dashboard.rubricAc);
  const isMounted = useRef(true);

  const handleLoadMethodologyRubric = useCallback(
    ( methodologyId ) => {
      dispatch( startLoadCurrentRubricAc( methodologyId ) );
    }, [dispatch],
  );
  
  const handleRemoveMethodologyRubric = useCallback(
    () => {
      dispatch( startRemoveRubricDetailAcList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( Object.keys(currentMethodology).length > 0 && isMounted.current ) {
      handleLoadMethodologyRubric( currentMethodology.id );
    }
  
    return () => {
      if (Object.keys(currentMethodology).length > 0) {
        handleRemoveMethodologyRubric( currentMethodology.id );
      }
    }
  }, [currentMethodology, handleLoadMethodologyRubric, handleRemoveMethodologyRubric]);
  
  if (loadingRubricDetailAc || currentRubric.length === 0) {
    return (
      <EmptyContentScreen />
    )
  }

  if (!currentRubric[0].rubric_ac || !currentRubric[0].rubric_detail_ac) {
    return (
      <div className='col-12'>
        <small>No se encontró la información solicitada.</small>
      </div>
    )
  }

  if (Object.keys(currentRubric[0].rubric_ac).length === 0) {
    return (
      <div className='col-12'>
        <small>Aún no existe rúbrica para este tópico.</small>
      </div>
    )
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-6'>
        <div className='card'>
          <div className='col-12'>
            <h5 className='text-center'>Descripción</h5>
          </div>
          <div className='col-12'>
            {
              currentRubric[0].rubric_ac.description_rubric
                ? (
                  <p className='align-justify'>{
                    currentRubric[0].rubric_ac.description_rubric
                  }</p>
                )
                : (
                  <small>No existe descripción acerca de esta rúbrica.</small>
                )
            }
          </div>
          <div className='col-12'>
            <h5 className='text-center'>Observaciones</h5>
          </div>
          <div className='col-12'>
            {
              currentRubric[0].rubric_ac.observations
                ? (
                  <p className='align-justify'>{
                    currentRubric[0].rubric_ac.observations
                  }</p>
                )
                : (
                  <small>No existe observaciones acerca de esta rúbrica.</small>
                )
            }
          </div>
          <div className='col-12'>
            <h5 className='text-center'>Calificación Total</h5>
          </div>
          <div className='col-12'>
            {
              currentRubric[0].rubric_ac.ac_final_value && 
                (
                  <h3 className='text-center'>{
                    currentRubric[0].rubric_ac.ac_final_value
                  }</h3>
                )
            }
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <TeacherTopicEditHeaderRubricAcDetailApp 
            sections={currentRubric[0].rubric_detail_ac}
          />
        </div>
      </div>
    </div>
  )
});
