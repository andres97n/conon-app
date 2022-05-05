import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { TopicAssignStudentHeaderTable } from './TopicAssignStudentHeaderTable';
import { TopicAssignAcRoleGroupApp } from './TopicAssignAcRoleGroupApp';

import { 
  startLoadNewTopicStudents, 
  startRemoveTopicStudents 
} from '../../../../../../../actions/admin/topic';


export const TopicAssignAcStudentApp = React.memo(({
  topic,
  selectedStudents,
  toast,
  setSelectedStudents,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleSaveStudentsToTopic,
  handleHideAssignDialog
}) => {
  
  const dispatch = useDispatch();
  const { students, loading } = useSelector(state => state.dashboard.topic);
  const { currentAc } = useSelector(state => state.dashboard.ac);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [showConfirmModeratorDialog, setShowConfirmModeratorDialog] = useState(false);
  const [moderatorSwitch, setModeratorSwitch] = useState([]);
  const dataTable = useRef(null);

  const handleLoadStudentsForTopic = useCallback(
    ( topic ) => {
      dispatch( startLoadNewTopicStudents( topic.id, topic.classroom ) )
    }, [dispatch],
  );

  const handleRemoveStudentsForTopic = useCallback(
    () => {
      dispatch( startRemoveTopicStudents() );
    }, [dispatch],
  );

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  const handleSetShowConfirmModeratorDialog = useCallback(
    ( value ) => {
      setShowConfirmModeratorDialog( value );
    }, [],
  );

  const handleSetModeratorSwitch = useCallback(
    ( value ) => {
      setModeratorSwitch( value );
    }, [],
  );

  const handleShowConfirmModeratorDialog = () => {
    setShowConfirmModeratorDialog(true);
    selectedStudents.length > 0 && selectedStudents.forEach( student => {
      setModeratorSwitch(oldState => ([
        ...oldState,
        {
          id: student.user,
          studentSwitch: ''
        }
      ]));
    });
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Seleccionar Estudiantes" 
          icon="fas fa-plus"
          tooltip='Grupo de máximo 4 estudiantes'
          tooltipOptions={{position: 'bottom'}}
          className="p-button-primary" 
          disabled={selectedStudents.length < 2 || selectedStudents.length > 4}
          onClick={handleShowConfirmModeratorDialog} 
        />
      </React.Fragment>
    );
  }

  useEffect(() => {
    if (topic) {
      handleLoadStudentsForTopic( topic );      
    }
    return () => {
      if (topic) {
        handleRemoveStudentsForTopic();
      }
    }
  }, [topic, handleLoadStudentsForTopic, handleRemoveStudentsForTopic]);  

  return (
    <div className='p-grid crud-demo'>
      <div className='p-col-12'>
        <div className='grid p-fluid'>
          <div className='col-12'>
            <Toolbar
              className="mb-4" 
              left={leftToolbarTemplate}
            ></Toolbar>
          </div>
          <div className='col-12'>
            <DataTable
              ref={dataTable} 
              value={students} 
              selection={selectedStudents} 
              globalFilter={globalFilter}
              header={
                <TopicAssignStudentHeaderTable 
                  setGlobalFilter={handleSetGlobalFilter} 
                />
              }
              loading={loading}
              dataKey="id" paginator rows={10} 
              emptyMessage='No existen Estudiantes para Agregar.'
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
              currentPageReportTemplate="{first} - {last} de {totalRecords} estudiantes"
              resizableColumns 
              columnResizeMode="expand"
              className="datatable-responsive"
              onSelectionChange={(e) => setSelectedStudents(e.value)}
            >
              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
              <Column field="identification" header="Identificación" sortable></Column>
              <Column field="name" header="Nombres" sortable></Column>
              <Column field="email" header="Correo" sortable></Column>
            </DataTable>
            <TopicAssignAcRoleGroupApp
              currentAc={currentAc}
              moderatorSwitch={moderatorSwitch}
              selectedStudents={selectedStudents}
              toast={toast}
              showConfirmModeratorDialog={showConfirmModeratorDialog}
              setShowConfirmModeratorDialog={handleSetShowConfirmModeratorDialog}
              setModeratorSwitch={handleSetModeratorSwitch}
              handleSetShowBackMessage={handleSetShowBackMessage}
              handleSetBackMessage={handleSetBackMessage}
              handleSaveStudentsToTopic={handleSaveStudentsToTopic}
              handleHideAssignDialog={handleHideAssignDialog}
            />
          </div>
        </div>
      </div>
    </div>
  )
});
