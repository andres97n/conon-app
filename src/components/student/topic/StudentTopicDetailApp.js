import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';

import { startRemoveCurrentMethodology } from '../../../actions/admin/topic';


export const StudentTopicDetailApp = React.memo(({
  topic
}) => {

  const dispatch = useDispatch();
  const { 
    currentTopic, 
    loadingMethodology 
  } = useSelector( state => state.dashboard.topic );

  const handleRemoveDetail = useCallback(
    () => {
      dispatch( startRemoveCurrentMethodology() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      handleRemoveDetail();
    }
  }, [handleRemoveDetail]);

  if (loadingMethodology) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
          <div className='card'>
            <h3 className='text-center'>Calificación Final</h3>
            {
              topic.type === 1
                ? (
                  currentTopic.qualification
                    ? (
                      <h2 className='text-center'>
                        <i className="fas fa-marker mr-3 icon-primary" />
                        {currentTopic.qualification}
                      </h2>
                    )
                    : (
                      <p className='text-center'>No existe Calificación.</p>
                    )
                )
                : topic.type === 2
                  ? (
                    currentTopic.final_grade
                      ? (
                        <h2 className='text-center'>
                          <i className="fas fa-marker mr-3 icon-primary" />
                          {currentTopic.final_grade}
                        </h2>
                      )
                      : (
                        <p className='text-center'>No existe Calificación.</p>
                      )
                  )
                  : topic.type === 3 && (
                    currentTopic.final_value
                      ? (
                        <h2 className='text-center'>
                          <i className="fas fa-marker mr-3 icon-primary" />
                          {currentTopic.final_value}
                        </h2>
                      )
                      : (
                        <p className='text-center'>No existe Calificación.</p>
                      )                    
                  )
            }
          </div>
      </div>
    </div>
  )
});
