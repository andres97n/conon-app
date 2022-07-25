import React from 'react';

import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const OrganizerPerformanceActivityApp = React.memo(({
  organizerAssignActivities,
  loadingOrganizerAssignActivity
}) => {
  return (
    <>
      {
        loadingOrganizerAssignActivity
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Actividades Asignadas al Equipo</h5>
              </div>
              {
                organizerAssignActivities.map( (activity, index) => (
                  <div className='col-12' key={index}>
                    <h6>{activity.member_ac.name}</h6>
                    <InputTextarea
                      value={activity.member_activity}
                      autoResize
                      disabled 
                    />
                  </div>
                ))  
              }
            </>
          )
      }
    </>
  )
});
