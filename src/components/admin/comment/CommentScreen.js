import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { 
  TeacherTopicTableHeaderApp 
} from '../../teacher/topic/TeacherTopicTableHeaderApp';
import { 
  TeacherTopicColumnApp 
} from '../../teacher/topic/TeacherTopicColumnApp';
import { CommentDetailApp } from './CommentDetailApp';

import { 
  startLoadInactiveTopicsByOwner, 
  startRemoveTopics 
} from '../../../actions/admin/topic';
import { startLoadGlossariesByTopic } from '../../../actions/admin/comment';


export const CommentScreen = React.memo(() => {

  const dispatch = useDispatch();
  const { topics, loading } = useSelector(state => state.dashboard.topic);  
  const [globalFilter, setGlobalFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);
  const dataTable = useRef(null);
  const schoolPeriodId = localStorage.getItem('currentPeriodId');

  const handleLoadTopics = useCallback(
    ( schoolPeriodId ) => {
      dispatch( startLoadInactiveTopicsByOwner( schoolPeriodId ));
    }, [dispatch],
  );

  const handleRemoveTopics = useCallback(
    () => {
      dispatch( startRemoveTopics() );
    }, [dispatch],
  );

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  // const handleChangePage = ( data ) => {
  //   console.log(data, 'hola');
  // }

  const onRowExpand = (event) => {
    dispatch( startLoadGlossariesByTopic( event.data.id ) );
  }

  useEffect(() => {
    if (schoolPeriodId) {
      handleLoadTopics( schoolPeriodId );
    }
  
    return () => {
      if (schoolPeriodId) {
        handleRemoveTopics();
      }
    }
  }, [schoolPeriodId, handleLoadTopics, handleRemoveTopics]);

  return (
    <div className="p-grid crud-demo">
      <div className="p-col-12">
        <div className='card'>
          <Toast ref={toast} />
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
            rowExpansionTemplate={(e) => (
              <CommentDetailApp
                topic={e}
                toast={toast}
              />
            )}
            dataKey="id" paginator rows={10} 
            emptyMessage='No se encontraron Temas de Estudio Inactivos.'
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
            LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} de {totalRecords} Tópicos"
            resizableColumns columnResizeMode="expand"
            className="datatable-responsive"
            selectionMode='checkbox'
            // onPage={handleChangePage}
            onRowToggle={(e) => setExpandedRows(e.data)}
            onRowExpand={onRowExpand}
          >
            <Column 
              expander 
              style={{ width: '4em' }}
            ></Column>
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
          </DataTable>
        </div>
      </div>
    </div>
  )
});
