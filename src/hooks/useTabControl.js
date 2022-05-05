import { useState } from 'react';

export const useTabControl = ( initialState = {} ) => {

    const [tabs, setTabs] = useState(initialState);

    const resetTabs = () => {
        setTabs( initialState );
    }

    const handleSetActiveTab = ( field, value ) => {
        setTabs({
            ...tabs,
            [ field ]: value
        });
    }

    const handleSetState = (state) => {
        setTabs(state);
    }

    return [ tabs, resetTabs, handleSetActiveTab, handleSetState ];

}