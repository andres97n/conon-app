import React from 'react';

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';


export const OwnerHeaderApp = React.memo(({
  title,
  icon,
  placeholder,
  withActive,
  setGlobalFilter,
  handleNewData
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h4 className="text-center m-0"><i className={icon} />{title}</h4>
      </div>
      {
        withActive && (
          <div className='col-12'>
            <div className='center-inside'>
              <Button
                icon="fas fa-user-plus"
                tooltip='Nuevo Administrador'
                tooltipOptions={{position:'bottom'}}
                className="p-button-rounded p-button-success mr-2"
                onClick={() => handleNewData(true)}
              />
            </div>
          </div>
        )
      }
      <div className='col-12'>
        <div className='center-inside'>
          <div className='col-5'>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
              <i className="fas fa-search" />
              <InputText
                type="search" 
                onInput={(e) => setGlobalFilter(e.target.value)} 
                placeholder={placeholder} 
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
});
