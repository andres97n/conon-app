import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';

import { startBlockTopic, startDeleteTopic, startDeleteTopics, startLoadNewStudentsForTopics, startLoadTopicsByTeacher, startRemoveTopics, startRemoveTopicStudents } from '../../../actions/admin/topic';
import { getSingleModelKeys, setClassroomDropdown, setTeacherDropdown } from '../../../helpers/admin';
import { startLoadClassroomsShortData, startRemoveClassrooms } from '../../../actions/admin/classroom';
import { startLoadAsignaturesDetailByClassroom, startRemoveAsignaturesDetail } from '../../../actions/admin/asignature';
import { TopicStudentsTable } from './TopicStudentsTable';

export const TopicScreen = () => {

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
    const { topics, loading } = useSelector(state => state.dashboard.topic);
    const { classrooms } = useSelector(state => state.dashboard.classroom);
    const { asignatures_detail } = useSelector(state => state.dashboard.asignature);
    const [topic, setTopic] = useState(emptyTopic);
    const [blockTopicDialog, setBlockTopicDialog] = useState(false);
    const [deleteTopicDialog, setDeleteTopicDialog] = useState(false);
    const [deleteTopicsDialog, setDeleteTopicsDialog] = useState(false);
    const [selectedTopics, setSelectedTopics] = useState(null);
    const [selectedClassroom, setSelectedClassroom] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const dataTable = useRef(null);

    // const handleLoadDUATopics = useCallback( () => {
    //     dispatch( startLoadTopics( 1 ) );
    // }, [dispatch]);

    const handleLoadTopicClassrooms = useCallback( () => {
        dispatch( startLoadClassroomsShortData() );
    }, [dispatch] );

    const handleTopicBlock = () => {
        dispatch( startBlockTopic( 
            topic,
            topic.id,
            toast
         ));
        setBlockTopicDialog(false);
        setTopic(emptyTopic);
    }

    const handleTopicDelete = () => {
        // Process
        dispatch( startDeleteTopic( topic.id, toast));
        setDeleteTopicDialog(false);
        setTopic(emptyTopic);
    }

    const handleTopicsDelete = () => {
        dispatch( startDeleteTopics(
            getSingleModelKeys( selectedTopics ),
            toast
        ));
        setDeleteTopicsDialog(false);
        setSelectedTopics(null);
    }

    const confirmBlockTopic = ( topic ) => {
        setTopic( topic );
        setBlockTopicDialog(true);
    }

    const confirmDeleteTopic = ( topic ) => {
        setTopic( topic );
        setDeleteTopicDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteTopicsDialog(true);
    }

    const hideBlockTopicDialog = () => {
        setBlockTopicDialog(false);
    }

    const hideDeleteTopicDialog = () => {
        setDeleteTopicDialog(false);
    }
    
    const hideDeleteTopicsDialog = () => {
        setDeleteTopicsDialog(false);
    }

    const onClassroomChange = ( e ) => {
        dispatch( startLoadAsignaturesDetailByClassroom( e.value ) );
        setSelectedClassroom(e.value);
    }

    const onTeacherChange = ( e ) => {
        dispatch( startLoadTopicsByTeacher( e.value ) );
        setSelectedTeacher(e.value);
    }

    const onRowExpand = (event) => {
        setTopic(event.data);
        dispatch( startLoadNewStudentsForTopics( event.data.id, 15) );
    }

    const onRowCollapse = () => {
        dispatch( startRemoveTopicStudents() );
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
                <Dropdown 
                    value={selectedClassroom} 
                    options={setClassroomDropdown(classrooms)} 
                    onChange={onClassroomChange} 
                    optionLabel="name" 
                    filter showClear 
                    filterBy="name" 
                    placeholder="Seleccione un Aula"
                    valueTemplate={selectedClassroomTemplate} 
                    itemTemplate={classroomOptionTemplate} 
                    emptyMessage='No se encontraron Aulas'
                    emptyFilterMessage='No se encontraron resultados'
                    tooltip='Para filtrar primero seleccione un aula'
                    tooltipOptions={{position:'bottom'}}
                    className='mr-2'
                />
                <Dropdown 
                    value={selectedTeacher} 
                    options={setTeacherDropdown(asignatures_detail)} 
                    onChange={onTeacherChange} 
                    optionLabel="name" 
                    filter showClear 
                    filterBy="name" 
                    placeholder="Seleccione un Docente"
                    valueTemplate={selectedTeacherTemplate} 
                    itemTemplate={teacherOptionTemplate} 
                    emptyMessage='No se encontraron Docentes'
                    emptyFilterMessage='No se encontraron resultados'
                    tooltip={
                        (selectedClassroom)
                            ? ('Por último seleccione un docente')
                            : ('Para filtrar primero seleccione un aula')
                    }
                    tooltipOptions={{position:'bottom'}}
                />
            </React.Fragment>
        );
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Eliminar Tema/s de Estudio" 
                    icon="fas fa-trash"  
                    className="p-button-danger" 
                    onClick={confirmDeleteSelected} 
                    disabled={!selectedTopics || !selectedTopics.length}
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
                                {/* <div className="p-mr-2 p-mb-2">
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
                                </div> */}
                                <TopicStudentsTable 
                                    topic = {topic}
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
                    <Button 
                        icon="fas fa-ban" 
                        tooltip='Bloquear Tema'
                        tooltipOptions={{position:'bottom'}}
                        className="p-button-rounded p-button-secondary mr-2" 
                        onClick={() => confirmBlockTopic(rowData)} 
                    />
                    <Button 
                        icon="fas fa-trash-alt" 
                        className="p-button-rounded p-button-danger" 
                        tooltip='Eliminar Tema'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => confirmDeleteTopic(rowData)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    const blockTopicDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideBlockTopicDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleTopicBlock} 
            />
        </React.Fragment>
    );

    const deleteTopicDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteTopicDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleTopicDelete} 
            />
        </React.Fragment>
    );

    const deleteTopicsDialogFooter = (
        <React.Fragment>
            <Button 
                label="No" 
                icon="fas fa-times-circle" 
                className="p-button-text p-button-success" 
                onClick={hideDeleteTopicsDialog} 
            />
            <Button 
                label="Sí" 
                icon="fas fa-check-circle" 
                className="p-button-text p-button-danger" 
                onClick={handleTopicsDelete} 
            />
        </React.Fragment>
    );

    const selectedClassroomTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const selectedTeacherTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const classroomOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }

    const teacherOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.name}</div>
            </div>
        );
    }

    useEffect(() => {
        handleLoadTopicClassrooms();
        return () => {
            dispatch( startRemoveTopics() );
            dispatch( startRemoveClassrooms() );
            dispatch( startRemoveAsignaturesDetail() );
            dispatch( startRemoveTopicStudents() );
        }
    }, [handleLoadTopicClassrooms, dispatch]);

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <div className='card'>

                    <Toast ref={toast} />
                    <Toolbar 
                        className="mb-4" 
                        left={leftToolbarTemplate}
                        right={rightToolbarTemplate}
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
                        visible={blockTopicDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Bloqueo" modal 
                        footer={blockTopicDialogFooter} 
                        onHide={hideBlockTopicDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {topic && <span>¿Está seguro que desea bloquear el siguiente tema de estudio: <b>{topic.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteTopicDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado" modal 
                        footer={deleteTopicDialogFooter} 
                        onHide={hideDeleteTopicDialog}
                    >
                        <div 
                            className="flex align-items-center justify-content-center"
                        >
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                                {topic && <span>¿Está seguro que desea eliminar el siguiente tema de estudio: <b>{topic.title}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog 
                        visible={deleteTopicsDialog} 
                        style={{ width: '450px' }} 
                        header="Confirmación de Eliminado Múltiple" modal 
                        footer={deleteTopicsDialogFooter} 
                        onHide={hideDeleteTopicsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i 
                                className="fas fa-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} 
                            />
                            {topic && <span>¿Está seguro que desea eliminar los siguientes <b>{selectedTopics && selectedTopics.length}</b> temas seleccionadas?</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
