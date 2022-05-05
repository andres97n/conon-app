import React from 'react';

export const ResumeTeamReferencesStepThreeAbpApp = React.memo(({
  references
}) => {
  return (
    <>
      {
        references.length === 0
          ? (
            <p>No existen referencias con esta opinión.</p>
          )
          : (
            references.map( reference => (
              <div
                className={
                  references.length <= 2
                    ? ('col-6')
                    : (references.length === 3
                      ? ('col-4')
                      : ('col-3')
                    )
                }
                key={reference.id}
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
                      {reference.user.name}
                    </p>
                  </div>
                  <div className='col-12'>
                    <div className='center-inside'>
                      <a 
                        href={reference.url_reference} 
                        target="_blank" 
                        rel="noreferrer noopener"
                        className='text-center'
                      >
                        <p>
                          <i 
                            className="fas fa-external-link-alt mr-2" />
                          Enlace
                        </p>
                      </a>
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
