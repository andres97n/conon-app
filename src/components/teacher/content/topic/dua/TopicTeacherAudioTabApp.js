import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Messages } from 'primereact/messages';

import { TopicUploadAudioApp } from '../audio/TopicUploadAudioApp';
import { TopicUploadViewAudioApp } from '../audio/TopicUploadViewAudioApp';


export const TopicTeacherAudioTabApp = React.memo(({
  schoolData,
  value,
  field,
  maxAudios,
  toast,
  setFieldValue
}) => {

  const [audioCount, setAudioCount] = useState(0);
  const infoMsg = useRef(null);

  const handleSetAudioCount = useCallback(
    ( isPlus ) => {
      if (isPlus) {
        setAudioCount( oldState => oldState + 1 );
      } else {
        setAudioCount( oldState => oldState - 1 );
      }
    }, [],
  );

  useEffect(() => {
    if (infoMsg.current?.state.messages?.length === 0 && maxAudios) {
      infoMsg.current.show({ 
        severity: 'info', 
        detail: `Puede ingresar un máximo de ${maxAudios} audios.`,
        sticky: true 
      });
    }
  }, [maxAudios]);

  return (
    <div className='grid p-fluid'>
      <div className='col-6'>
        <TopicUploadAudioApp
          schoolData={schoolData}
          value={value}
          field={field}
          maxAudios={maxAudios}
          audioCount={audioCount}
          toast={toast}
          setFieldValue={setFieldValue}
          setAudioCount={handleSetAudioCount}
        />
      </div>
      <div className='col-6'>
        <div className='card'>
          <TopicUploadViewAudioApp 
            schoolData={schoolData}
            value={value}
            field={field}
            toast={toast}
            setFieldValue={setFieldValue}
            setAudioCount={handleSetAudioCount}
          />
        </div>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <Messages
            ref={infoMsg} 
            className='align-justify'
          />
        </div>
      </div>
    </div>
  )
});
