import { Button } from 'primereact/button';
import React, { useEffect } from 'react';

import { useRecordingList } from '../../../../hooks/useRecordingList';

export const RecordingsList = React.memo(({
    audio,
    oral_conceptualization
}) => {

    const { recordings, deleteAudio } = useRecordingList(audio, oral_conceptualization);

    useEffect(() => {
        if (recordings.length > 0) {
            let savedAudios = recordings;
            if (oral_conceptualization.length > recordings.length) {
                oral_conceptualization.splice(0, oral_conceptualization.length);
                recordings.forEach(record => {
                    oral_conceptualization.push(record);
                });
            } else {
                if (oral_conceptualization.length === 0 && recordings.length === 1) {
                    oral_conceptualization.push(recordings[0]);
                } else {
                    savedAudios.filter( record => !oral_conceptualization.includes(record)).forEach( record => {
                        if (oral_conceptualization.length > 0) {
                            oral_conceptualization.push(record);
                        }
                    } );
                }
            }

        } 

        if (oral_conceptualization.length > recordings.length) {
            oral_conceptualization.splice(0, oral_conceptualization.length);
        }

    }, [recordings, oral_conceptualization]);


    return (
        <>
            {
                (recordings.length > 0)
                    ? (
                        <div className='p-grid p-fluid'>
                            <div className="field col-12">
                                <h2>Listado de Notas de Voz</h2>
                            </div>
                            <div className="field col-8">
                                {
                                    recordings.map( record => (
                                        <div className='record' key={record.key}>
                                            <audio controls src={record.audio} />
                                            <Button 
                                                icon='fas fa-trash-alt'
                                                className='p-button-rounded p-button-danger ml-2'
                                                tooltip='Eliminar nota de voz'
                                                tooltipOptions={{ position: 'bottom' }}
                                                onClick={() => deleteAudio(record.key)}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                    : (
                        <div className='grid p-fluid'>
                            <div className="field col-2"></div>
                            <div className="field col-8">
                                <span>No existen notas de voz</span>
                            </div>
                            <div className="field col-2"></div>
                        </div>
                    )
            }
        </>
    )
});
