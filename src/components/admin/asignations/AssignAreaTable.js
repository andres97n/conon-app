import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { OwnerHeaderApp } from '../owner/OwnerHeaderApp';

import { getDataIdsForModel } from '../../../helpers/admin';
import { startSaveTeachersToArea } from '../../../actions/admin/area';


export const AssignAreaTable = React.memo(({ 
    area,
    toast
}) => {

    const dispatch = useDispatch();
    const { teachers, loading } = useSelector(state => state.dashboard.area);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const dataTable = useRef(null);

    const handlePutTeachers = ( selectedTeachers ) => {
        dispatch( startSaveTeachersToArea(
            getDataIdsForModel(selectedTeachers),
            area.id,
            toast
        ));
        setSelectedTeachers([]);
    }
    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const handleConfirmAssignTeachers = ( data ) => {
        confirmDialog({
          message: 
            data.length === 1
                ? ('¿Está seguro que desea asignar el siguiente Docente?')
                : ('¿Está seguro que desea asignar los siguientes Docentes?'),
          header: 'Confirmación de Asignado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, asignar',
          rejectLabel: 'No asignar',
          accept: () => handlePutTeachers( data ),
        });
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label={
                        selectedTeachers.length < 2
                            ? "Asignar Docente"
                            : "Asignar Docentes"
                    } 
                    icon="fas fa-check"  
                    className="p-button-primary" 
                    disabled={selectedTeachers.length === 0}
                    onClick={() => handleConfirmAssignTeachers(selectedTeachers)}
                />
            </React.Fragment>
        );
    }

    return (
        <div className="grid p-fluid">
            <div className='col-12'>
                <Toolbar 
                    className="mb-4" 
                    left={leftToolbarTemplate}
                ></Toolbar>
            </div>
            <div className="col-12">
                <DataTable
                    ref={dataTable} 
                    value={teachers} 
                    selection={selectedTeachers} 
                    globalFilter={globalFilter}
                    header={
                        <OwnerHeaderApp
                            title={'Docentes No Asignados'}
                            icon={'fas fa-chalkboard-teacher mr-2 icon-primary'}
                            placeholder={'Buscar Docentes...'}
                            withActive={false}
                            setGlobalFilter={handleSetGlobalFilter}
                            handleNewData={() => {}}
                        />
                    }
                    loading={loading}
                    dataKey="id" paginator rows={10} 
                    emptyMessage='No existen Docentes para Agregar.'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink 
                    LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} de {totalRecords} 
                    docentes"
                    resizableColumns 
                    columnResizeMode="expand"
                    className="datatable-responsive"
                    showGridlines
                    onSelectionChange={(e) => setSelectedTeachers(e.value)}
                >
                    <Column 
                        selectionMode="multiple" 
                        headerStyle={{ width: '3rem' }}
                    ></Column>
                    <Column
                        className='text-center'
                        field="identification" 
                        header="Identificación" 
                        sortable
                    ></Column>
                    <Column
                        className='text-center'
                        field="name" 
                        header="Nombres" 
                        sortable
                    ></Column>
                    <Column
                        className='text-center'
                        field="title" 
                        header="Título" 
                        sortable
                    ></Column>
                </DataTable>
            </div>
        </div>
    )
})
