import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmDialog } from 'primereact/confirmdialog';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { GlossaryDetailHeaderTable } from './GlossaryDetailHeaderTable';
import { EmptyContentScreen } from '../../ui/EmptyContentScreen';
import { AdminStateTableApp } from '../AdminStateTableApp';
import { AdminDateTableApp } from '../AdminDateTableApp';
import { GlossaryDetailExpandApp } from './GlossaryDetailExpandApp';

import { getSingleModelKeys } from '../../../helpers/admin';
import { 
    startBlockGlossaryDetail,
    startDeleteGlossariesDetail, 
    startDeleteGlossaryDetail,
    startRemoveCurrentGlossary, 
} from '../../../actions/admin/glossary';


export const GlossaryDetailTable = React.memo(({
    toast
}) => {

    const dispatch = useDispatch();
    const { currentGlossary, loading } = useSelector( 
        state => state.dashboard.glossary 
    );
    const [selectedGlossariesDetail, setSelectedGlossariesDetail] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [expandedRows, setExpandedRows] = useState(null);
    const dataTable = useRef(null);

    const handleRemoveGlossary = useCallback(
      () => {
        dispatch( startRemoveCurrentGlossary() );
      }, [dispatch],
    );

    const handleGlossaryDetailBlock = ( term ) => {
        if (currentGlossary.glossary) {
            const newTerm = {
                ...term,
                state: 0
            };
            dispatch( startBlockGlossaryDetail( newTerm, toast ));
        }
    }

    const handleGlossaryDetailDelete = ( termId ) => {
        dispatch( startDeleteGlossaryDetail( termId, toast));
    }

    const handleGlosariesDetailDelete = ( data ) => {
        dispatch( startDeleteGlossariesDetail(
            getSingleModelKeys( selectedGlossariesDetail ), toast
        ));
        setSelectedGlossariesDetail([]);
    }

    const handleSetGlobalFilter = useCallback(
        ( value ) => {
          setGlobalFilter( value );
        }, [],
    );

    const handleConfirmBlockTerm = ( data ) => {
        confirmDialog({
          message: '¿Está seguro que desea bloquear el siguiente Término?',
          header: 'Confirmación de Bloqueo',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, bloquear',
          rejectLabel: 'No bloquear',
          acceptClassName: 'p-button-secondary',
          accept: () => handleGlossaryDetailBlock( data ),
        });
    }

    const handleConfirmDeleteTerm = ( data ) => {
        confirmDialog({
          message: '¿Está seguro que desea eliminar el siguiente Término?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleGlossaryDetailDelete( data ),
        });
    }

    const handleConfirmDeleteManyTerms = ( data ) => {
        confirmDialog({
          message: '¿Está seguro que desea eliminar los siguientes Términos?',
          header: 'Confirmación de Eliminado',
          icon: 'fas fa-exclamation-triangle',
          acceptLabel: 'Sí, eliminar',
          rejectLabel: 'No eliminar',
          acceptClassName: 'p-button-danger',
          accept: () => handleGlosariesDetailDelete( data ),
        });
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button 
                    label="Eliminar Términos" 
                    icon="fas fa-trash-alt"  
                    className="p-button-danger" 
                    disabled={selectedGlossariesDetail.length < 2}
                    onClick={
                        () => handleConfirmDeleteManyTerms(selectedGlossariesDetail)
                    }
                />
            </React.Fragment>
        );
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="actions">
                    {
                        rowData.state === 1 && (
                            <Button 
                                icon="fas fa-ban" 
                                tooltip='Bloquear Glosario'
                                tooltipOptions={{position:'bottom'}}
                                className="p-button-rounded p-button-secondary mr-2" 
                                onClick={() => handleConfirmBlockTerm(rowData)} 
                            />
                        )
                    }
                    <Button 
                        icon="fas fa-trash" 
                        className="p-button-rounded p-button-danger" 
                        tooltip='Eliminar Glosario'
                        tooltipOptions={{position:'bottom'}}
                        onClick={() => handleConfirmDeleteTerm(rowData.id)} 
                    />
                </div>
            </React.Fragment>
        );
    }

    useEffect(() => {
      return () => {
        handleRemoveGlossary();
      }
    }, [handleRemoveGlossary]);

    if (Object.keys(currentGlossary).length === 0) {
        return (
            <div className='grid p-fluid'>
                <EmptyContentScreen />
            </div>
        );
      }
      
      if (!currentGlossary.glossary || !currentGlossary.details) {
        return (
          <div className='col-12'>
            <div className='card'>
              <small>No se encontró el Glosario.</small>
            </div>
          </div>
        );
      }

    return (
        <div className="p-grid crud-demo">
            <div className="p-col-12">
                <Toolbar 
                    className="mb-4" 
                    left={leftToolbarTemplate}
                ></Toolbar>
                <DataTable
                    ref={dataTable} 
                    value={currentGlossary.details} 
                    selection={selectedGlossariesDetail}
                    globalFilter={globalFilter}
                    header={
                        <GlossaryDetailHeaderTable
                            setGlobalFilter={handleSetGlobalFilter}
                        />
                    }
                    loading={loading}
                    expandedRows={expandedRows}
                    rowExpansionTemplate={(e) => 
                        <GlossaryDetailExpandApp 
                            term={e}
                        />
                    }
                    dataKey="id" paginator rows={10} 
                    emptyMessage='No se encontraron registros.'
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks 
                    NextPageLink LastPageLink CurrentPageReport"
                    currentPageReportTemplate="{first} - {last} de {totalRecords} 
                    Términos"
                    resizableColumns columnResizeMode="expand"
                    className="datatable-responsive"
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    onSelectionChange={(e) => setSelectedGlossariesDetail(e.value)}
                >
                    <Column 
                        expander 
                        style={{ width: '4em' }} 
                    />
                    <Column 
                        selectionMode="multiple" 
                        headerStyle={{ width: '3rem' }}
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
                        body={(e) => <AdminStateTableApp data={e} />}
                        sortable
                    ></Column>
                    <Column 
                        className='text-center'
                        field='created_at' 
                        header="Fecha de Creación"
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
