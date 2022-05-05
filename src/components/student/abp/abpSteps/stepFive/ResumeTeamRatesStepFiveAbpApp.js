import React from 'react';

import { Rating } from 'primereact/rating';


export const ResumeTeamRatesStepFiveAbpApp = React.memo(({
  rates
}) => {
  return (
    <>
      {
        rates.length === 0
          ? (
            <p>No existen interacciones con esta opinión.</p>
          )
          : (
            rates.map( rate => (
              <div
                className={
                  rates.length <= 2
                    ? ('col-6')
                    : (rates.length === 3
                      ? ('col-4')
                      : ('col-3')
                    )
                }
                key={rate.id}
              >
                <div className='grid p-fluid'>
                  <div className='col-12'>
                    <div className='center-inside'>
                      <i className=
                        "fas fa-book-reader icon-secondary mr-2"
                      />
                    </div>
                  </div>
                  <div className='col-12'>
                    <p className='text-center'>
                      {rate.user.name}
                    </p>
                  </div>
                  <div className='col-12'>
                    <div className='center-inside'>
                      {
                        rate.rate_perform_action === 0
                          ? (
                            <h6 className='text-center'>
                              Sin calificación
                            </h6>
                          )
                          : (
                            <Rating
                              value={rate.rate_perform_action}
                              disabled={true} 
                              cancel={false}
                            />
                          )
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
      }
    </>
  )
});
