import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';

import { getTeachersForArea } from '../../../helpers/school';
import { startUpdateAreaWithTeachers } from '../../../actions/admin/area';


export const AreaTeacherListApp = React.memo(({ 
  area,
  toast 
}) => {

  const dispatch = useDispatch();
  const { teachers, loading } = useSelector(
    state => state.dashboard.area
  );
  const [globalFilter, setGlobalFilter] = useState(null);
  const dataTable = useRef(null);

  const handleDenyTeacher = ( teacher ) => {
    const newArea = (({id, created_at, ...newArea}) => ({
      ...newArea,
      coordinator: area.coordinator.id,
      sub_coordinator: area.sub_coordinator.id,
      teachers: getTeachersForArea( teachers, teacher.id )
    }))(area);
    const extraInfo = {
      coordinator: area.coordinator,
      sub_coordinator: area.sub_coordinator
    };
    dispatch( startUpdateAreaWithTeachers( 
      area.id, newArea, teacher.id, extraInfo, toast 
    ) );
  }

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  const handleConfirmDenyTeacher = ( data ) => {
    confirmDialog({
      message: '¿Está seguro que desea denegar el siguiente Docente?',
      header: 'Confirmación de Denegado',
      icon: 'fas fa-exclamation-triangle',
      acceptLabel: 'Sí, denegar',
      rejectLabel: 'No denegar',
      acceptClassName: 'p-button-secondary',
      accept: () => handleDenyTeacher( data ),
    });
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="actions">
          <Button 
            icon="fas fa-ban"
            tooltip='Denegar Docente'
            tooltipOptions={{position: 'bottom'}}
            className="p-button-rounded p-button-secondary mr-2" 
            onClick={() => handleConfirmDenyTeacher(rowData)} 
          />
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className='grid p-fluid'>
      <div className='col-12'>
        <DataTable
          ref={dataTable} 
          value={teachers} 
          globalFilter={globalFilter}
          header={
            <OwnerHeaderApp
              title={`Docentes Asignados a ${area.name}`}
              icon={'fas fa-ban mr-2 icon-primary'}
              placeholder={'Buscar Docente...'}
              withActive={false}
              setGlobalFilter={handleSetGlobalFilter}
              handleNewData={() => {}}
            />
          }
          loading={loading}
          dataKey="id" paginator rows={10} 
          emptyMessage='No se encontraron Docentes.'
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
          LastPageLink CurrentPageReport"
          currentPageReportTemplate="{first} - {last} de {totalRecords} Docentes"
          resizableColumns columnResizeMode="expand"
          className="datatable-responsive"
          showGridlines
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
            header="Nombre" 
            sortable
          ></Column>
          <Column
            className='text-center'
            field="title" 
            header="Título" 
            sortable
          ></Column>
          <Column
            className='text-center'
            body={actionBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  )
});
