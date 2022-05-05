import React from 'react';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';

import { useAudio } from '../../../../../hooks/useAudio';
import { getToastMsg } from '../../../../../helpers/abp';
import { getClearLocalStorageAudio } from '../../../../../helpers/topic/header';


export const TopicUploadViewAudioApp = React.memo(({
  schoolData,
  value,
  field,
  toast,
  setFieldValue,
  setAudioCount
}) => {

  const { deleteSingleAudio } = useAudio( schoolData, toast );

  const handleRemoveSelectedAudio = ( audio ) => {
    let count = 0;
    value.forEach( async file => {
      if (file.name === audio.name) {
        const wasDeleted = await deleteSingleAudio( file.path );
        if (wasDeleted) {
          getToastMsg(toast, 'success', 'Audio eliminado correctamente.');
          getClearLocalStorageAudio( field );
          setAudioCount( false );
          value.forEach( file => {
            if (file.name !== audio.name) {
              count++;
              localStorage.setItem( `${field}${count}`, file.path );
            }
          });
        } else {
          getToastMsg(toast, 'error', 'No se pudo eliminar el audio seleccionado.');
        }
      }
    });
    const newValues = value.filter(
      file => file.name !== audio.name
    );
    setFieldValue( field, [ ...newValues ] );
  }

  const handleConfirmDeleteAudio = ( name ) => {
    confirmDialog({
      message: 'Está seguro que desea eliminar esta nota de voz??',
      header: 'Panel de Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'No eliminar',
      accept: () => handleRemoveSelectedAudio( name ),
    });
  }

  return (
    <>
      {
        value.length === 0
          ? (
            <div className='col-12'>
              <small>No existen audios guardados.</small>
            </div>
          )
          : (
            value.map( (audio, index) => (
              <div className='col-12' key={index}>
                <div className='card'>
                  <div className='grid p-fluid'>
                    <div className='col-12'>
                        <h6>{audio.name}</h6>
                    </div>
                    <div className='col-6'>
                      <audio controls src={audio.path} />
                    </div>
                    <div className='col-6'>
                      <div className='center-inside'>
                        <div className='col-1'>
                          <Button
                            icon='fas fa-trash-alt'
                            className='p-button-rounded p-button-danger'
                            tooltip='Eliminar nota de voz'
                            tooltipOptions={{ position: 'bottom' }}
                            onClick={() => handleConfirmDeleteAudio(audio)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
      }
    </>
  )
});
