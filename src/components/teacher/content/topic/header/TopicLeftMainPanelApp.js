import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { 
  getDuaMethodologyAudios, 
  getDuaMethodologyImages 
} from '../../../../../helpers/topic/duaMethodology';
import { useImage } from '../../../../../hooks/useImage';
import { useAudio } from '../../../../../hooks/useAudio';
import { 
  getAbpMethodologyAudios, 
  getAbpMethodologyImages 
} from '../../../../../helpers/topic/abpMethodology';
import { 
  getAcMethodologyAudios, 
  getAcMethodologyImages 
} from '../../../../../helpers/topic/acMethodology';
import { starRemoveCurrentTopic } from '../../../../../actions/admin/topic';
import { startRemoveCurrentDua } from '../../../../../actions/teacher/dua';
import { startRemoveCurrentActivity } from '../../../../../actions/teacher/activity';
import { startRemoveCurrentAbp } from '../../../../../actions/teacher/abp';
import { startRemoveTeamAbpDetailList } from '../../../../../actions/teacher/teamAbp';
import { startRemoveRubricAbpDetailList } from '../../../../../actions/teacher/rubricAbp';
import { startRemoveCurrentAc } from '../../../../../actions/teacher/ac';
import { startRemoveTeamAcDetailList } from '../../../../../actions/teacher/teamAc';
import { startRemoveRubricDetailAcList } from '../../../../../actions/teacher/rubricAc';

// TODO: Limpiar los current reducers de topic, abp, dua, ac

export const TopicLeftMainPanelApp = React.memo(({
  topicKeys,
  showBackMessage,
  topicMessage,
  toast,
  setTopicData,
  setTopicKeys,
  setShowTopicPanel,
  setShowBackMessage,
  setBackMessage,
  setIsTopicSaved
}) => {

  const dispatch = useDispatch();
  const { deleteSingleImage } = useImage( {}, toast );
  const { deleteSingleAudio } = useAudio( {}, toast );

  const handleBackToInitToolbar = () => {
    let imagesToDelete = [];
    let audiosToDelete = [];
    console.log('limpia');
    setTopicData({});
    setTopicKeys({});
    setShowTopicPanel(false);
    setShowBackMessage(false);
    setBackMessage('');
    setIsTopicSaved(false);
    if (topicKeys?.selectedMethodology === 1) {
      imagesToDelete = getDuaMethodologyImages();
      audiosToDelete = getDuaMethodologyAudios();
      dispatch( startRemoveCurrentDua() );
      dispatch( startRemoveCurrentActivity() );
    } else if (topicKeys?.selectedMethodology === 2) {
      imagesToDelete = getAbpMethodologyImages();
      audiosToDelete = getAbpMethodologyAudios();
      dispatch( startRemoveCurrentAbp() );
      dispatch( startRemoveTeamAbpDetailList() );
      dispatch( startRemoveRubricAbpDetailList() );
    } else if (topicKeys?.selectedMethodology === 3) {
      imagesToDelete = getAcMethodologyImages();
      audiosToDelete = getAcMethodologyAudios();
      dispatch( startRemoveCurrentAc() );
      dispatch( startRemoveTeamAcDetailList() );
      dispatch( startRemoveRubricDetailAcList() );
    }
    if (imagesToDelete.length > 0) {
      imagesToDelete.forEach( path => {
        deleteSingleImage( path );
      });
    }
    if (audiosToDelete.length > 0) {
      audiosToDelete.forEach( path => {
        deleteSingleAudio( path );
      });
    }
    dispatch( starRemoveCurrentTopic() );
    // Toda la información de ser limpiada en este método
  }
  
  const handleCheckTopicState = () => {
    if (showBackMessage) {
      handleConfirmBackToInitToolbar( topicMessage );
    } else {
      handleConfirmBackToInitToolbar();
    }
  }

  const handleConfirmBackToInitToolbar = ( message ) => {
    confirmDialog({
      message: message || 'Si es que regresa se perderá toda la información ingresada, ' +
      'está seguro de hacerlo',
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, regresar',
      rejectLabel: 'No, quedarme',
      accept: () => handleBackToInitToolbar(),
    });
  }

  return (
    <>
      <Button
        label='Regresar'
        icon="fas fa-arrow-left"
        className="p-button-raised p-button-info p-button-text" 
        onClick={handleCheckTopicState}
      />
    </>
  )
});
