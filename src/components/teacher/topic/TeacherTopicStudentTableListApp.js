import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { TeacherTopicTableHeaderApp } from './TeacherTopicTableHeaderApp';


export const TeacherTopicStudentTableListApp = React.memo(({
  isTopicView,
  currentMethodology,
  setShowStudentEvaluation,
  setUser
}) => {
  
  const { students } = useSelector(state => state.dashboard.topic);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dataTable = useRef(null);

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  const handleShowStudentEvaluation = ( user ) => {
    setShowStudentEvaluation(currentMethodology.id);
    setUser(user);
  }

  const columnBodyTemplate = ( e ) => (
    <React.Fragment>
      <Button 
        icon='fas fa-tasks'
        className='p-button-rounded p-button-success p-button-outlined'
        tooltip='Evaluación del Estudiante'
        tooltipOptions={{position:'bottom'}}
        onClick={() => handleShowStudentEvaluation(e)}
      />
    </React.Fragment>
  );

  return (
    <div className="p-grid crud-demo">
      <div className="p-col-12">
        <DataTable
          ref={dataTable} 
          value={students} 
          globalFilter={globalFilter}
          resizableColumns 
          header={
            <TeacherTopicTableHeaderApp
              title={'Estudiantes Agregados'}
              icon={'fas fa-users mr-2 icon-primary'}
              placeholder={'Buscar Estudiante...'}
              setGlobalFilter={handleSetGlobalFilter}
            />
          }
          selectionMode='single'
          showGridlines
          dataKey="id" paginator rows={10} 
          emptyMessage='No existen Estudiantes.'
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks 
          NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="{first} - {last} de {totalRecords} estudiantes"
          columnResizeMode="expand"
          className="datatable-responsive"
        >
          <Column
            className='text-center' 
            field="identification" 
            header="Identificación" 
            sortable
          ></Column>
          <Column 
            className='text-center'
            field="name" 
            header="Nombres" 
            sortable
          ></Column>
          <Column 
            className='text-center'
            field="age" 
            header="Edad" 
            sortable
          ></Column>
          <Column 
            className='text-center'
            field="email" 
            header="Email" 
            sortable
          ></Column>
          {
            isTopicView && (
              <Column 
                className='text-center'
                header="Visualizar Actividad"
                body={columnBodyTemplate} 
              ></Column>
            )
          }
        </DataTable>
      </div>
    </div>
  )
});
