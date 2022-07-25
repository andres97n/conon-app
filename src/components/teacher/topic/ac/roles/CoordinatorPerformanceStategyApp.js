import React from 'react';

import { InputTextarea } from 'primereact/inputtextarea';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const CoordinatorPerformanceStategyApp = React.memo(({
  coordinatorStrategies,
  loadingCoordinatorStrategy
}) => {
  return (
    <>
      {
        loadingCoordinatorStrategy
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Estrategias Ingresadas</h5>
              </div>
              {
                coordinatorStrategies.map( (strategy, index) => (
                  <div className='col-12' key={index}>
                    <InputTextarea 
                      value={strategy.strategy}
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
