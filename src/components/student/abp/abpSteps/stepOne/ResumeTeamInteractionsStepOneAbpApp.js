import React from 'react';

export const ResumeTeamInteractionsStepOneAbpApp = React.memo(({
  interactions
}) => {
  return (
    <>
      {
        interactions.length === 0
          ? (
            <p>No existen interacciones con esta opinión.</p>
          )
          : (
            interactions.map( interaction => (
              <div
                className={
                  interactions.length <= 2
                    ? ('col-6')
                    : ('col-4')
                }
                key={interaction.id}
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
                      {interaction.user.name}
                    </p>
                  </div>
                  <div className='col-12'>
                    <div className='center-inside'>
                      {
                        interaction.opinion_interaction === 2
                          ? (
                            <i className=
                              "fas fa-check-circle icon-success fa-lg" 
                            />
                          )
                          : (interaction.opinion_interaction === 1)
                            ? (
                              <i className=
                              "fas fa-times-circle icon-black fa-lg" 
                            />
                            )
                            : (
                              <h6>Sin interactuar</h6>
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
