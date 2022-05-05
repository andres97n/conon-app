import React from 'react';

export const ToolGlossaryMainApp = React.memo(({
  setShowGlossary
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h5 className='text-center'>
          Administrar Glosarios
        </h5>
      </div>
    </div>
  )
});
