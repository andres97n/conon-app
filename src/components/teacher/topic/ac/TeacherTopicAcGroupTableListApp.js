import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

import { 
  TeacherTopicGroupTableStudentResumeApp 
} from '../TeacherTopicGroupTableStudentResumeApp';

import { changeObjectDate } from '../../../../helpers/abp-steps';


export const TeacherTopicAcGroupTableListApp = React.memo(({
  currentMethodology,
  setShowGroupProgress
}) => {
  
  const { students } = useSelector(state => state.dashboard.topic);
  const dataTable = useRef(null);

  const columnBodyTemplate = ( e ) => (
    <React.Fragment>
      <Button
        icon='far fa-eye'
        className='p-button-rounded p-button-success p-button-outlined'
        tooltip='Visualizar Progreso del Equipo'
        tooltipOptions={{position:'bottom'}}
        onClick={() => setShowGroupProgress(e)}
      />
    </React.Fragment>
  );

  const stateColumnTemplate = ( e ) => (
    <React.Fragment>
      <Badge
        value={
          typeof e === 'number'
            ? e === 1
              ? 'Activo'
              : 'Inactivo'
            : e 
              ? 'Activo'
              : 'Inactivo'
        }
        className='ml-3' 
        severity={
          typeof e === 'number'
            ? e === 1
              ? 'success'
              : 'danger'
            : e 
              ? 'success'
              : 'danger'
        }
      ></Badge>
    </React.Fragment>
  );

  const dateColumnTemplate = ( e ) => (
    <React.Fragment>
      <Badge
        value={changeObjectDate(e.team_ac.created_at)}
        className='ml-3' 
        severity='info'
      ></Badge>
    </React.Fragment>
  );
  
  return (
    <div className="p-grid crud-demo">
        <div className="p-col-12">
          <DataTable
            ref={dataTable} 
            value={students} 
            resizableColumns 
            selectionMode='single'
            showGridlines
            dataKey="id" paginator rows={10} 
            emptyMessage='No existen Grupos Agregados.'
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks 
            NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} de {totalRecords} grupos"
            columnResizeMode="expand"
            className="datatable-responsive"
          >
            <Column
              className='text-center'
              header="Integrantes"
              body={(e) => (
                <TeacherTopicGroupTableStudentResumeApp
                details={e.details}
                type={currentMethodology.type}
                />
              )}
            ></Column>
            <Column
              className='text-center'
              field={
                currentMethodology.type === 2
                  ? 'state'
                  : 'active'
              }
              header="Estado"
              body={stateColumnTemplate}
              sortable
            ></Column>
            <Column
              className='text-center' 
              field="team_abp.created_at" 
              header="Fecha de Asignación"
              body={dateColumnTemplate}
              sortable
            ></Column>
            <Column
              className='text-center'
              header="Progreso del Equipo"
              body={columnBodyTemplate}
              sortable
            ></Column>
          </DataTable>
        </div>
    </div>
  )
});
