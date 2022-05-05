import React from 'react';

import { TopicCreateRubricApp } from './createDialog/rubric/TopicCreateRubricApp';
import { TopicCreateDuaActivityApp } from './createDialog/TopicCreateDuaActivityApp';


export const TopicRightSecondDialogBodyApp = React.memo(({
  selectedMethodology,
  currentTopic,
  toast,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleHideCreateDialog,
  setIsSecondDialogBlock
}) => {
  return (
    <>
      {
        Object.keys(currentTopic).length === 0
          ? (
            <small className='text-center'>No se encontró ningún Tópico.</small>
          )
          : (
            selectedMethodology === 1
                ? (
                  <TopicCreateDuaActivityApp 
                    toast={toast}
                    handleSetShowBackMessage={handleSetShowBackMessage}
                    handleSetBackMessage={handleSetBackMessage}
                    handleHideCreateDialog={handleHideCreateDialog}
                    setIsSecondDialogBlock={setIsSecondDialogBlock}
                  />
                )
                : (selectedMethodology === 2 || selectedMethodology === 3) && (
                  <TopicCreateRubricApp
                    selectedMethodology={selectedMethodology}
                    toast={toast}
                    handleSetShowBackMessage={handleSetShowBackMessage}
                    handleSetBackMessage={handleSetBackMessage}
                    handleHideCreateDialog={handleHideCreateDialog}
                    setIsSecondDialogBlock={setIsSecondDialogBlock}
                  />
                )
          )
      }
    </>
  )
});
