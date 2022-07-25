import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';
import { AdminDateTableApp } from '../AdminDateTableApp';

import { startBlockAsignatureDetail } from '../../../actions/admin/asignature';


export const AssignAsignatureDetailTable = React.memo(({
    toast
}) => {

    const dispatch = useDispatch();
    const { asignatures_detail, loading } = useSelector(
        state => state.dashboard.asignature
        );
    const [globalFilter, setGlobalFilter] = useState(null);
    const dataTable = useRef(null);

    const handleBlockAsignatureDetail = ( data ) => {
        dispatch( startBlockAsignatureDetail( data.id, toast ) );
    }

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const handleConfirmBlockPeriodScreen = ( data ) => {
        confirmDialog({
          message: '¿Está seguro de denegar el siguiente registro?',
          header: 'Confirmación de Denegación',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, denegar',
          rejectLabel: 'No denegar',
          acceptClassName: 'p-button-secondary',
          accept: () => handleBlockAsignatureDetail( data ),
        });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button
                        icon="fas fa-ban" 
                        className="p-button-rounded p-button-secondary" 
                        tooltip='Denegar Registro'
                        tooltipOptions={{position: 'bottom'}}
                        onClick={() => handleConfirmBlockPeriodScreen(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <DataTable
                    ref={dataTable} 
                    value={asignatures_detail} 
                    selectionMode='single' 
                    globalFilter={globalFilter}
                    header={
                        <OwnerHeaderApp
                          title={'Denegar - Asignaturas'}
                          icon={'fas fa-ban mr-2 icon-primary'}
                          placeholder={'Buscar...'}
                          withActive={false}
                          setGlobalFilter={handleSetGlobalFilter}
                          handleNewData={() => {}}
                        />
                    }
                    loading={loading}
                    dataKey="id" paginator rows={10} 
                    emptyMessage='No existen Registros.'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                    LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} de {totalRecords} registros"
                    resizableColumns 
                    columnResizeMode="expand"
                    showGridlines
                    className="datatable-responsive"
                >
                    <Column 
                        className='text-center'
                        field="classroom.name" 
                        header="Aula" 
                        sortable
                    ></Column>
                    <Column 
                        className='text-center'
                        field="teacher.name" 
                        header="Docente" 
                        sortable
                    ></Column>
                    <Column 
                        className='text-center'
                        field="created_at" 
                        header="Fecha de Asignación" 
                        body={(e) => <AdminDateTableApp data={e} />}
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
})
