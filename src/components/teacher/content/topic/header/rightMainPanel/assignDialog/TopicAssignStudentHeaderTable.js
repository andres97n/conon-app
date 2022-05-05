import React from 'react';

import { InputText } from 'primereact/inputtext';


export const TopicAssignStudentHeaderTable = React.memo(({
  title,
  setGlobalFilter
}) => {
  return (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">{title || 'Seleccionar Estudiantes'}</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="fas fa-search" />
        <InputText
          type="search" 
          onInput={(e) => setGlobalFilter(e.target.value)} 
          placeholder="Buscar Estudiante..." 
        />
      </span>
    </div>
  )
});
