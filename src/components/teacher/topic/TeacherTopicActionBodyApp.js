import React from 'react';
import { useDispatch } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { useImage } from '../../../hooks/useImage';
import { startBlockTopic, startDeleteTopic } from '../../../actions/admin/topic';
import { startLoadDuaByTopic } from '../../../actions/teacher/dua';
import { startLoadCurrentAc } from '../../../actions/teacher/ac';
import { startLoadCurrentAbp } from '../../../actions/teacher/abp';
import { loadSchoolData } from '../../../helpers/topic';
import { getTopicPath } from '../../../helpers/topic/table/topicTable';


export const TeacherTopicActionBodyApp = React.memo(({
  topic,
  toast,
  setTopic,
  setViewTopic,
  setEditTopic
}) => {

  const dispatch = useDispatch();
  const schoolPeriodName = localStorage.getItem('currentPeriodName');
  const schoolData = loadSchoolData( schoolPeriodName, topic, true );
  const { deleteFolderFiles } = useImage(schoolData, toast);

  const handleTopicDelete = async ( topic ) => {
    const pathTeacher = getTopicPath( schoolData, true);
    const pathStudent = getTopicPath( schoolData, false);
    deleteFolderFiles( pathTeacher );
    deleteFolderFiles( pathStudent );
    dispatch( startDeleteTopic( topic.id, toast));
  }

  const handleTopicBlock = ( topic ) => {
    dispatch( startBlockTopic( topic, topic.id, toast ));
  }

  const handleShowViewTopic = ( topic ) => {
    setTopic(topic);
    setViewTopic(true);
    if (topic.type === 1) {
      dispatch( startLoadDuaByTopic(topic.id) );
    } else if (topic.type === 2) {
      dispatch( startLoadCurrentAbp(topic.id) );
    } else if (topic.type === 3){
      dispatch( startLoadCurrentAc(topic.id) );
    }
  }

  const handleShowEditTopic = ( topic ) => {
    setTopic(topic);
    setEditTopic(true);
    if (topic.type === 1) {
      dispatch( startLoadDuaByTopic(topic.id) );
    } else if (topic.type === 2) {
      dispatch( startLoadCurrentAbp(topic.id) );
    } else if (topic.type === 3){
      dispatch( startLoadCurrentAc(topic.id) );
    }
  }

  const handleConfirmDeleteTopic = ( topic ) => {
    confirmDialog({
      message: (
        <p>¿Está seguro que desea eliminar el siguiente Tópico: <b>{topic.title}</b>?</p>
      ),
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      acceptClassName: 'p-button-raised p-button-danger',
      accept: () => handleTopicDelete( topic )
    });
  }

  const handleConfirmBlockTopic = ( topic ) => {
    confirmDialog({
      message: (
        <p>¿Está seguro que desea bloquear el siguiente Tópico: <b>{topic.title}</b>?</p>
      ),
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, bloquear',
      rejectLabel: 'No bloquear',
      acceptClassName: 'p-button-raised p-button-secondary',
      accept: () => handleTopicBlock( topic )
    });
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='center-inside'>
          {
            topic.active && (
              <>
                <Button
                  icon="fas fa-tasks" 
                  tooltip='Visualizar Desarollo del Tópico'
                  tooltipOptions={{position:'bottom'}}
                  className="p-button-rounded p-button-success mr-2" 
                  onClick={() => handleShowViewTopic(topic)}
                />
                <Button 
                  icon="fas fa-eye" 
                  tooltip='Visualizar Tópico's
                  tooltipOptions={{position:'bottom'}}
                  className="p-button-rounded p-button-warning mr-2" 
                  onClick={() => handleShowEditTopic(topic)} 
                />
                <Button 
                  icon="fas fa-ban" 
                  tooltip='Bloquear Tema'
                  tooltipOptions={{position:'bottom'}}
                  className="p-button-rounded p-button-secondary mr-2" 
                  onClick={() => handleConfirmBlockTopic(topic)} 
                />
              </>
            )
          }
          <Button 
            icon="fas fa-trash-alt" 
            className="p-button-rounded p-button-danger" 
            tooltip='Eliminar Tema'
            tooltipOptions={{position:'bottom'}}
            onClick={() => handleConfirmDeleteTopic(topic)} 
          />
        </div>
      </div>
      {/* <TeacherTopicUpdateDialogApp 
        topic={topic}
        showUpdate={showUpdate}
        hideUpdateTopicDialog={handleHideShowUpdate}
      /> */}
    </div>
  )
});
