import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';

import { AdminDateTableApp } from '../AdminDateTableApp';
import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { ReplyListApp } from './ReplyListApp';
import { CommentButtonApp } from './CommentButtonApp';

import { 
  startLoadRepliesByComment, 
} from '../../../actions/admin/comment';


export const CommentTableApp = React.memo(({
  userId,
  userName,
  userType,
  toast
}) => {
  
  const dispatch = useDispatch();
  const { comments, loadingComment } = useSelector( 
    state => state.dashboard.comment 
  );
  const [globalFilter, setGlobalFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const dataTable = useRef(null);

  const handleSetGlobalFilter = useCallback(
    ( value ) => {
      setGlobalFilter( value );
    }, [],
  );

  const onRowExpand = (event) => {
    dispatch( startLoadRepliesByComment( event.data.id ));
  }

  const stateColumnTemplate = ( data ) => (
    <React.Fragment>
      <Badge
        value={
          data.state === true
            ? ('Activo')
            : ('Bloqueado')
        }
        className='ml-2' 
        severity={
          data.state === true 
            ? ('success')
            : ('danger')
        }
      ></Badge>
    </React.Fragment>
  );

  return (
    <DataTable
      ref={dataTable} 
      value={comments} 
      globalFilter={globalFilter}
      header={
        <OwnerHeaderApp
          title={'Comentarios Realizados'}
          icon={'fas fa-comments mr-2 icon-primary'}
          placeholder={'Buscar Comentarios...'}
          withActive={false}
          setGlobalFilter={handleSetGlobalFilter}
          handleNewData={() => {}}
        />
      }
      loading={loadingComment}
      expandedRows={expandedRows}
      rowExpansionTemplate={(e) => (
        <ReplyListApp
          userId={userId}
          userName={userName}
          userType={userType}
          commentId={e.id}
          commentState={e.state}
          toast={toast}
        />
      )}
      dataKey="id" paginator rows={10} 
      emptyMessage='No se encontraron Comentarios.'
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
      LastPageLink CurrentPageReport"
      currentPageReportTemplate="{first} - {last} de {totalRecords} Comentarios"
      resizableColumns columnResizeMode="expand"
      className="datatable-responsive"
      selectionMode='checkbox'
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
        field="state" 
        header="Estado" 
        body={(e) => stateColumnTemplate(e)} 
        sortable
      ></Column>
      <Column
        className='text-center'
        field='created_at' 
        header="Fecha de Creación"
        body={(e) => <AdminDateTableApp data={e} />} 
        sortable
      ></Column>
      {
        userType === 1 && (
          <Column
            className='text-center'
            body={(e) => 
              <CommentButtonApp 
                comment={e} 
                toast={toast} 
              />
            } 
          ></Column>
        )
      }
    </DataTable>
  )
});
