import React from 'react';

import { Accordion, AccordionTab } from 'primereact/accordion';

import { 
  TeacherTopicEditHeaderDuaActivityApp 
} from './dua/TeacherTopicEditHeaderDuaActivityApp';
import { 
  TeacherTopicEditHeaderRubricAbpApp 
} from './abp/TeacherTopicEditHeaderRubricAbpApp';
import { TeacherTopicEditHeaderRubricAcApp } from './ac/TeacherTopicEditHeaderRubricAcApp';


export const TeacherTopicEditHeaderApp = React.memo(({
  topic,
  currentMethodology
}) => {

  const accordationTabHeaderTemplate = ( type ) =>  (
    <React.Fragment>
      <i className="far fa-question-circle mr-2 icon-primary" />
      <span>
        {
          type === 1
            ? ('Actividad Planteada')
            : (type === 2 || type === 3) && 
            ('Rúbrica Planteada')
        }
      </span>
    </React.Fragment>
  );
  
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
      <Accordion >
        <AccordionTab header={accordationTabHeaderTemplate(topic.type)}>
          {
            topic.type === 1
              ? (
                <TeacherTopicEditHeaderDuaActivityApp 
                  currentMethodology={currentMethodology}
                />
              )
              : topic.type === 2
                ? (
                  <TeacherTopicEditHeaderRubricAbpApp
                    currentMethodology={currentMethodology}
                  />
                )
                : topic.type === 3 && (
                  <TeacherTopicEditHeaderRubricAcApp 
                    currentMethodology={currentMethodology}
                  />
                )
          }
        </AccordionTab>
      </Accordion>
      </div>
    </div>
  )
});
