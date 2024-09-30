import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from './supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [updatedData, setUpdatedData] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    //region Initial User Management Stage (SignUp, SignIn, FetchUserData)
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
                .select('name, age, username, email, created_at')
                .eq('id', userId)
                .single()
    
            if (error) throw error;
    
            return {
                name: data.name, 
                username: data.username,
                age: data.age, 
                email: data.email, 
                created_at: data.created_at}
        
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            return null;
        }
    };

    //endregion Initial User Management Stage (SignUp, SignIn, FetchUserData)
    
    //region User Management Modification 
    const updateUserDetails = async (userId, updatedData) => {
        try {
            const { data, error } = await supabase
                .from('Users')
                .update(updatedData)
                .eq('id', userId);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error updating user details:', error.message);
        }
    }

    const updatePassword = async (newPassword) => {
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            
        } catch (error) {
            console.error('Error updating user password:', error.message)
        }
    }
    //endregion User Management Modification 



    return (
        <AppContext.Provider 
            value={{userId, updatedData, signUp, logIn, logOut, fetchUserData,
                updateUserDetails, updatePassword
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
