import React from 'react';

import { TopicViewTextEditorApp } from '../../../student/editor/TopicViewTextEditorApp';
import { 
  TeacherTopicEditViewAbpMainFinalizeApp 
} from './abp/TeacherTopicEditViewAbpMainFinalizeApp';
import { 
  TeacherTopicEditViewAcMainFinalizeApp 
} from './ac/TeacherTopicEditViewAcMainFinalizeApp';


export const TeacherTopicEditViewMainFinalizeApp = React.memo(({
  type,
  currentMethodology
}) => {

  if (!type) {
    return (
      <div className='col-12'>
        <small>No se encuentra la metodología aplicada.</small>
      </div>
    );
  }

  return (
    <>
    {
      type === 1
        ? (
          <TopicViewTextEditorApp 
            height={'450px'}
            value={currentMethodology['example']}
          />
        )
        : type === 2
          ? (
            <TeacherTopicEditViewAbpMainFinalizeApp 
              currentMethodology={currentMethodology}
            />
          )
          : type === 3 && (
            <TeacherTopicEditViewAcMainFinalizeApp 
              currentMethodology={currentMethodology}
            />
          )
    }
    </>
  )
});
