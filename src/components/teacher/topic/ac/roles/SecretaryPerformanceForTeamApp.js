import React from 'react';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const SecretaryPerformanceForTeamApp = React.memo(({
  secretaryFeaturedInformations,
  loadingSecretaryFeaturedInformation
}) => {
  return (
    <>
      {
        loadingSecretaryFeaturedInformation
          ? (
            <EmptyContentScreen />
          )
          : (
            <div className='grid p-fluid'>
              <div className='col-12'>
                <h5 className='text-center'>Enlaces para cada Miembro</h5>
              </div>
              {
                secretaryFeaturedInformations.map( (data, index) => (
                  <div className='col-4' key={index}>
                    <div className='card'>
                      <div className='col-12'>
                        <h6 className='text-center'>{data.member_ac.name}</h6>
                      </div>
                      <div className='col-12'>
                        <div className='center-inside'>
                          <a 
                            href={data.external_path} 
                            target="_blank" 
                            rel="noreferrer noopener"
                            className='text-center'
                          >
                            <p>
                              <i className="fas fa-external-link-alt mr-2" />
                              Enlace
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )
      }
    </>
  )
});
