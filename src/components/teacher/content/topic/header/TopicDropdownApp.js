import React from 'react';

import { Dropdown } from 'primereact/dropdown';


export const TopicDropdownApp = React.memo(({
  value,
  options,
  placeholder,
  emptyMessage,
  conditional,
  tooltipPositive,
  tooltipNegative,
  handleChange
}) => {
  return (
    <>
      <Dropdown
        value={value} 
        options={
          conditional
            ? options
            : []
        }
        optionLabel="name" 
        filter 
        showClear={
          typeof value === 'object'
            ? false
            : true
        } 
        filterBy="name" 
        placeholder={placeholder}
        emptyMessage={emptyMessage}
        emptyFilterMessage='No se encontraron resultados'
        tooltip={
          typeof value === 'object'
            ? (tooltipPositive)
            : (tooltipNegative)
        }
        tooltipOptions={{position:'bottom'}}
        disabled={
          conditional
            ? false
            : true
        }
        className='mr-2'
        onChange={handleChange} 
      />
    </>
  )
});
