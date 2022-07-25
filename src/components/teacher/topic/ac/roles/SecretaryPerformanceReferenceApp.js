import React from 'react';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const SecretaryPerformanceReferenceApp = React.memo(({
  secretaryInformations,
  loadingSecretaryInformation
}) => {
  return (
    <>
      {
        loadingSecretaryInformation
          ? (
            <EmptyContentScreen />
          )
          : (
            <div className='grid p-fluid'>
              <div className='col-12'>
                <h5 className='text-center'>Enlaces Subidos al Equipo</h5>
              </div>
              {
                secretaryInformations.map( (data, index) => (
                  <div className='col-4' key={index}>
                    <div className='card'>
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
