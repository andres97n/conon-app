import React from 'react';

import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const OrganizerPerformanceUnderstandingApp = React.memo(({
  organizerDescribeUnderstandingList,
  loadingOrganizerDescribeUnderstanding
}) => {
  return (
    <>
      {
        loadingOrganizerDescribeUnderstanding
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Entendimiento del Equipo sobre el Problema</h5>
              </div>
              {
                organizerDescribeUnderstandingList.map( (opinion, index) => (
                  <div className='col-6' key={index}>
                    <div className='col-card'>
                      <h6>{opinion.member_ac.name}</h6>
                      <InputTextarea
                        value={opinion.understanding}
                        autoResize
                        disabled 
                      />
                    </div>
                  </div>
                ))  
              }
            </>
          )
      }
    </>
  )
});
