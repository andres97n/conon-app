import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { TeacherTopicTableHeaderApp } from './TeacherTopicTableHeaderApp';
import { TeacherTopicActionBodyApp } from './TeacherTopicActionBodyApp';
import { TeacherTopicColumnApp } from './TeacherTopicColumnApp';
import { TeacherTopicStudentTableListApp } from './TeacherTopicStudentTableListApp';

import { 
  startLoadStudentsByTopic, 
  startRemoveTopicStudents
} from '../../../actions/admin/topic';


export const TeacherTopicTableApp = React.memo(({
  toast,
  setTopic,
  setViewTopic,
  setEditTopic
}) => {
  const dispatch = useDispatch();
  const { topics, loading } = useSelector(state => state.dashboard.topic);  
  const [globalFilter, setGlobalFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const dataTable = useRef(null);

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  const onRowExpand = (event) => {
    dispatch(startLoadStudentsByTopic( event.data.id ));
  }

  const onRowCollapse = () => {
    dispatch( startRemoveTopicStudents() );
  }

  return (
    <>
      <div className='col-12'>
        <DataTable
          ref={dataTable} 
          value={topics} 
          globalFilter={globalFilter}
          header={
            <TeacherTopicTableHeaderApp
              title={'Temas de Estudio'}
              icon={'fas fa-brain mr-2 icon-primary'}
              placeholder={'Buscar Tópico...'}
              setGlobalFilter={handleSetGlobalFilter}
            />
          }
          loading={loading}
          expandedRows={expandedRows}
          rowExpansionTemplate={ () => (
            <TeacherTopicStudentTableListApp
              isTopicView={false}
              currentMethodology={{}}
              setShowStudentEvaluation={() => {}}
              setUser={() => {}}
            />
          )
          }
          dataKey="id" paginator rows={10} 
          emptyMessage='No se encontraron Temas de Estudio.'
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
          LastPageLink CurrentPageReport"
          currentPageReportTemplate="{first} - {last} de {totalRecords} Tópicos"
          resizableColumns columnResizeMode="expand"
          className="datatable-responsive"
          onRowToggle={(e) => setExpandedRows(e.data)}
          onRowExpand={onRowExpand}
          onRowCollapse={onRowCollapse}
        >
          <Column expander style={{ width: '4em' }}/>
          <Column 
            className='text-center' 
            field="title" 
            header="Título" 
            sortable
          ></Column>
          <Column 
            className='text-center'
            field="classroom.name" 
            header="Aula" 
            sortable
          ></Column>
          <Column 
            className='text-center'
            field="asignature.name" 
            header="Asignatura" 
            sortable
          ></Column>
          <Column 
            className='text-center'
            field='type'
            header="Tipo" 
            sortable
            body={(e) => (
              <TeacherTopicColumnApp 
                topic={e}
                field={'type'}
              />
            )}
          ></Column>
          <Column 
            className='text-center'
            field="active" 
            header="Estado" 
            sortable
            body={(e) => (
              <TeacherTopicColumnApp 
                topic={e}
                field={'active'}
              />
            )}
          ></Column>
          <Column 
            className='text-center'
            field='created_at'
            header="Fecha de Creación" 
            sortable
            body={(e) => (
              <TeacherTopicColumnApp
                topic={e}
                field={'date'}
              />
            )}
          ></Column>
          <Column body={(e) => (
            <TeacherTopicActionBodyApp
              topic={e}
              toast={toast}
              setTopic={setTopic}
              setViewTopic={setViewTopic}
              setEditTopic={setEditTopic}
            />
          )}></Column>
        </DataTable>
      </div>
    </>
  )
});
