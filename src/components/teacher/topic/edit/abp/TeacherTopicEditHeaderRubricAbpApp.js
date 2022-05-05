import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';
import { TeacherTopicEditHeaderRubricAbpDetailApp } from './TeacherTopicEditHeaderRubricAbpDetailApp';

import { 
  startLoadCurrentRubricAbpByAbp, 
  startRemoveRubricAbpDetailList 
} from '../../../../../actions/teacher/rubricAbp';


export const TeacherTopicEditHeaderRubricAbpApp = React.memo(({
  currentMethodology
}) => {
  
  const dispatch = useDispatch();
  const { 
    currentRubric, 
    loadingRubricAbp 
  } = useSelector(state => state.dashboard.rubricAbp);
  const isMounted = useRef(true);
  
  const handleLoadMethodologyRubric = useCallback(
    ( methodologyId ) => {
      dispatch( startLoadCurrentRubricAbpByAbp( methodologyId ));
    }, [dispatch],
  );

  const handleRemoveMethodologyRubric = useCallback(
    () => {
      dispatch( startRemoveRubricAbpDetailList() );
    }, [dispatch],
  );

  useEffect(() => {
    if ( Object.keys(currentMethodology).length > 0 && isMounted.current ) {
      handleLoadMethodologyRubric( currentMethodology.id );
    }
  
    return () => {
      if (Object.keys(currentMethodology).length > 0 ) {
        handleRemoveMethodologyRubric( currentMethodology.id );
      }
    }
  }, [currentMethodology, handleLoadMethodologyRubric, handleRemoveMethodologyRubric]);

  if (loadingRubricAbp || currentRubric.length === 0) {
    return (
      <EmptyContentScreen />
    )
  }

  if (!currentRubric[0].rubric_abp || !currentRubric[0].rubric_detail_abp) {
    return (
      <div className='col-12'>
        <small>No se encontró la información solicitada.</small>
      </div>
    )
  }

  if (Object.keys(currentRubric[0].rubric_abp).length === 0) {
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
              currentRubric[0].rubric_abp.description_rubric
                ? (
                  <p className='align-justify'>{
                    currentRubric[0].rubric_abp.description_rubric
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
              currentRubric[0].rubric_abp.observations
                ? (
                  <p className='align-justify'>{
                    currentRubric[0].rubric_abp.observations
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
              currentRubric[0].rubric_abp.abp_final_value && 
                (
                  <h3 className='text-center'>{
                    currentRubric[0].rubric_abp.abp_final_value
                  }</h3>
                )
            }
          </div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <TeacherTopicEditHeaderRubricAbpDetailApp 
            sections={currentRubric[0].rubric_detail_abp}
          />
        </div>
      </div>
    </div>
  )
});
