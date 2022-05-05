import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { TeacherTopicDuaViewApp } from './dua/TeacherTopicDuaViewApp';
import { TeacherTopicAbpViewApp } from './abp/TeacherTopicAbpViewApp';
import { TeacherTopicAcViewApp } from './ac/TeacherTopicAcViewApp';

import { startRemoveCurrentMethodology } from '../../../actions/admin/topic';


export const TeacherTopicViewApp = React.memo(({
  topic,
  toast,
  handleHideViewTopic
}) => {

  const dispatch = useDispatch();
  const { currentMethodology } = useSelector(state => state.dashboard.topic);

  const handleConfirmBackToTable = () => {
    confirmDialog({
      message: 'Está seguro de regresar?',
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, regresar',
      rejectLabel: 'No regresar',
      accept: () => handleHideViewTopic()
    });
  }

  const handleRemoveCurrentMethodology = useCallback(
    () => {
      dispatch( startRemoveCurrentMethodology() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      handleRemoveCurrentMethodology();
    }
  }, [handleRemoveCurrentMethodology]);

  return (
    <>
      <div className='col-12'>
        <div className='card'>
          <Button
            icon="fas fa-chevron-circle-left" 
            tooltip='Salir de Visualización'
            tooltipOptions={{position:'bottom'}}
            className="p-button-rounded p-button-text p-button-lg" 
            onClick={handleConfirmBackToTable}
          />
          <h3 className='text-center'>
            <i className="fas fa-brain mr-2 icon-primary" />
            {topic.title}
          </h3>
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          {
            topic.type === 1
              ? (
                <TeacherTopicDuaViewApp 
                  topic={topic}
                  currentMethodology={currentMethodology}
                />
              )
              : topic.type === 2
                ? (
                  <TeacherTopicAbpViewApp 
                    topic={topic}
                    toast={toast}
                    currentMethodology={currentMethodology}
                  />
                )
                : topic.type === 3 && (
                  <TeacherTopicAcViewApp 
                    topic={topic}
                    toast={toast}
                    currentMethodology={currentMethodology}
                  />
                )
          }
        </div>
      </div>
    </>
  )
});
