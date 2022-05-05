import React, { useCallback, useEffect } from 'react';

import { Button } from 'primereact/button';

import { formatSeconds } from '../../../../../helpers/topic';


export const TopicUploadRecorderControlsApp = React.memo(({
  recorderState,
  handlers,
  field,
  value,
  setFieldValue,
  setShowTabPanel
}) => {
  
  const { recordingMinutes, recordingSeconds, initRecording, audio } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  const handleSetAudio = useCallback(
    ( audio ) => {
      setFieldValue( field, [ ...value, audio ] );
    }, [field, value, setFieldValue],
  );

  const handleInitAudio = () => {
    startRecording();
    setShowTabPanel( true, 0 );
  }

  const handleCancelAudio = () => {
    cancelRecording();
    setShowTabPanel( false );
  }

  useEffect(() => {
    if (audio) {
      handleSetAudio( audio );
    }
  }, [audio, handleSetAudio]);

  return (
    <>
      <div className='col-12'>
          <h3 className='text-center'>
            {
              initRecording && (
                <i className="fas fa-record-vinyl mr-2" />
              )
            }
            0{recordingMinutes} : {formatSeconds(recordingSeconds)}
          </h3>
        <div className='center-inside'>
            { initRecording && (
              <div className='col-4'>
                <Button 
                  label='Cancelar'
                  icon='fas fa-times'
                  className='p-button-raised p-button-danger'
                  onClick={handleCancelAudio}
                />
              </div>
            )}
            <div className="col-4">
              {
                (initRecording)
                  ? (
                    <Button 
                      label='Guardar'
                      icon='fas fa-save'
                      className='p-button-raised p-button-success'
                      disabled={recordingSeconds === 0}
                      tooltip='Guardar nota de voz'
                      tooltipOptions={{ position: 'bottom' }}
                      onClick={saveRecording}
                    />
                  )
                  : (
                    <Button
                      label='Iniciar'
                      icon='fas fa-microphone-alt'
                      className='p-button-raised'
                      tooltip='Iniciar grabación'
                      tooltipOptions={{ position: 'bottom' }}
                      onClick={handleInitAudio}
                    />
                  )
              }
          </div>
        </div>
      </div>
    </>
  )
});
