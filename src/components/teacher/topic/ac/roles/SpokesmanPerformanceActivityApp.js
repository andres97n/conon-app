import React from 'react';

import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const SpokesmanPerformanceActivityApp = React.memo(({
  spokesmanActivitiesDescription,
  loadingSpokesmanActivityDescription
}) => {
  return (
    <>
      {
        loadingSpokesmanActivityDescription
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Preguntas Realizadas al Docente</h5>
              </div>
              {
                spokesmanActivitiesDescription.map( (activity, index) => (
                  <div className='col-12' key={index}>
                    <h6 className='text-center'>{activity.member_ac.name}</h6>
                    <InputTextarea
                      value={activity.activity_description}
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
