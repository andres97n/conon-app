import React from 'react';
import { TopicViewTextEditorApp } from '../../../student/editor/TopicViewTextEditorApp';

export const TeacherTopicEditViewMainProblemApp = React.memo(({
  problem
}) => {
  return (
    <>
      <div className='col-12'>
        <TopicViewTextEditorApp 
          height={'450px'}
          value={problem}
        />
      </div>
    </>
  )
});
