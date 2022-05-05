import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toast } from 'primereact/toast';

import { TopicHeaderToolbarApp } from './header/TopicHeaderToolbarApp';
import { TopicTeacherBodyApp } from './body/TopicTeacherBodyApp';

import { startRemoveClassrooms } from '../../../../actions/admin/classroom';


export const NewTeacherTopicScreen = () => {

  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.auth);
  const [topicData, setTopicData] = useState({});
  const [showTopicPanel, setShowTopicPanel] = useState(false);
  const [isTopicSaved, setIsTopicSaved] = useState(false);
  const toast = useRef(null);

  const handleSetIsTopicSaved = useCallback(
    ( value ) => {
      setIsTopicSaved( value );
    }, [],
  );

  const handleSetTopicData = useCallback(
    ( value ) => {
      setTopicData( value );
    }, [],
  );

  const handleSetShowTopicPanel = useCallback(
    ( value ) => {
      setShowTopicPanel( value );
    }, [],
  );
  
  const handleRemoveClassrooms = useCallback(
    () => {
      dispatch( startRemoveClassrooms() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      handleRemoveClassrooms()
    }
  }, [handleRemoveClassrooms]);

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='card'>
          <TopicHeaderToolbarApp
            uid={uid}
            showTopicPanel={showTopicPanel}
            isTopicSaved={isTopicSaved}
            toast={toast}
            handleSetTopicData={handleSetTopicData}
            setShowTopicPanel={handleSetShowTopicPanel}
            setIsTopicSaved={handleSetIsTopicSaved}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='card'>
          <TopicTeacherBodyApp
            userId={uid}
            topicData={topicData}
            showTopicPanel={showTopicPanel}
            toast={toast}
            isTopicSaved={isTopicSaved}
            setIsTopicSaved={handleSetIsTopicSaved}
          />
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  )
}
