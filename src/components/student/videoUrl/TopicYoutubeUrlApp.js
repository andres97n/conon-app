import React from 'react';

import { TopicYoutubeUrlFormApp } from './TopicYoutubeUrlFormApp';
import { TopicYoutubeUrlViewApp } from './TopicYoutubeUrlViewApp';


export const TopicYoutubeUrlApp = React.memo(({
  field,
  value,
  toast,
  setVideoValue
}) => {

  return (
    <div className='grid p-fluid'>
      {
        !value
          ? (
            <TopicYoutubeUrlFormApp 
            field={field}
            toast={toast}
            setVideoValue={setVideoValue}
            />
          )
          : (
            <TopicYoutubeUrlViewApp 
              value={value}
              field={field}
              setVideoValue={setVideoValue}
            />
          )
      }
    </div>
  )
});
