import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Toolbar } from 'primereact/toolbar';

import { TopicLeftToolbarApp } from './TopicLeftToolbarApp';
import { TopicRightToolbarApp } from './TopicRightToolbarApp';
import { TopicLeftMainPanelApp } from './TopicLeftMainPanelApp';
import { TopicRightMainPanelApp } from './rightMainPanel/TopicRightMainPanelApp';

import { startLoadClassroomsByTeacher } from '../../../../../actions/admin/classroom';
import { startRemoveCurrentDua } from '../../../../../actions/teacher/dua';
import { starRemoveCurrentTopic } from '../../../../../actions/admin/topic';


export const TopicHeaderToolbarApp = React.memo(({
  uid,
  showTopicPanel,
  isTopicSaved,
  toast,
  handleSetTopicData,
  setShowTopicPanel,
  setIsTopicSaved
}) => {

  const dispatch = useDispatch();
  const { classrooms } = useSelector(state => state.dashboard.classroom);
  const { asignatures_detail } = useSelector(state => state.dashboard.asignature);
  const { currentTopic } = useSelector(state => state.dashboard.topic);
  const [topicKeys, setTopicKeys] = useState({});
  const [showBackMessage, setShowBackMessage] = useState(false);
  const [backMessage, setBackMessage] = useState('');

  const handleSetTopicKeys = useCallback(
    ( value ) => {
      setTopicKeys( value );
    }, [],
  );

  const handleSetShowBackMessage = useCallback(
    ( value ) => {
      setShowBackMessage( value );
    }, [],
  );

  const handleSetBackMessage = useCallback(
    ( value ) => {
      setBackMessage( value );
    }, [],
  );

  const handleLoadClassrooms = useCallback( ( uid ) => {
    dispatch( startLoadClassroomsByTeacher( uid ) );
  }, [dispatch]);

  useEffect(() => {
    if (uid) {
      handleLoadClassrooms( uid );
    }
  }, [uid, handleLoadClassrooms]);

  const handleRemoveCurrentData = useCallback(
    () => {
      dispatch( starRemoveCurrentTopic() );
      dispatch( startRemoveCurrentDua() );
    }, [dispatch],
  );

  useEffect(() => {
    return () => {
      handleRemoveCurrentData();
    }
  }, [handleRemoveCurrentData]);

  return (
    <>
      <Toolbar
        {
          ...!showTopicPanel
          ? {
            left: (
              <TopicLeftToolbarApp
                uid={uid}
                classrooms={classrooms}
                asignatures_detail={asignatures_detail}
                setTopicKeys={handleSetTopicKeys}
              />
            ),
            right: (
              <TopicRightToolbarApp 
                topicKeys={topicKeys}
                classrooms={classrooms}
                asignaturesDetail={asignatures_detail}
                handleSetTopicData={handleSetTopicData}
                setShowTopicPanel={setShowTopicPanel}
              />
            )
          }
          : {
            left: (
              <TopicLeftMainPanelApp 
                topicKeys={topicKeys}
                showBackMessage={showBackMessage}
                topicMessage={backMessage}
                toast={toast}
                setTopicData={handleSetTopicData}
                setTopicKeys={handleSetTopicKeys}
                setShowTopicPanel={setShowTopicPanel}
                setShowBackMessage={setShowBackMessage}
                setBackMessage={setBackMessage}
                setIsTopicSaved={setIsTopicSaved}
              />
            ),
            right: (
              <TopicRightMainPanelApp
                isTopicSaved={isTopicSaved}
                selectedMethodology={topicKeys?.selectedMethodology}
                currentTopic={currentTopic}
                toast={toast}
                handleSetShowBackMessage={handleSetShowBackMessage}
                handleSetBackMessage={handleSetBackMessage}
              />
            )
          }
        }
      />
    </>
  )
});
