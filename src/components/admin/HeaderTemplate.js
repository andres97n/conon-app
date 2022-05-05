import React from 'react';
import { InputText } from 'primereact/inputtext';

export const HeaderTemplate = ({
    title,
    setGlobalFilter
}) => {
    console.log('HOLA DESDE HEADER TEMPLATE');
    return (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">{ title }</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="fas fa-search" />
                <InputText 
                    type="search" 
                    placeholder="Buscar..." 
                    onInput={(e) => setGlobalFilter(e.target.value)} 
                />
            </span>
        </div>
    )
}
