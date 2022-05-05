import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import { startDeleteGlossariesDetail, startDeleteGlossaryDetail, startGlossaryDetailUpdate } from '../../../actions/admin/glossary';
import { getSingleModelKeys } from '../../../helpers/admin';

export const GlossaryDetailTable = React.memo(({
    glossary,
    toast
}) => {

    let emptyGlossaryDetail = {
        id: null,
        title: '',
        description: '',
        image: null,
        url: null,
        state: 0,
        observation: '',
        created_at: null,
        updated_at: null
    }

    const dispatch = useDispatch();
    const { glossaries_detail, loading } = useSelector(state => state.dashboard.glossary)
    const [glossaryDetail, setGlossaryDetail] = useState(emptyGlossaryDetail);
    const [activeGlossaryDetailDialog, setActiveGlossaryDetailDialog] = useState(false);
    const [blockGlossaryDetailDialog, setBlockGlossaryDetailDialog] = useState(false);
    const [deleteGlossaryDetailDialog, setDeleteGlossaryDetailDialog] = useState(false);
    const [deleteGlossariesDetailDialog, setDeleteGlossariesDetailDialog] = useState(false);
    const [selectedGlossariesDetail, setSelectedGlossariesDetail] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const dataTable = useRef(null);

    const handleGlossaryDetailActive = () => {
        glossaryDetail.state = 1;
        dispatch( startGlossaryDetailUpdate( 
            glossary.id,
            glossaryDetail,
            glossaryDetail.id,
            toast
         ));
        setActiveGlossaryDetailDialog(false);
        setGlossaryDetail(emptyGlossaryDetail);
    }

    const handleGlossaryDetailBlock = () => {
        glossaryDetail.state = 0;
        dispatch( startGlossaryDetailUpdate( 
            glossary.id,
            glossaryDetail,
            glossaryDetail.id,
            toast
         ));
        setBlockGlossaryDetailDialog(false);
        setGlossaryDetail(emptyGlossaryDetail);
    }

    const handleGlossaryDetailDelete = () => {
        // Process
        dispatch( startDeleteGlossaryDetail( glossaryDetail.id, toast));
        setDeleteGlossaryDetailDialog(false);
        setGlossaryDetail(emptyGlossaryDetail);
    }

    const handleGlosariesDetailDelete = () => {
        dispatch( startDeleteGlossariesDetail(
            getSingleModelKeys( selectedGlossariesDetail ),
            toast
        ));
        setDeleteGlossariesDetailDialog(false);
        setSelectedGlossariesDetail(null);
    }

    const confirmActiveGlossaryDetail = ( glossary_detail ) => {
        setGlossaryDetail( glossary_detail );
        setActiveGlossaryDetailDialog(true);
    }

    const confirmBlockGlossaryDetail = ( glossary_detail ) => {
        if ( glossary_detail.state === 'Abierto' ) {
            setGlossaryDetail( glossary_detail );
            setBlockGlossaryDetailDialog(true);
        } else {
            toast.current.show({ 
                severity: 'warn', 
                summary: 'Conon Informa', 
                detail: 'El presente Término ya está bloqueado.', 
                life: 6000 
            });
        }
    }

    const confirmDeleteGlossaryDetail = ( glossary_detail ) => {
        setGlossaryDetail( glossary_detail );
        setDeleteGlossaryDetailDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteGlossariesDetailDialog(true);
    }

    const hideActiveGlossaryDetailDialog = () => {
        setActiveGlossaryDetailDialog(false);
    }

    const hideBlockGlossaryDetailDialog = () => {
        setBlockGlossaryDetailDialog(false);
    }

    const hideDeleteGlossaryDetailDialog = () => {
        setDeleteGlossaryDetailDialog(false);
    }

    const hideDeleteGlossariesDetailDialog = () => {
        setDeleteGlossariesDetailDialog(false);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Eliminar Término/s" 
                    icon="fas fa-trash"  
                    className="p-button-danger" 
                    onClick={confirmDeleteSelected} 
                    disabled={!selectedGlossariesDetail || !selectedGlossariesDetail.length}
                />
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR TÉRMINOS</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText 
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Buscar Términos..." />
            </span>
        </div>
    );

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>Detalle de {data.title}</h5>
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className='card'>
                            <div className="p-d-flex p-flex-wrap">
                                <div className="p-mr-2 p-mb-2">
                                    <h6>Título</h6>
                                    {data.title}
                                </div>
                                <div className='p-mr-2 p-mb-2'>
                                    <h6>Description</h6>
                                    {data.description}
                                </div>
                                <div>
                                    <h6>Imagen</h6>
                                    {data.image}
                                </div>
                                <div>
                                    <h6>Observaciones</h6>
                                    {data.observation}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    {
                        (rowData.state === 'Abierto')
                            ? (
                                <Button 
                                    icon="fas fa-ban" 
                                    tooltip='Bloquear Término'
                                    tooltipOptions={{position:'bottom'}}
                                    className="p-button-rounded p-button-secondary mr-2" 
                                    onClick={() => confirmBlockGlossaryDetail(rowData)} 
                                />
                              )
                            : (
                                <Button 
                                    icon="fas fa-hand-point-up" 
                                    tooltip='Activar Término'
                                    tooltipOptions={{position:'bottom'}}
                                    className="p-button-rounded p-button-success mr-2" 
                                    onClick={() => confirmActiveGlossaryDetail(rowData)} 
                                />
                            )
                    }
                    <Button 
                        icon="fas fa-trash-alt" 
                        className="p-button-rounded p-button-danger" 
                        tooltip='Eliminar Término'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => confirmDeleteGlossaryDetail(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    //TODO: Agilizar el footer de bloqueo y eliminado para que sean el mismo componente

    const activeGlossaryDetailDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-secondary" 
                onClick={hideActiveGlossaryDetailDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-success" 
                onClick={handleGlossaryDetailActive} 
            />
        </React.Fragment>
    );
    
    const blockGlossaryDetailDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideBlockGlossaryDetailDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-secondary" 
                onClick={handleGlossaryDetailBlock} 
            />
        </React.Fragment>
    );

    const deleteGlossaryDetailDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteGlossaryDetailDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleGlossaryDetailDelete} 
            />
        </React.Fragment>
    );

    const deleteGlossariesDetailDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteGlossariesDetailDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleGlosariesDetailDelete} 
            />
        </React.Fragment>
    );

    const stateBodyTemplate = (rowData) => {
        return <Badge
            value={rowData.state}
            className='ml-2' 
            severity={
                (rowData.state === 'Abierto')
                    ? ('success')
                    : ('danger')
            }
        ></Badge>;
    }

    const dateBodyTemplate = (rowData) => {
        return <Badge
            value={rowData.created_at} 
            severity='info'
        ></Badge>;
    }

    const updateDateBodyTemplate = (rowData) => {
        return <Badge 
            value={rowData.updated_at} 
            severity='warning'
        ></Badge>;
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">

                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={glossaries_detail} 
                        selection={selectedGlossariesDetail} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No se encontraron registros.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Términos"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedGlossariesDetail(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        // onRowExpand={onRowExpand}
                        // onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="title" header="Título" sortable></Column>
                        <Column 
                            field="state" 
                            header="Estado"
                             body={stateBodyTemplate}
                            sortable
                        ></Column>
                        <Column 
                            field='created_at' 
                            header="Fecha de Creación"
                            body={dateBodyTemplate} 
                            sortable
                        ></Column>
                        <Column 
                            field="updated_at" 
                            header="Fecha de Actualizacíon"
                            body={updateDateBodyTemplate} 
                            sortable
                        ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        visible={activeGlossaryDetailDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Activado" modal 
                        footer={activeGlossaryDetailDialogFooter} 
                        onHide={hideActiveGlossaryDetailDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {glossaryDetail && <span>¿Está seguro que desea activar el siguiente término: <b>{glossaryDetail.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={blockGlossaryDetailDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Bloqueo" modal 
                        footer={blockGlossaryDetailDialogFooter} 
                        onHide={hideActiveGlossaryDetailDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {glossaryDetail && <span>¿Está seguro que desea bloquear el siguiente término: <b>{glossaryDetail.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteGlossaryDetailDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado" modal 
                        footer={deleteGlossaryDetailDialogFooter} 
                        onHide={hideDeleteGlossaryDetailDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {glossaryDetail && 
                                <span>¿Está seguro que desea eliminar el siguiente término: <b>{glossaryDetail.title}</b>??</span>}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteGlossariesDetailDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmar" modal 
                        footer={deleteGlossariesDetailDialogFooter} 
                        onHide={hideDeleteGlossariesDetailDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {glossaryDetail && <span>¿Está seguro que desea eliminar los siguientes <b>{selectedGlossariesDetail && selectedGlossariesDetail.length}</b> términos seleccionados?</span>}
                        </div>
                    </Dialog>

            </div>
        </div>
    )
})
