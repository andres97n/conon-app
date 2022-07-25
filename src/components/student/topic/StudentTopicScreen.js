import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column';

import { 
  TeacherTopicTableHeaderApp 
} from '../../teacher/topic/TeacherTopicTableHeaderApp';
import { 
  TeacherTopicColumnApp 
} from '../../teacher/topic/TeacherTopicColumnApp';
import { EmptyContentScreen } from '../../ui/EmptyContentScreen';
import { StudentTopicDetailApp } from './StudentTopicDetailApp';

import { 
  startLoadInactiveTopicsByStudent, 
  startRemoveTopics 
} from '../../../actions/admin/topic';
import { startLoadStudentEvaluation } from '../../../actions/teacher/dua';
import { startLoadStudentEvaluationAbp } from '../../../actions/teacher/abp';
import { startLoadStudentEvaluationAc } from '../../../actions/teacher/ac';


export const StudentTopicScreen = () => {

  const dispatch = useDispatch();
  const { topics, loading } = useSelector(state => state.dashboard.topic);  
  const [globalFilter, setGlobalFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const dataTable = useRef(null);
  const schoolPeriodId = localStorage.getItem('currentPeriodId');

  const handleLoadTopics = useCallback(
    ( schoolPeriodId ) => {
      dispatch( startLoadInactiveTopicsByStudent( schoolPeriodId ));
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

  const onRowExpand = (topic) => {
    if (topic.type === 1) {
      dispatch( startLoadStudentEvaluation( topic.id ));
    } else if (topic.type === 2) {
      dispatch( startLoadStudentEvaluationAbp( topic.id ))
    } else if (topic.type === 3) {
      dispatch( startLoadStudentEvaluationAc( topic.id ));
    }
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

  if (!schoolPeriodId) {
    return (
      <div className='grid p-fluid'>
        <EmptyContentScreen />
      </div>
    );
  }

  return (
    <div className='p-grid crud-demo'>
      <div className='p-col-12'>
        <div className='card'>
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
            rowExpansionTemplate={ (e) => (
              <StudentTopicDetailApp
                topic={e}
              />
            )}
            selectionMode='single'
            dataKey="id" paginator rows={10} 
            emptyMessage='No se encontraron Temas de Estudio Finalizados.'
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
            LastPageLink CurrentPageReport"
            currentPageReportTemplate="{first} - {last} de {totalRecords} Tópicos"
            resizableColumns columnResizeMode="expand"
            className="datatable-responsive"
            onRowToggle={(e) => setExpandedRows(e.data)}
            onRowExpand={(e) => onRowExpand(e.data)}
          >
            <Column 
              expander 
              style={{ width: '4em' }}
            />
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
}
