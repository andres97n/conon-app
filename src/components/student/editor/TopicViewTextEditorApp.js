import React from 'react';

import { Editor } from 'primereact/editor';

import { emptySecondHeaderRender } from '../../../helpers/topic';


export const TopicViewTextEditorApp = React.memo(({
  height,
  value
}) => {

  const header = emptySecondHeaderRender();

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <Editor
          style={{ height: height }}
          headerTemplate={header} 
          value={value} 
          readOnly={true}
        />
      </div>
    </div>
  )
});
