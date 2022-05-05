import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { startBlockAsignatureDetail } from '../../../actions/admin/asignature';

export const AssignAsignatureDetailTable = React.memo(({
    asignature,
    toast
}) => {

    const dispatch = useDispatch();
    const { asignatures_detail, loading } = useSelector(state => state.dashboard.asignature);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [asignatureDetail, setAsignatureDetail] = useState(null);
    const [deleteAsignatureDetailDialog, setDeleteAsignatureDetailDialog] = useState(false);
    const dataTable = useRef(null);

    const handleBlockAsignatureDetail = () => {
        dispatch( startBlockAsignatureDetail( asignatureDetail.id, toast ) );
        setDeleteAsignatureDetailDialog(false);
        setAsignatureDetail(null);
    }

    const confirmDeleteAsignatureDetail = ( asignature_detail ) => {
        setAsignatureDetail( asignature_detail );
        setDeleteAsignatureDetailDialog(true);
    }

    const hideDeleteAsignatureDetailDialog = () => {
        setDeleteAsignatureDetailDialog(false);
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Desasignar Aulas y Docentes</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    <Button
                        icon="fas fa-ban" 
                        className="p-button-rounded p-button-secondary" 
                        tooltip='Bloquear Asignación'
                        tooltipOptions={{position: 'bottom'}}
                        onClick={() => confirmDeleteAsignatureDetail(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const deleteAsignatureDetailDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteAsignatureDetailDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleBlockAsignatureDetail} 
            />
        </React.Fragment>
    );

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">

                <DataTable
                    ref={dataTable} 
                    value={asignatures_detail} 
                    selection={asignatureDetail}
                    selectionMode='single' 
                    globalFilter={globalFilter}
                    header={header}
                    loading={loading}
                    dataKey="id" paginator rows={10} 
                    emptyMessage='No existen Registros.'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} de {totalRecords} registros"
                    resizableColumns 
                    columnResizeMode="expand"
                    className="datatable-responsive"
                    onSelectionChange={(e) => setAsignatureDetail(e.value)}
                    // expandedRows={expandedRows}
                    // rowExpansionTemplate={rowExpansionTemplate}
                    // onRowToggle={(e) => setExpandedRows(e.data)}
                >
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="classroom.name" header="Aula" sortable></Column>
                    <Column field="teacher.name" header="Docente" sortable></Column>
                    <Column field="created_at" header="Fecha de Asignación" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>

                <Dialog
                    visible={deleteAsignatureDetailDialog} 
                    style={{ width: '450px' }} 
                    header="Confirmar" modal 
                    footer={deleteAsignatureDetailDialogFooter} 
                    onHide={hideDeleteAsignatureDetailDialog}
                >
                    <div 
                        className="flex align-items-center justify-content-center"
                    >
                        <i 
                            className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                        />
                            {asignatureDetail && <span>¿Está seguro que desea eliminar el siguiente registro asignado a: <b>{asignature.name}</b>?</span>}
                    </div>
                </Dialog>

            </div>
        </div>
    )
})
