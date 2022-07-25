import React from 'react';

import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const OrganizerPerformanceActionApp = React.memo(({
  organizerActions,
  loadingOrganizerAction
}) => {
  return (
    <>
      {
        loadingOrganizerAction
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Acciones a Realizar</h5>
              </div>
              {
                organizerActions.map( (action, index) => (
                  <div className='col-12' key={index}>
                    <InputTextarea 
                      value={action.action}
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
