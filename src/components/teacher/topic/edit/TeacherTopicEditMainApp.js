import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';
import { TeacherTopicEditHeaderApp } from './TeacherTopicEditHeaderApp';
import { TeacherTopicEditBodyApp } from './TeacherTopicEditBodyApp';

import { 
  starRemoveCurrentTopic, 
  startLoadCurrentTopic, 
  startRemoveCurrentMethodology 
} from '../../../../actions/admin/topic';


export const TeacherTopicEditMainApp = React.memo(({
  topic,
  toast,
  setEditTopic,
}) => {

  const dispatch = useDispatch();
  const { currentMethodology, currentTopic } = useSelector(state => state.dashboard.topic);

  const handleConfirmBackToTable = () => {
    confirmDialog({
      message: 'Está seguro de regresar?',
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, regresar',
      rejectLabel: 'No regresar',
      accept: () => setEditTopic(false)
    });
  }

  const handleLoadCurrentTopic = useCallback(
    ( topicId ) => {
      dispatch( startLoadCurrentTopic(topicId) );
    }, [dispatch],
  );
  
  const handleRemoveCurrentMethodology = useCallback(
    () => {
      dispatch( startRemoveCurrentMethodology() );
    }, [dispatch],
  );

  const handleRemoveCurrentTopic = useCallback(
    () => {
      dispatch( starRemoveCurrentTopic() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      handleRemoveCurrentMethodology();
    }
  }, [handleRemoveCurrentMethodology]);

  useEffect(() => {
    if (topic && Object.keys(topic).length > 0) {
      handleLoadCurrentTopic( topic.id );
    }
    return () => {
      handleRemoveCurrentTopic();
    }
  }, [topic, handleLoadCurrentTopic, handleRemoveCurrentTopic]);

  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <div className='center-inside'>
            <Button
              label='Salir de Edición'
              icon="far fa-hand-point-left" 
              className="p-button-rounded p-button-text p-button-lg" 
              onClick={handleConfirmBackToTable}
            />
          </div>
        </div>
      </div>
      {
        (
          !currentMethodology || 
          Object.keys(currentTopic).length === 0
        )
        ? (
          <EmptyContentScreen />
        )
        : (
          <>
            <div className='col-12'>
              <div className='card'>
                <TeacherTopicEditHeaderApp 
                  topic={topic}
                  currentMethodology={currentMethodology}
                />
              </div>
            </div>
            <div className='col-12'>
              <div className='card'>
                <TeacherTopicEditBodyApp 
                  topic={currentTopic}
                  currentMethodology={currentMethodology}
                />
              </div>
            </div>
          </>
        )
      }
    </>
  )
});
