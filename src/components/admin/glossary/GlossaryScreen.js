import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

import { startDeleteGlossary, startLoadGlossaries, startLoadGlossariesDetail, startRemoveGlossaries, startRemoveGlossariesDetail, startUpdateGlossary } from '../../../actions/admin/glossary';
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import { GlossaryDetailTable } from './GlossaryDetailTable';

export const GlossaryScreen = () => {

    const emptyGlossary = {
        id: null,
        asignature_classroom: {
            id: null,
            classroom: {
                id: null,
                name: ''
            },
            asignature: {
                id: null,
                name: ''
            },
            teacher: {
                id: null,
                name: ''
            }
        },
        state: false,
        observations: '',
        created_at: null
    }

    const dispatch = useDispatch();
    const { glossaries, loading } = useSelector(state => state.dashboard.glossary);
    const [glossary, setGlossary] = useState(emptyGlossary);
    const [activeGlossaryDialog, setActiveGlossaryDialog] = useState(false);
    const [blockGlossaryDialog, setBlockGlossaryDialog] = useState(false);
    const [deleteGlossaryDialog, setDeleteGlossaryDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);

    const handleLoadGlossaries = useCallback( () => {
        dispatch( startLoadGlossaries() );
    }, [dispatch] );

    const handleGlossaryActive = () => {
        glossary.state = 1;
        dispatch( startUpdateGlossary( 
            glossary,
            glossary.id,
            toast
         ));
        setActiveGlossaryDialog(false);
        setGlossary(emptyGlossary);
    }

    const handleGlossaryBlock = () => {
        glossary.state = 0;
        dispatch( startUpdateGlossary( 
            glossary,
            glossary.id,
            toast
         ));
        setBlockGlossaryDialog(false);
        setGlossary(emptyGlossary);
    }

    const handleGlossaryDelete = () => {
        // Process
        dispatch( startDeleteGlossary( glossary.id, toast));
        setDeleteGlossaryDialog(false);
        setGlossary(emptyGlossary);
    }

    const confirmActiveGlossary = ( glossary ) => {
        setGlossary( glossary );
        setActiveGlossaryDialog(true);
    }

    const confirmBlockGlossary = ( glossary ) => {
        if ( glossary.state === 'Abierto' ) {
            setGlossary( glossary );
            setBlockGlossaryDialog(true);
        } else {
            toast.current.show({ 
                severity: 'warn', 
                summary: 'Conon Informa', 
                detail: 'El presente Glosario ya está cerrado.', 
                life: 6000 
            });
        }
    }

    const confirmDeleteGlossary = ( glossary ) => {
        setGlossary( glossary );
        setDeleteGlossaryDialog(true);
    }

    const hideActiveGlossaryDialog = () => {
        setActiveGlossaryDialog(false);
    }

    const hideBlockGlossaryDialog = () => {
        setBlockGlossaryDialog(false);
    }

    const hideDeleteGlossaryDialog = () => {
        setDeleteGlossaryDialog(false);
    }

    const onRowExpand = (event) => {
        setGlossary(event.data);
        dispatch( startLoadGlossariesDetail( event.data.id ) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveGlossariesDetail() );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">ADMINISTRAR GLOSARIOS</h5>
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
                <h5>Lista de Términos</h5>
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className='card'>
                            <div className="p-d-flex p-flex-wrap">
                                {/* <div className="p-mr-2 p-mb-2">
                                    <h6>Aula</h6>
                                    {data.asignature_classroom.classroom.name}
                                </div>
                                <div className='p-mr-2 p-mb-2'>
                                    <h6>Asignatura</h6>
                                    {data.asignature_classroom.asignature.name}
                                </div>
                                <div>
                                    <h6>Docente</h6>
                                    {data.asignature_classroom.teacher.name}
                                </div> */}
                                <GlossaryDetailTable 
                                    glossary = {glossary}
                                    toast = {toast}
                                />
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
                                    tooltip='Bloquear Glosario'
                                    tooltipOptions={{position:'bottom'}}
                                    className="p-button-rounded p-button-secondary mr-2" 
                                    onClick={() => confirmBlockGlossary(rowData)} 
                                />
                              )
                            : (
                                <Button 
                                    icon="fas fa-hand-point-up" 
                                    tooltip='Activar Glosario'
                                    tooltipOptions={{position:'bottom'}}
                                    className="p-button-rounded p-button-success mr-2" 
                                    onClick={() => confirmActiveGlossary(rowData)} 
                                />
                            )
                    }
                    <Button 
                        icon="fas fa-trash-alt" 
                        className="p-button-rounded p-button-danger" 
                        tooltip='Eliminar Glosario'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => confirmDeleteGlossary(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const activeGlossaryDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-secondary" 
                onClick={hideActiveGlossaryDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-success" 
                onClick={handleGlossaryActive} 
            />
        </React.Fragment>
    );

    const blockGlossaryDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideBlockGlossaryDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-secondary" 
                onClick={handleGlossaryBlock} 
            />
        </React.Fragment>
    );

    const deleteGlossaryDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteGlossaryDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleGlossaryDelete} 
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

    useEffect(() => {
        handleLoadGlossaries();
        return () => {
            dispatch( startRemoveGlossaries() );
            dispatch( startRemoveGlossariesDetail() );
        }
    }, [handleLoadGlossaries, dispatch]);

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>
                    
                    <Toast ref={toast} />

                    <DataTable
                        ref={dataTable} 
                        value={glossaries} 
                        selection={glossary} 
                        globalFilter={globalFilter}
                        header={header}
                        loading={loading}
                        expandedRows={expandedRows}
                        rowExpansionTemplate={rowExpansionTemplate}
                        selectionMode='single'
                        dataKey="id" paginator rows={10} 
                        emptyMessage='No existen Glosarios.'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                        currentPageReportTemplate="{first} - {last} de {totalRecords} Glosarios"
                        resizableColumns columnResizeMode="expand"
                        className="datatable-responsive"
                        onSelectionChange={(e) => setGlossary(e.value)}
                        onRowToggle={(e) => setExpandedRows(e.data)}
                        onRowExpand={onRowExpand}
                        onRowCollapse={onRowCollapse}
                    >
                        <Column expander style={{ width: '4em' }} />
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                        <Column 
                            field="asignature_classroom.classroom.name" 
                            header="Aula" 
                            sortable
                        ></Column>
                        <Column 
                            field="asignature_classroom.asignature.name" 
                            header="Asignatura" 
                            sortable
                        ></Column>
                        <Column 
                            field="asignature_classroom.teacher.name" 
                            header="Docente"  
                            sortable
                        ></Column>
                        <Column 
                            field='state' 
                            header="Estado" 
                            body={stateBodyTemplate} 
                            sortable
                        ></Column>
                        <Column 
                            field='created_at' 
                            header='Fecha de Creación'
                            body={dateBodyTemplate} 
                            sortable
                        ></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog
                        visible={activeGlossaryDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Activado" modal 
                        footer={activeGlossaryDialogFooter} 
                        onHide={hideActiveGlossaryDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {glossary && <span>¿Está seguro que desea activar el presente Glosario seleccionado?</span>}
                        </div>
                    </Dialog>

                    <Dialog
                        visible={blockGlossaryDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Bloqueo" modal 
                        footer={blockGlossaryDialogFooter} 
                        onHide={hideBlockGlossaryDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {glossary && <span>¿Está seguro que desea bloquear el presente Glosario seleccionado?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteGlossaryDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado" modal 
                        footer={deleteGlossaryDialogFooter} 
                        onHide={hideDeleteGlossaryDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {glossary && 
                                <span>El presente Glosario es único por Aula y no se puede recuperar. <br/> ¿Está seguro que desea eliminar el mismo?</span>}
                        </div>
                    </Dialog>

                </div>  
            </div>
        </div>
    )
}
