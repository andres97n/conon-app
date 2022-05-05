import React from 'react';

// TODO: Mejorar como se ve el footer

export const FooterScreen = (props) => {
    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'Conon_ico.png' : 'Conon_ico.png'} alt="Logo" height="20" />
            by Andrés Novillo
        </div>
    )
}
