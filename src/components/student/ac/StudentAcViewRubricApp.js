import React, { useEffect, useRef } from 'react';

import { EmptyContentScreen } from '../../ui/EmptyContentScreen';


export const StudentAcViewRubricApp = React.memo(({
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
        <h5 className='mt-2'>
          La rúbrica presenta lo siguiente ...
        </h5>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h6>
            <i className="fas fa-align-justify mr-2 icon-primary" />
            Descripción de la Rúbrica
          </h6>
          <p className='align-justify'>
            {currentRubric[0].rubric_ac.description_rubric}
          </p>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <h6>
            <i className="fas fa-file-signature mr-2 icon-primary" />
            Calificación Total del Tópico
          </h6>
          <h3 className='text-end'>
            <i className="fas fa-users mr-2 icon-primary" />
            {currentRubric[0].rubric_ac.ac_final_value}
          </h3>
        </div>
      </div>
    </div>
  )
});
