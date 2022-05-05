import React, { useCallback, useState } from 'react';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { TopicRightDialogBodyApp } from './TopicRightDialogBodyApp';
import { TopicRightSecondDialogBodyApp } from './TopicRightSecondDialogBodyApp';

import { headerDialog } from '../../../../../../helpers/topic/header';


export const TopicRightMainPanelApp = React.memo(({
  isTopicSaved,
  selectedMethodology,
  currentTopic,
  toast,
  handleSetShowBackMessage,
  handleSetBackMessage,
}) => {

  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isSecondDialogBlock, setIsSecondDialogBlock] = useState(false);

  const handleHideAssignDialog = useCallback(
    () => {
      setShowAssignDialog( false );
    }, [],
  );

  const handleHideCreateDialog = useCallback(
    () => {
      setShowCreateDialog(false);
    }, [],
  );

  const handleSetIsSecondDialogBlock = useCallback(
    ( value ) => {
      setIsSecondDialogBlock(value);
    }, [],
  );
  
  return (
    <>
      <Button
        label={
          selectedMethodology === 1
            ? 'Asignar'
            : 'Grupos'
        }
        icon='fas fa-users'
        tooltip={
          selectedMethodology === 1
          ? 'Asignar Estudiantes'
          : 'Crear Grupos de Estudio'
        }
        disabled={!isTopicSaved}
        tooltipOptions={{position:'bottom'}}
        className="p-button-raised p-button-info mr-2" 
        onClick={() => setShowAssignDialog(true)}
      />
      <Button
        label={
          selectedMethodology === 1
            ? 'Actividad'
            : 'Rúbrica'
        }
        icon='fas fa-plus'
        tooltip={
          selectedMethodology === 1
          ? 'Actividad para Estudiantes'
          : 'Crear Rúbrica de Calificación'
        }
        tooltipOptions={{position:'bottom'}}
        disabled={
          !isTopicSaved
            ? true
            : isSecondDialogBlock
        }
        className="p-button-raised p-button-success" 
        onClick={() => setShowCreateDialog(true)}
      />
      <Dialog
        modal 
        visible={showAssignDialog} 
        style={{ width: '700px' }} 
        header={headerDialog(selectedMethodology)}
        className="p-fluid" 
        onHide={() => setShowAssignDialog(false)}
      >
        <TopicRightDialogBodyApp 
          selectedMethodology={selectedMethodology}
          currentTopic={currentTopic}
          toast={toast}
          handleSetShowBackMessage={handleSetShowBackMessage}
          handleSetBackMessage={handleSetBackMessage}
          handleHideAssignDialog={handleHideAssignDialog}
        />
      </Dialog>
      <Dialog
        modal 
        visible={showCreateDialog} 
        style={{ width: '700px' }} 
        header={headerDialog(selectedMethodology, true)}
        className="p-fluid" 
        onHide={() => setShowCreateDialog(false)}
      >
        <TopicRightSecondDialogBodyApp 
          selectedMethodology={selectedMethodology}
          currentTopic={currentTopic}
          toast={toast}
          handleSetShowBackMessage={handleSetShowBackMessage}
          handleSetBackMessage={handleSetBackMessage}
          handleHideCreateDialog={handleHideCreateDialog}
          setIsSecondDialogBlock={handleSetIsSecondDialogBlock}
        />
      </Dialog> 
    </>
  )
});
