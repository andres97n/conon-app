import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Toast } from 'primereact/toast';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';
import { TeacherTopicTableApp } from './TeacherTopicTableApp';
import { TeacherTopicViewApp } from './TeacherTopicViewApp';
import { TeacherTopicEditMainApp } from './edit/TeacherTopicEditMainApp';

import { 
  startLoadTopicsByOwner, 
  startRemoveTopics, 
  startRemoveTopicStudents
} from '../../../actions/admin/topic';


export const TeacherTopicScreen = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState({});
  const [viewTopic, setViewTopic] = useState(false);
  const [editTopic, setEditTopic] = useState(false);
  const toast = useRef(null);
  const schoolPeriodId = localStorage.getItem('currentPeriodId');

  const handleLoadTopics = useCallback( () => {
    dispatch( startLoadTopicsByOwner() );
  }, [dispatch] );

  const handleRemoveTopics = useCallback(
    () => {
      dispatch( startRemoveTopics() );
      dispatch( startRemoveTopicStudents() );
    }, [dispatch],
  );

  const handleSetViewTopic = useCallback(
    ( value ) => {
      setViewTopic(value);
    }, [],
  );

  const handleHideViewTopic = useCallback(
    () => {
      setViewTopic(false);
      dispatch( startRemoveTopicStudents() );
    }, [dispatch],
  );

  const handleSetEditTopic = useCallback(
    ( value ) => {
      setEditTopic( value );
    }, [],
  );

  const handleSetTopic = useCallback(
    ( topic ) => {
      setTopic( topic );
    }, [],
  );

  useEffect(() => {
    handleLoadTopics(); 
    return () => {
      handleRemoveTopics();
    }
  }, [handleLoadTopics, handleRemoveTopics]);

  if (!schoolPeriodId) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  return (
    <div className='p-grid crud-demo'>
      <div className='p-col-12'>
        <div className='card'>
          <div className='grid p-fluid'>
            <div className='col-12'>
              <Toast ref={toast} />
            </div>
            {
              !viewTopic && !editTopic
                ? (
                  <TeacherTopicTableApp 
                    toast={toast}
                    setTopic={handleSetTopic}
                    setViewTopic={handleSetViewTopic}
                    setEditTopic={handleSetEditTopic}
                  />
                )
                : viewTopic
                  ? (
                    <TeacherTopicViewApp 
                      topic={topic}
                      toast={toast}
                      handleHideViewTopic={handleHideViewTopic}
                    />
                  )
                  : (
                    <TeacherTopicEditMainApp 
                      topic={topic}
                      toast={toast}
                      setEditTopic={handleSetEditTopic}
                    />
                  )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
