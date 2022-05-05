import React from 'react';

import { Button } from 'primereact/button';

import { formatSeconds } from '../../../../helpers/topic';

export const RecorderControls = React.memo(({
    recorderState,
    handlers
}) => {

    const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
    const { startRecording, saveRecording, cancelRecording } = handlers;

    return (
        <div className='grid p-fluid'>
            <div className='col-12'>
                <div className='center-inside'>
                    <div className="field col-8">
                        { initRecording && (<i className="fas fa-record-vinyl mr-2"></i>) }
                        <span>0{recordingMinutes}</span>
                        <span>:</span>
                        <span>{formatSeconds(recordingSeconds)}</span>
                        { initRecording && (
                            <Button 
                                icon='fas fa-times'
                                className='p-button-rounded p-button-danger ml-2'
                                onClick={cancelRecording}
                            />
                        )}
                        {
                            (initRecording)
                                ? (
                                    <Button 
                                        icon='fas fa-save'
                                        className='p-button-rounded p-button-danger ml-2'
                                        disabled={recordingSeconds === 0}
                                        tooltip='Guardar nota de voz'
                                        tooltipOptions={{ position: 'bottom' }}
                                        onClick={saveRecording}
                                    />
                                )
                                : (
                                    <Button 
                                        icon='fas fa-microphone-alt'
                                        className='p-button-rounded p-button-success ml-2'
                                        tooltip='Iniciar grabación'
                                        tooltipOptions={{ position: 'bottom' }}
                                        onClick={startRecording}
                                    />
                                )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
});
