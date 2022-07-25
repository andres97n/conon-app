import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';

import { OwnerActionBodyApp } from './OwnerActionBodyApp';
import { OwnerHeaderApp } from './OwnerHeaderApp';
import { OwnerCreateDialogApp } from './OwnerCreateDialogApp';
import { OwnerDetailApp } from './OwnerDetailApp';

import { 
  startLoadAdminsList, 
  startRemoveAdmins 
} from '../../../actions/admin/admin';


export const OwnerScreen = () => {

  const dispatch = useDispatch();
  const { admins, loading } = useSelector( state => state.dashboard.admin );
  const dataTable = useRef(null);
  const toast = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [showNewAdmin, setShowNewAdmin] = useState(false);

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  const handleGetAdmins = useCallback(
    () => {
      dispatch( startLoadAdminsList() );
    }, [dispatch],
  );

  const handleSetShowNewAdmin = useCallback(
    ( value ) => {
      setShowNewAdmin(value);
    }, [],
  );

  const stateColumnTemplate = ( e ) => (
    <React.Fragment>
      <Badge
        value={
          e.is_active
            ? 'Activo'
            : 'Inactivo'
        }
        className='ml-3' 
        severity={
          e.is_active
            ? ("success")
            : ('danger')
        }
      ></Badge>
    </React.Fragment>
  );

  useEffect(() => {
    handleGetAdmins();
  
    return () => {
      startRemoveAdmins();
    }
  }, [handleGetAdmins]);
  
  return (
    <div className="p-grid">
      <Toast ref={toast} />
      <div className="p-col-12">
        <div className="card">
          <div className='p-col-12'>
            <DataTable
              ref={dataTable} 
              value={admins} 
              globalFilter={globalFilter}
              header={
                <OwnerHeaderApp
                  title={'Administradores'}
                  icon={'fas fa-user-lock mr-2 icon-primary'}
                  placeholder={'Buscar Admin...'}
                  withActive={true}
                  setGlobalFilter={handleSetGlobalFilter}
                  handleNewData={handleSetShowNewAdmin}
                />
              }
              loading={loading}
              expandedRows={expandedRows}
              rowExpansionTemplate={(e) => (
                <OwnerDetailApp
                  data={e}
                />
              )}
              dataKey="id" paginator rows={10} 
              emptyMessage='No se encontraron Administradores.'
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
              LastPageLink CurrentPageReport"
              currentPageReportTemplate="{first} - {last} de {totalRecords} Administradores"
              resizableColumns columnResizeMode="expand"
              className="datatable-responsive"
              onRowToggle={(e) => setExpandedRows(e.data)}
            >
              <Column expander style={{ width: '4em' }}/>
              <Column 
                className='text-center' 
                field="person.name" 
                header="Nombre" 
                sortable
              ></Column>
              <Column 
                className='text-center'
                field='email'
                header="Email" 
                sortable
              ></Column>
              <Column 
                className='text-center'
                field="username" 
                header="Nombre de Usuario" 
                sortable
                ></Column>
              <Column 
                className='text-center'
                field="active" 
                header="Estado" 
                sortable
                body={(e) => stateColumnTemplate(e)}
              ></Column>
              <Column body={(e) => (
                <OwnerActionBodyApp
                  admin={e}
                  toast={toast}
                />
              )}></Column>
            </DataTable>
          </div>
        </div>
      </div>
      <OwnerCreateDialogApp
        isShow={showNewAdmin}
        toast={toast}
        handleSetShow={handleSetShowNewAdmin}
      />
    </div>
  )
}
