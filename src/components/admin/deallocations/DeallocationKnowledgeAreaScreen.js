import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Message } from 'primereact/message';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { AdminDateTableApp } from '../AdminDateTableApp';
import { AreaTeacherListApp } from './AreaTeacherListApp';

import { 
  startLoadAreas, 
  startLoadTeachersByArea, 
  startRemoveAreas, 
  startRemoveTeachersByArea 
} from '../../../actions/admin/area';


export const DeallocationKnowledgeAreaScreen = () => {
  
  const dispatch = useDispatch();
  const { areas, loading } = useSelector(
    state => state.dashboard.area
  );
  const [globalFilter, setGlobalFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const dataTable = useRef(null);
  const toast = useRef(null);
  const schoolPeriod = localStorage.getItem('currentPeriodId');

  const handleLoadAreas = useCallback( () => {
    dispatch( startLoadAreas() );
  }, [dispatch]);

  const handleRemoveAreas = useCallback(
    () => {
      dispatch( startRemoveAreas() );
    }, [dispatch],
  );

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  const onRowExpand = (event) => {
    dispatch( startLoadTeachersByArea( event.data.id ) );
  }

  const onRowCollapse = () => {
    dispatch( startRemoveTeachersByArea() );
  }

  useEffect(() => {
    handleLoadAreas();
    return () => {
      handleRemoveAreas();
    }
  }, [handleLoadAreas, handleRemoveAreas]);

  if (!schoolPeriod) {
    return (
      <div className='grid p-fluid'>
        <div className='col-12'>
          <Message 
            severity="warn" 
            text="No se puede acceder si no está creado un Período Lectivo." 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-grid">
      <Toast ref={toast} />
      <div className="p-col-12">
        <div className="card">
          <div className='p-col-12'>
            <DataTable
              ref={dataTable} 
              value={areas} 
              globalFilter={globalFilter}
              header={
                <OwnerHeaderApp
                  title={'Denegaciones - Áreas de Conocimiento'}
                  icon={'fas fa-ban mr-2 icon-primary'}
                  placeholder={'Buscar Área...'}
                  withActive={false}
                  setGlobalFilter={handleSetGlobalFilter}
                  handleNewData={() => {}}
                />
              }
              loading={loading}
              expandedRows={expandedRows}
              rowExpansionTemplate={(e) => (
                <AreaTeacherListApp
                  area={e}
                  toast={toast}
                />
              )}
              dataKey="id" paginator rows={10} 
              emptyMessage='No se encontraron Áreas.'
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
              LastPageLink CurrentPageReport"
              currentPageReportTemplate="{first} - {last} de {totalRecords} Áreas"
              resizableColumns columnResizeMode="expand"
              className="datatable-responsive"
              onRowToggle={(e) => setExpandedRows(e.data)}
              onRowExpand={onRowExpand}
              onRowCollapse={onRowCollapse}
            >
              <Column 
                expander 
                style={{ width: '4em' }}
              />
              <Column
                className='text-center'
                field="name" 
                header="Nombre" 
                sortable
              ></Column>
              <Column
                className='text-center'
                field="coordinator.name" 
                header="Coordinador" 
                sortable
              ></Column>
              <Column 
                className='text-center'
                field="sub_coordinator.name" 
                header="Subcoordinador" 
                sortable
              ></Column>
              <Column
                className='text-center'
                field='created_at' 
                header="Fecha de Creación" 
                sortable
                body={(e) => <AdminDateTableApp data={e} />} 
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  )
}
