import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startBlockTopic, startDeleteTopic, startDeleteTopics, startLoadTopics, startRemoveTopics } from '../../../actions/admin/topic';
import { getSingleModelKeys } from '../../../helpers/admin';

export const TopicAcScreen = () => {

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
    const [ACtopic, setACTopic] = useState(emptyTopic);
    const [blockACTopicDialog, setBlockACTopicDialog] = useState(false);
    const [deleteACTopicDialog, setDeleteACTopicDialog] = useState(false);
    const [deleteACTopicsDialog, setDeleteACTopicsDialog] = useState(false);
    const [selectedACTopics, setSelectedACTopics] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const handleLoadACTopics = useCallback( () => {
        dispatch( startLoadTopics( 3 ) );
    }, [dispatch]);

    const handleACTopicBlock = () => {
        dispatch( startBlockTopic( 
            ACtopic,
            ACtopic.id,
            toast
         ));
        setBlockACTopicDialog(false);
        setACTopic(emptyTopic);
    }

    const handleACTopicDelete = () => {
        // Process
        dispatch( startDeleteTopic( ACtopic.id, toast));
        setDeleteACTopicDialog(false);
        setACTopic(emptyTopic);
    }

    const handleACTopicsDelete = () => {
        dispatch( startDeleteTopics(
            getSingleModelKeys( selectedACTopics ),
            toast
        ));
        setDeleteACTopicsDialog(false);
        setSelectedACTopics(null);
    }

    const confirmBlockACTopic = ( topic ) => {
        setACTopic( topic );
        setBlockACTopicDialog(true);
    }

    const confirmDeleteACTopic = ( topic ) => {
        setACTopic( topic );
        setDeleteACTopicDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteACTopicsDialog(true);
    }

    const hideBlockACTopicDialog = () => {
        setBlockACTopicDialog(false);
    }

    const hideDeleteACTopicDialog = () => {
        setDeleteACTopicDialog(false);
    }
    
    const hideDeleteACTopicsDialog = () => {
        setDeleteACTopicsDialog(false);
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
                    disabled={!selectedACTopics || !selectedACTopics.length}
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
                        onClick={() => confirmBlockACTopic(rowData)} 
                    />
                    <Button 
                        icon="fas fa-trash-alt" 
                        className="p-button-rounded p-button-danger" 
                        tooltip='Eliminar Tema'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => confirmDeleteACTopic(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const blockACTopicDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideBlockACTopicDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleACTopicBlock} 
            />
        </React.Fragment>
    );

    const deleteACTopicDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteACTopicDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleACTopicDelete} 
            />
        </React.Fragment>
    );

    const deleteACTopicsDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteACTopicsDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleACTopicsDelete} 
            />
        </React.Fragment>
    );

    useEffect(() => {
        handleLoadACTopics();
        return () => {
            dispatch( startRemoveTopics() );
        }
    }, [handleLoadACTopics, dispatch]);

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
                        selection={selectedACTopics} 
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
                        onSelectionChange={(e) => setSelectedACTopics(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
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
                        visible={blockACTopicDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Bloqueo" modal 
                        footer={blockACTopicDialogFooter} 
                        onHide={hideBlockACTopicDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {ACtopic && <span>¿Está seguro que desea bloquear el siguiente tema de estudio: <b>{ACtopic.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteACTopicDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado" modal 
                        footer={deleteACTopicDialogFooter} 
                        onHide={hideDeleteACTopicDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {ACtopic && <span>¿Está seguro que desea eliminar el siguiente tema de estudio: <b>{ACtopic.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteACTopicsDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado Múltiple" modal 
                        footer={deleteACTopicsDialogFooter} 
                        onHide={hideDeleteACTopicsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {ACtopic && <span>¿Está seguro que desea eliminar los siguientes <b>{selectedACTopics && selectedACTopics.length}</b> temas seleccionadas?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
