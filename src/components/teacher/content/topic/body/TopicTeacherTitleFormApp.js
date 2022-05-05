import React from 'react';
import classNames from 'classnames';
import { confirmDialog } from 'primereact/confirmdialog'; 

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { loadTopicSchoolData } from '../../../../../helpers/topic/main';


export const TopicTeacherTitleFormApp = React.memo(({
  topicData,
  title,
  errors,
  isTitleSaved,
  setFieldValue,
  setIsTitleSaved,
  setSchoolData
}) => {

  const schoolPeriodName = localStorage.getItem('currentPeriodName');

  const handleSaveTopicTitle = () => {
    setIsTitleSaved(true);
    setSchoolData(loadTopicSchoolData( schoolPeriodName, topicData, title, false ));
  }

  const handleConfirmSaveTitle = () => {
    confirmDialog({
      message: 'Si es que guarda el Título ya no podrá cambiarlo, está seguro de hacerlo??',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSaveTopicTitle(),
    });
  }

  return (
    <>
      <div className={
        !isTitleSaved
          ? "field col-10"
          : "field col-12"
      }>
        <span className="p-float-label">
          <InputText
            id='title'
            name='title'
            value={title}
            disabled={isTitleSaved}
            className={classNames({ 'p-invalid': errors['title'] })}
            onChange={e => setFieldValue('title', e.target.value)}
          />
          <label 
            htmlFor='title'
            className={classNames({ 'p-error': errors['title'] })}
          > Título del Tema de Estudio*</label>
        </span>
        {
          !isTitleSaved && 
          (
            <small 
              id="title-help" 
              className="p-d-block"
            >
              Puede escribir hasta un máximo de 175 caracteres, ahora lleva <b>{title.length}</b>.
            </small>
          )
        }
      </div>
      {
        !isTitleSaved && (
          <div className="field col-2">
            <Button
              label='Guardar Título'
              icon="fas fa-archive"
              tooltip='Es necesario el Título como referencia para crear una ruta y así 
              subir previamente los archivos que requiera mostrar.'
              tooltipOptions={{position:'bottom'}}
              disabled={title.length < 5}
              className="p-button-raised p-button-info" 
              onClick={handleConfirmSaveTitle}
            />
          </div>
        )
      }
    </>
  )
});
