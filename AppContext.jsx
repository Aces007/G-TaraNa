import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from './supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const signUp = async (email, username, password) => {
        try {
            const { data: signupData, error: authError } = await supabase.auth.signUp({ email, password });
            console.log('SignUp Response ', signupData);
            
            if (authError) {
                console.error('Authentication Error:', authError.message);
                throw authError;
            }

            const user = signupData?.user;
            if (!user) {
                throw new Error('No user returned after sign-up.');
            }

            const { error: dbError } = await supabase
            .from('Users')
            .upsert({ id: user.id, email, username, password, created_at: new Date(), updated_at: new Date() },
            {
                onConflict: ['id']       
            });

            if (dbError) {
                console.error('Database Error: ', dbError.message);
                throw dbError;
            }

            setUserId(user.id);

        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    }






    return (
        <AppContext.Provider 
            value={{userId, signUp}}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
