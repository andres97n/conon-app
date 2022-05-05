import React from 'react';

import { TopicViewTextEditorApp } from '../editor/TopicViewTextEditorApp';


export const StudentDuaTextViewApp = React.memo(({
  textValue,
  title,
  icon,
  height
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className={icon} /> {title}
        </h5>
      </div>
      <div className='col-12'>
        <TopicViewTextEditorApp
          height={height}
          value={textValue}
        />
      </div>
    </div>
  )
});
