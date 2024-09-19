import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from './supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const signUp = async (email, username, name, age, password) => {
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
    
            const formattedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(new Date());
    
            const { error: dbError } = await supabase
                .from('Users')
                .upsert({
                    id: user.id, 
                    email, 
                    username, 
                    age,
                    name, 
                    created_at: formattedDate
                }, 
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
    };
    

    const logIn = async (email, password) => {
        try {
            const { data: { user }, error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password,
            });

            if (error) throw error;
            console.log('Login successful, User ID:', user.id);

            setUserId(user.id);

        } catch (error) {
            console.error('Error during Login:', error.message);
        }
    };

    const logOut = async () => {
        try {
          const { error } = await supabase.auth.signOut();
        
          if (error) throw error;
        
          setUserId(null);
        
        } catch (error) {
          console.error('Error logging out:', error);
        }
    };

    const fetchUserData = async (userId) => {
        if (!userId) {
            console.error('User ID is missing.');
            return null;
        }
    
        try {
            const { data, error } = await supabase
                .from('Users')
                .select('name, age, email, created_at')
                .eq('id', userId)
                .single()
    
            if (error) throw error;
    
            return {
                name: data.name, 
                age: data.age, 
                email: data.email, 
                created_at: data.created_at}
        
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            return null;
        }
    };
    




    return (
        <AppContext.Provider 
            value={{userId, signUp, logIn, logOut, fetchUserData}}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
