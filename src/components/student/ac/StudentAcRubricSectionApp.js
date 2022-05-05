import React, { useEffect, useRef } from 'react';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';


export const StudentAcRubricSectionApp = React.memo(({
  currentRubric,
  loadingRubricDetailAc
}) => {

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, []);

  if (loadingRubricDetailAc) {
    return (
      <div className='grid p-fluid'>
        <div className='col-12'>
          <EmptyContentScreen />
        </div>
      </div>  
    )
  }

  if (currentRubric.length === 0 || !currentRubric[0].rubric_ac) {
    return (
      <div className='grid p-fluid'>
        <div className='col-12'>
          <small>No existe información acerca de la rúbrica.</small>
        </div>
      </div>  
    )
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          <i className="fas fa-tasks mr-2 icon-primary" />
          Secciones de la Rúbrica
        </h5>
      </div>
      {
        isMounted.current && currentRubric[0].rubric_detail_ac.map((section, index) => (
          <div className='col-4' key={index}>
            <div className='col-12'>
              <div className='card'>
                <h6 className='text-center'>
                  <i className="fas fa-clipboard-check mr-2 icon-success" />
                  {section.detail_title}
                </h6>
                <p className='align-justify'>
                  {section.detail_description || 'No existe descripción.'}
                </p>
                <div className='grid p-fluid'>
                  <div className='col-6'>
                    <h5>
                      <i className="fas fa-percentage mr-2 icon-primary" />
                      {section.percentage_grade}
                    </h5>
                  </div>
                  <div className='col-6'>
                    <h5 className='text-end'>
                      <i className="fas fa-check-circle mr-2 icon-success" />
                      {section.rating_value}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
});
