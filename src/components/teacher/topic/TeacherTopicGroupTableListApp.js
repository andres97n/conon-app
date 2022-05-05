import React, { useRef } from 'react'
import { useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';

import { 
  TeacherTopicGroupTableStudentResumeApp 
} from './TeacherTopicGroupTableStudentResumeApp';

import { getStepLabel } from '../../../helpers/topic/table/topicTable';


export const TeacherTopicGroupTableListApp = React.memo(({
  type,
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
  )

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
            field="team_abp.step" 
            header="Paso Actual"
            body={(e) => (<p>{getStepLabel(e)}</p>)}
            sortable
          ></Column>
          <Column
            className='text-center'
            field={
              type=== 2
                ? 'state'
                : 'active'
            }
            header="Estado"
            body={stateColumnTemplate}
            sortable
          ></Column>
          <Column
            className='text-center'
            header="Integrantes"
            body={(e) => (
              <TeacherTopicGroupTableStudentResumeApp 
              details={e.details}
              type={type}
              />
            )}
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
