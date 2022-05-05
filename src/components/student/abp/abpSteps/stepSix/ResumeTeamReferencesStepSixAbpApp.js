import React from 'react';

import { Badge } from 'primereact/badge';

import { changeObjectDate } from '../../../../../helpers/abp-steps';

export const ResumeTeamReferencesStepSixAbpApp = React.memo(({
  references
}) => {
  return (
    <>
      {
        references.length > 0
          ? (
            references.map( reference => (
              <div 
                className='col-3' 
                key={reference.id}
              >
                <div className='card'>
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
                        href={reference.problem_reference} 
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
                  <div className='col-12'>
                    <div className='center-inside'>
                      <Badge
                        value={
                          changeObjectDate(reference.created_at)
                        } 
                        severity='info'
                      ></Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
          : (
            <div className='col-12'>
              <span>
                No existen registros de referencias publicadas
              </span>
            </div>
          )
      }
    </>
  )
});
