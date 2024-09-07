import React, { useState, createContext, useContext, useEffect } from 'react';
// import { supabase } from './supabaseClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);






    return (
        <AppContext.Provider value={userId}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
