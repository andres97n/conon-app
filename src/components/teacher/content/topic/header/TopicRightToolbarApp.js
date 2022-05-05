import React from 'react';

import { Button } from 'primereact/button';
import { getTopicObject } from '../../../../../helpers/topic/header';


export const TopicRightToolbarApp = React.memo(({
  topicKeys,
  classrooms,
  asignaturesDetail,
  handleSetTopicData,
  setShowTopicPanel
}) => {

  const startCreateMethodology = () => {
    handleSetTopicData(getTopicObject(
      classrooms,
      asignaturesDetail,
      topicKeys.selectedMethodology,
      topicKeys.selectedClassroom,
      topicKeys.selectedAsignature
    )); 
    setShowTopicPanel(true);
    // setMethodologyFields(setMethodologyFieldsForm( topicKeys ));
    // handleSetState(setMethodologyTabs(topicKeys));
  }

  return (
    <>
      <Button
        label="Empezar" 
        icon="fas fa-chalkboard-teacher"
        className="p-button-raised p-button-success" 
        onClick={startCreateMethodology} 
        disabled={!topicKeys.selectedMethodology}
      />
    </>
  )
});
