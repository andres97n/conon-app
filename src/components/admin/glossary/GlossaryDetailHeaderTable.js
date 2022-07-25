import React from 'react';

import { InputText } from 'primereact/inputtext';


export const GlossaryDetailHeaderTable = React.memo(({
  setGlobalFilter
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h4 className="text-center m-0">
          <i className='fas fa-spell-check mr-2 icon-primary' />
          Administrar Glosarios
        </h4>
      </div>
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-5'>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
              <i className="fas fa-search" />
              <InputText
                type="search" 
                onInput={(e) => setGlobalFilter(e.target.value)} 
                placeholder='Buscar Términos...' 
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
});
