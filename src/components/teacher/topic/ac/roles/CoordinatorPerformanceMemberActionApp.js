import React from 'react';

import { EmptyContentScreen } from '../../../../ui/EmptyContentScreen';


export const CoordinatorPerformanceMemberActionApp = React.memo(({
  memberPerformancesCoordinator,
  loadingMemberPerformancesCoordinator
}) => {
  return (
    <>
      {
        loadingMemberPerformancesCoordinator
          ? (
            <EmptyContentScreen />
          )
          : (
            <>
              <div className='col-12'>
                <h5 className='text-center'>Calificación al Desempeño del Equipo</h5>
              </div>
              {
                memberPerformancesCoordinator.map( (performance, index) => (
                  <div className='col-6' key={index}>
                    <div className='col-12'>
                      <div className='card'>
                        <h5 className='text-center'>
                          <i className="fas fa-check mr-2 icon-success" />
                          {performance.member_ac.name}
                        </h5>
                        <h4 className='text-center'>
                          {performance.member_assessment}
                        </h4>
                      </div>
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
