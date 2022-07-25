import React from 'react';

import { Message } from 'primereact/message';

import { MethodologySuggestionsScreen } from '../../MethodologySuggestionsScreen';
import { TopicTeacherFormApp } from './TopicTeacherFormApp';


export const TopicTeacherBodyApp = React.memo(({
  userId,
  topicData,
  showTopicPanel,
  toast,
  isTopicSaved,
  setIsTopicSaved
}) => {
  return (
    <>
      {
        !showTopicPanel
          ? ( <MethodologySuggestionsScreen /> )
          : (
            isTopicSaved
              ? (
                <div className='col-12'>
                  <h4 className='text-center icon-success'>
                    <i className="fas fa-check mr-2" />
                    Tópico Guardado con éxito!!
                  </h4>
                  <Message
                    className='mt-2'
                    severity="info" 
                    text="Ya puede asignar estudiantes al mismo y crear una 
                    rúbrica o actividad dependiendo la metodología."
                  ></Message>
                </div>
              )
              : (
                <TopicTeacherFormApp 
                  userId={userId}
                  topicData={topicData}
                  toast={toast}
                  setIsTopicSaved={setIsTopicSaved}
                />
              )
          )
      }
    </>
  )
});
