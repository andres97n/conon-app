import React from 'react';

import { Button } from 'primereact/button';
import { TabView,TabPanel } from 'primereact/tabview';
import { EmptyContentScreen } from '../../../ui/EmptyContentScreen';
import { getIconRole } from '../../../../helpers/topic/table/topicTable';
import { TeacherTopicAcResumeActionRoleBody } from './TeacherTopicAcResumeActionRoleBody';


export const TeacherTopicAcResumeActionRoleApp = React.memo(({
  topic,
  toast,
  currentMethodology,
  group,
  handleHideShowResumeRoles
}) => {

  if (!group.team_ac || Object.keys(group.team_ac).length === 0) {
    return (
      <div className='grid p-fluid'>
        <div className='col-12'>
          <small>No se recibió el equipo a visualizar.</small>
        </div>
      </div>  
    )
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-3'>
            <Button 
              label='Regresar a Tabla'
              icon='fas fa-hand-point-left'
              className='p-button-raised'
              onClick={handleHideShowResumeRoles}
            />
          </div>
        </div>
      </div>
      <div className='col-12'>
        <h4 className='text-center'>
          <i className="fas fa-walking mr-2 icon-primary" />
          Progreso del Equipo
        </h4>
      </div>
        {
          (!group.details)
            ? (
              <div className='col-12'>
                <EmptyContentScreen />
              </div>     
            )
            : (
              <div className='col-12'>
                <TabView>
                  {
                    group.details.map( (student, index) => (
                      <TabPanel 
                        header={student.owner.name}
                        leftIcon={getIconRole(student.role_type)}
                        key={index}
                      >
                        <div className='card'>
                          <TeacherTopicAcResumeActionRoleBody 
                            student={student}
                            topic={topic}
                            currentMethodology={currentMethodology}
                            toast={toast}
                          />
                        </div>
                      </TabPanel>
                    ))
                  }
                </TabView>
              </div>
            )
        }
    </div>
  )
});
