import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';

import { 
  startLoadNewTopicStudents, 
  startRemoveTopicStudents 
} from '../../../../../../../actions/admin/topic';


export const TopicAssignDuaStudent = React.memo(({
  topic,
  selectedStudents,
  setSelectedStudents,
  handleSetShowBackMessage,
  handleSetBackMessage,
  handleSaveStudentsToTopic,
  handleHideAssignDialog
}) => {

  const dispatch = useDispatch();
  const { students, loading } = useSelector(state => state.dashboard.topic);
  const [globalFilter, setGlobalFilter] = useState(null);
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

  const handleSaveStudents = () => {
    handleSaveStudentsToTopic( selectedStudents );
    handleHideAssignDialog();
    handleSetShowBackMessage( true );
    handleSetBackMessage( 
      'Está seguro que desea regresar a pesar que no ha realizado una actividad para el estudiante.' 
    );
  }

  const handleConfirmSaveStudent = () => {
    confirmDialog({
      message: 'Está seguro que desea asignar los siguientes estudiantes??',
      header: 'Confirmación de Guardado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, guardar',
      rejectLabel: 'No guardar',
      accept: () => handleSaveStudents(),
    });
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Seleccionar Estudiantes</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="fas fa-search" />
        <InputText
          type="search" 
          onInput={(e) => setGlobalFilter(e.target.value)} 
          placeholder="Buscar Estudiante..." 
        />
      </span>
    </div>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Seleccionar Estudiantes" 
          icon="fas fa-plus"  
          className="p-button-primary" 
          disabled={selectedStudents.length === 0}
          onClick={handleConfirmSaveStudent} 
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
              header={header}
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
          </div>
        </div>
      </div>
    </div>
  )
});
