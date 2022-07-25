import React from 'react';

import { TabView,TabPanel } from 'primereact/tabview';

import { TeacherTopicEditViewMainInfo } from './TeacherTopicEditViewMainInfo';
import { TeacherTopicEditViewMainProblemApp } from './TeacherTopicEditViewMainProblemApp';
import { TeacherTopicEditViewMainFinalizeApp } from './TeacherTopicEditViewMainFinalizeApp';
import { TeacherTopicEditViewFinalizeDuaApp } from './dua/TeacherTopicEditViewFinalizeDuaApp';

import { getMethodologyTypeTabs } from '../../../../helpers/topic/table/topicTableEdit';


export const TeacherTopicEditBodyApp = React.memo(({
  topic,
  currentMethodology
}) => {

  const methodologyTabs = getMethodologyTypeTabs(topic.type);

  return (
    <>
      {
        methodologyTabs && methodologyTabs?.length === 0
        ? (
          <div className='col-12'>
            <small>No se pudo encontrar el tipo de metodología implementada.</small>
          </div>
        )
        : (
          <>
            <div className='col-12'>
              <h3 className='text-center'>
                <i className="fas fa-brain icon-primary" />
              </h3>
              <h4 className='text-center'>
                {topic.title}
              </h4>
            </div>
            <div className='col-12'>
              <TabView>
                {
                  methodologyTabs.map( (data, index) => (
                    <TabPanel 
                      header={data.name} 
                      key={index}
                      leftIcon={data.icon}
                    >
                      {
                        data.tab === 1
                        ? (
                          <TeacherTopicEditViewMainInfo 
                            topic={topic}
                          />
                        )
                        : data.tab === 2
                          ? (
                            <TeacherTopicEditViewMainProblemApp
                              problem={
                                topic.type === 1
                                  ? (currentMethodology['written_conceptualization'])
                                  : topic.type === 2
                                    ? (currentMethodology['problem'])
                                    : topic.type === 3 && (
                                      currentMethodology['real_problem']
                                    )
                              }
                            />
                          )
                          : data.tab === 3
                            ? (
                              <TeacherTopicEditViewMainFinalizeApp 
                                type={topic.type}
                                currentMethodology={currentMethodology}
                              />
                            )
                            : (
                              <TeacherTopicEditViewFinalizeDuaApp 
                                currentMethodology={currentMethodology}
                              />
                            )
                      }
                    </TabPanel>
                  ))
                }
              </TabView>
            </div>
          </>
        )
      }
    </>
  )
});
