import React from 'react';

import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const SpokesmanPerformanceDescriptionApp = React.memo(({
  spokesmanPerformanceDescription,
  loadingSpokesmanPerformanceDescription
}) => {
  return (
    <>
      {
        loadingSpokesmanPerformanceDescription
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Desempeño General del Equipo</h5>
              </div>
              <div className='col-12'>
                <InputTextarea
                  value={spokesmanPerformanceDescription.performance_description}
                  autoResize
                  disabled 
                />
              </div>
              <div className='col-12'>
                <h5 className='text-center'>Descripción Oral</h5>
              </div>
              <div className='grid p-fluid'>
                {
                  Array.isArray(spokesmanPerformanceDescription.oral_description) && (
                    spokesmanPerformanceDescription.oral_description.map((
                      audio, index
                    ) => (
                      <div className='col-6' key={index}>
                        <div className='card'>
                          <audio controls src={audio.path} />
                        </div>
                      </div>
                    ))
                  )
                }
              </div>
            </>
          )
      }
    </>
  )
});
