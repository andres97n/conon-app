import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Badge } from 'primereact/badge';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { startBlockTopic, startDeleteTopic, startDeleteTopics, startLoadTopics, startRemoveTopics } from '../../../actions/admin/topic';
import { getSingleModelKeys } from '../../../helpers/admin';

export const TopicAbpScreen = () => {

    // TODO: Crear un componente general para los temas de estudio

    let emptyTopic = {
        id: null,
        title: '',
        description: '',
        objective: '',
        type: null,
        start_at: null,
        end_at: null,
        active: null,
        observations: '',
        owner: {
            id: null,
            name: null
        },
        created_at: null
    }

    const dispatch = useDispatch();
    const { topics, loading } = useSelector(state => state.dashboard.topic)
    const [ABPtopic, setABPTopic] = useState(emptyTopic);
    const [blockABPTopicDialog, setBlockABPTopicDialog] = useState(false);
    const [deleteABPTopicDialog, setDeleteABPTopicDialog] = useState(false);
    const [deleteABPTopicsDialog, setDeleteABPTopicsDialog] = useState(false);
    const [selectedABPTopics, setSelectedABPTopics] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const handleLoadABPTopics = useCallback( () => {
        dispatch( startLoadTopics( 2 ) );
    }, [dispatch]);

    const handleABPTopicBlock = () => {
        dispatch( startBlockTopic( 
            ABPtopic,
            ABPtopic.id,
            toast
         ));
        setBlockABPTopicDialog(false);
        setABPTopic(emptyTopic);
    }

    const handleABPTopicDelete = () => {
        // Process
        dispatch( startDeleteTopic( ABPtopic.id, toast));
        setDeleteABPTopicDialog(false);
        setABPTopic(emptyTopic);
    }

    const handleABPTopicsDelete = () => {
        dispatch( startDeleteTopics(
            getSingleModelKeys( selectedABPTopics ),
            toast
        ));
        setDeleteABPTopicsDialog(false);
        setSelectedABPTopics(null);
    }

    const confirmBlockABPTopic = ( topic ) => {
        setABPTopic( topic );
        setBlockABPTopicDialog(true);
    }

    const confirmDeleteABPTopic = ( topic ) => {
        setABPTopic( topic );
        setDeleteABPTopicDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteABPTopicsDialog(true);
    }

    const hideBlockABPTopicDialog = () => {
        setBlockABPTopicDialog(false);
    }

    const hideDeleteABPTopicDialog = () => {
        setDeleteABPTopicDialog(false);
    }
    
    const hideDeleteABPTopicsDialog = () => {
        setDeleteABPTopicsDialog(false);
    }

    const stateBodyTemplate = (rowData) => {
        return <Badge 
            value={rowData.active}
            className='ml-4' 
            severity={
                (rowData.active === 'Activo')
                    ? ("success")
                    : ('danger')
            }
        ></Badge>;
    }

    const dateBodyTemplate = (rowData) => {
        return <Badge 
            value={rowData.created_at}
            className='ml-3' 
            severity='info'
        ></Badge>;
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Eliminar Tema/s de Estudio" 
                    icon="fas fa-trash"  
                    className="p-button-danger" 
                    onClick={confirmDeleteSelected} 
                    disabled={!selectedABPTopics || !selectedABPTopics.length}
                />
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR TEMAS DE ESTUDIO</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Buscar..." 
                />
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
                                    <h6>Descripción</h6>
                                    {data.description}
                                </div>
                                <div>
                                    <h6>Objetivo</h6>
                                    {data.objective}
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
                    <Button 
                        icon="fas fa-ban" 
                        tooltip='Bloquear Tema'
                        tooltipOptions={{position:'bottom'}}
                        className="p-button-rounded p-button-secondary mr-2" 
                        onClick={() => confirmBlockABPTopic(rowData)} 
                    />
                    <Button 
                        icon="fas fa-trash-alt" 
                        className="p-button-rounded p-button-danger" 
                        tooltip='Eliminar Tema'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => confirmDeleteABPTopic(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const blockABPTopicDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideBlockABPTopicDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleABPTopicBlock} 
            />
        </React.Fragment>
    );

    const deleteABPTopicDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteABPTopicDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleABPTopicDelete} 
            />
        </React.Fragment>
    );

    const deleteABPTopicsDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteABPTopicsDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleABPTopicsDelete} 
            />
        </React.Fragment>
    );

    useEffect(() => {
        handleLoadABPTopics();
        return () => {
            dispatch( startRemoveTopics() );
        }
    }, [handleLoadABPTopics, dispatch]);

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>

                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate}>
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={topics} 
                        selection={selectedABPTopics} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Temas de Estudio.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Temas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedABPTopics(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        // onRowExpand={onRowExpand}
                        // onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="title" header="Título" sortable></Column>
                        <Column field="owner.name" header="Docente" sortable></Column>
                        <Column field="active" header="Estado del Tema" body={stateBodyTemplate} sortable></Column>
                        <Column 
                            field='created_at' 
                            header="Fecha de Creación" 
                            body={dateBodyTemplate} 
                            sortable
                        ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        visible={blockABPTopicDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Bloqueo" modal 
                        footer={blockABPTopicDialogFooter} 
                        onHide={hideBlockABPTopicDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {ABPtopic && <span>¿Está seguro que desea bloquear el siguiente tema de estudio: <b>{ABPtopic.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteABPTopicDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado" modal 
                        footer={deleteABPTopicDialogFooter} 
                        onHide={hideDeleteABPTopicDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {ABPtopic && <span>¿Está seguro que desea eliminar el siguiente tema de estudio: <b>{ABPtopic.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteABPTopicsDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado Múltiple" modal 
                        footer={deleteABPTopicsDialogFooter} 
                        onHide={hideDeleteABPTopicsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {ABPtopic && <span>¿Está seguro que desea eliminar los siguientes <b>{selectedABPTopics && selectedABPTopics.length}</b> temas seleccionadas?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
