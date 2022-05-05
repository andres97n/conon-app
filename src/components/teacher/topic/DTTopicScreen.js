import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Badge } from 'primereact/badge';
import { Message } from 'primereact/message';

import { startBlockTopic, startDeleteTopic, startDeleteTopics, startLoadNewStudentsForTopics, startLoadStudentsByTopic, startLoadTopicsByOwner, startRemoveTopics, startRemoveTopicStudents } from '../../../actions/admin/topic';
import { getSingleModelKeys } from '../../../helpers/admin';
import { changeObjectDate } from '../../../helpers/abp-steps';

export const DTTopicScreen = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);
  const schoolPeriodId = localStorage.getItem('currentPeriodId');
  const { topics, loading } = useSelector(state => state.dashboard.topic);
  const [topicUpdate, setTopicUpdate] = useState(null);   
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const toast = useRef(null);
  const dataTable = useRef(null);

    const handleLoadTopics = useCallback( () => {
        dispatch( startLoadTopicsByOwner() );
    }, [dispatch] );

    const handleTopicBlock = ( topic ) => {
        dispatch( startBlockTopic( 
            topic,
            topic.id,
            toast
         ));
    }

    const handleTopicDelete = ( topic ) => {
        dispatch( startDeleteTopic( topic.id, toast));
    }

    const handleTopicsDelete = ( selectedTopics ) => {
        dispatch( startDeleteTopics(
            getSingleModelKeys( selectedTopics ),
            toast
        ));
        setSelectedTopics([]);
    }

    const handleConfirmBlockTopic = ( topic ) => {
        confirmDialog({
          message: (
            <p>¿Está seguro que desea bloquear el siguiente Tópico: <b>{topic.title}</b>?</p>
          ),
          header: 'Panel de Confirmación',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, bloquear',
          rejectLabel: 'No bloquear',
          acceptClassName: 'p-button-raised p-button-secondary',
          accept: () => handleTopicBlock( topic )
        });
    }

    const handleConfirmDeleteTopic = ( topic ) => {
        confirmDialog({
          message: (
            <p>¿Está seguro que desea eliminar el siguiente Tópico: <b>{topic.title}</b>?</p>
          ),
          header: 'Panel de Confirmación',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-raised p-button-danger',
          accept: () => handleTopicDelete( topic )
        });
    }

    const handleConfirmDeleteTopics = ( selectedTopics ) => {
        confirmDialog({
          message: (
            <span>¿Está seguro que desea eliminar los siguientes 
                <b> {selectedTopics.length}</b> temas seleccionadas?
            </span>
          ),
          header: 'Panel de Confirmación',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-raised p-button-danger',
          accept: () => handleTopicsDelete( selectedTopics )
        });
    }

    const openUpdate = ( topic ) => {
        setTopicUpdate(topic);
        setShowUpdate(true);
    }

    const hideUpdateTopicDialog = useCallback(
      () => {
        setShowUpdate( false );
      }, [],
    );

    const onRowExpand = (event) => {
        if ( event.data.active ) {
            dispatch( startLoadNewStudentsForTopics( event.data.id, 15) );
        } else {
            dispatch( startLoadStudentsByTopic( event.data.id ) )
        }
    }

    const onRowCollapse = () => {
        dispatch( startRemoveTopicStudents() );
    }

    const stateBodyTemplate = (rowData) => {
        return (
            <div className='grid p-fluid'>
                <div className='col-12'>
                    {/* <div className='center-inside'> */}
                        <Badge 
                            value={
                                rowData.active
                                    ? 'Activo'
                                    : 'Inactivo'
                            }
                            className='ml-3' 
                            severity={
                                rowData.active
                                    ? ("success")
                                    : ('danger')
                            }
                        ></Badge>
                    {/* </div> */}
                </div>
            </div>
        )
    }

    const typeBodyTemplate = ( rowData ) => (
        // <div className='grid p-fluid'>
        //         <div className='col-12'>
                    <div className='center-inside'>
                        <Badge 
                            value={
                                rowData.type === 1
                                    ? 'DUA'
                                    : rowData.type === 2
                                        ? 'ABP'
                                        : rowData.type === 3 &&
                                            'AC'
                            }
                            className='ml-3' 
                            severity="primary"
                        ></Badge>
                    </div>
    );

    const dateBodyTemplate = (rowData) => {
        return (
            <div className='center-inside'>
                <Badge
                    value={changeObjectDate(rowData.created_at)}
                    className='ml-2' 
                    severity='info'
                ></Badge>

            </div>
        )
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Eliminar Tema/s de Estudio" 
                    icon="fas fa-trash"  
                    className="p-button-danger"
                    disabled={selectedTopics.length < 2}
                    onClick={() => handleConfirmDeleteTopics( selectedTopics )} 
                />
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Temas de Estudio de {name}</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText 
                    type="search" 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                    placeholder="Buscar Tema..." 
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
                            {/* <div className="p-d-flex p-flex-wrap">
                                <DTTopicDetailTable 
                                    topic = {data}
                                    toast = {toast}
                                />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='grid p-fluid'>
                    <div className='col-12'>
                        <div className='center-inside'>
                        {
                            rowData.active && (
                                <>
                                    <Button 
                                        icon="fas fa-eye" 
                                        tooltip='Visualizar Tema'
                                        tooltipOptions={{position:'bottom'}}
                                        className="p-button-rounded p-button-success mr-2" 
                                        // onClick={() => openUpdate(rowData)} 
                                    />
                                    <Button 
                                        icon="fas fa-pen" 
                                        tooltip='Editar Tema'
                                        tooltipOptions={{position:'bottom'}}
                                        className="p-button-rounded p-button-warning mr-2" 
                                        onClick={() => openUpdate(rowData)} 
                                    />
                                    <Button 
                                        icon="fas fa-ban" 
                                        tooltip='Bloquear Tema'
                                        tooltipOptions={{position:'bottom'}}
                                        className="p-button-rounded p-button-secondary mr-2" 
                                        onClick={() => handleConfirmBlockTopic(rowData)} 
                                    />
                                </>
                            )
                        }
                        
                        <Button 
                            icon="fas fa-trash-alt" 
                            className="p-button-rounded p-button-danger" 
                            tooltip='Eliminar Tema'
                            tooltipOptions={{position:'bottom'}}
                            onClick={() => handleConfirmDeleteTopic( rowData )} 
                        />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    useEffect(() => {
        handleLoadTopics(); 
        return () => {
            dispatch( startRemoveTopics() );
            dispatch( startRemoveTopicStudents() );
        }
    }, [handleLoadTopics, dispatch]);

    if (!schoolPeriodId) {
        return (
            <div className="p-grid crud-demo">
                <div className="p-col-12">
                    <Message severity="error" text="No existe un Período Lectivo activo." />
                </div>
            </div>
        );
    }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbarTemplate}
                    >
                    </Toolbar>

                    <DataTable
                        ref={dataTable} 
                        value={topics} 
                        selection={selectedTopics} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No se encontraron Temas de Estudio.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Temas"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setSelectedTopics(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        <Column 
                            selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column className='text-center' field="title" header="Título" sortable></Column>
                        <Column field="classroom.name" header="Aula" sortable></Column>
                        <Column field="asignature.name" header="Asignatura" sortable></Column>
                        <Column header="Tipo" body={typeBodyTemplate} sortable></Column>
                        <Column field="active" header="Estado del Tema" body={stateBodyTemplate} sortable></Column>
                        <Column 
                            header="Fecha de Creación" 
                            body={dateBodyTemplate} 
                            sortable
                        ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    {/* <DTTopicUpdateDialogApp 
                        topicUpdate={topicUpdate}
                        showUpdate={showUpdate}
                        hideUpdateTopicDialog={hideUpdateTopicDialog}
                    /> */}
                </div>
            </div>
        </div>
    )
}
