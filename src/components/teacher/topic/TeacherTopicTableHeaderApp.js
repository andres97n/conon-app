import React from 'react';

import { InputText } from 'primereact/inputtext';


export const TeacherTopicTableHeaderApp = React.memo(({
  title,
  icon,
  placeholder,
  setGlobalFilter
}) => {
  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <h4 className="text-center m-0"><i className={icon} />{title}</h4>
      </div>
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
