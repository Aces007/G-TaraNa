import React, { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from './supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [updatedData, setUpdatedData] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    //region Initial User Management Stage (SignUp, SignIn, FetchUserData)
    const signUp = async (email, username, first_name, last_name, age, password, role) => {
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
                    first_name, 
                    last_name,  
                    role,
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
            setRole(role);
    
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
            const usersRole = await fetchUserData(user.id);
            return true;

        } catch (error) {
            console.error('Error during Login:', error.message);
            return false;
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
                .select('first_name, last_name, age, username, email, created_at, role, profile_picture')
                .eq('id', userId)
                .single()
    
            if (error) throw error;
    
            return {
                first_name: data.first_name, 
                last_name: data.last_name, 
                username: data.username,
                age: data.age, 
                email: data.email, 
                created_at: data.created_at,
                user_role: data.role,
                profile_picture: data.profile_picture
            }
        
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

    //region Profile Picture Upload
    const uploadProfilePicture = async (userId, imageUri) => {
        try {
            
            const fileExt = imageUri.split('.').pop();
            const fileName = `users/${userId}/${userId}-${Date.now()}.${fileExt}`; 
    
            
            const { data: storageData, error: storageError } = await supabase
                .storage
                .from('ProfilePictures')
                .upload(fileName, {
                    uri: imageUri,  
                    type: `image/${fileExt}`,
                    name: fileName,
                });
    
            if (storageError) {
                console.error('Storage Error: Failed to upload profile picture:', storageError.message);
                throw storageError;
            }
    
    
            const { data: publicUrlData, error: publicUrlError } = await supabase
                .storage
                .from('ProfilePictures')
                .getPublicUrl(fileName);
    
            if (publicUrlError || !publicUrlData?.publicUrl) {
                console.error('Error fetching public URL:', publicUrlError?.message);
                throw publicUrlError;
            }
    
            const publicUrl = publicUrlData.publicUrl;
    
            
            const { error: updateError } = await supabase
                .from('Users')
                .update({ profile_picture: publicUrl }) 
                .eq('id', userId);
    
            if (updateError) {
                console.error('Database Error: Failed to update user profile:', updateError.message);
                throw updateError;
            }
    
            console.log('Profile picture successfully uploaded and updated.');
            return publicUrl;
    
        } catch (error) {
            console.error('Error uploading profile picture:', error.message);
            throw error;
        }
    };
    
    //endregion Profile Picture Upload


    //region Class Integration
    const generateClassCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const createClass = async ( name, description, coachId ) => {
        const code = generateClassCode();

        const { data, error } = await supabase 
            .from('Classes')
            .insert({ class_name: name, class_description: description, class_code: code, coach_id: coachId });

        if (error) throw error;

        return data;
    };
    
    const joinClass = async ( classCode, userId ) => {
        
        const { data: classData, error: fetchError } = await supabase 
            .from('Classes')
            .select('*')
            .eq('class_code', classCode)
            .single();

        if (fetchError || !classData) throw new Error('Class Not Found');


        const { data: userData, error: userError } = await supabase
            .from('Users')
            .select('first_name, last_name')
            .eq('id', userId)
            .single();

        if (userError || !userData) throw new Error('User Not Found');


        const { error: joinError } = await supabase
            .from('ClassParticipants')
            .insert({ 
                class_id: classData.id, 
                user_id: userId,
                user_name: `${userData.first_name} ${userData.last_name}`
            });

        if (joinError) throw joinError
        
        
        return classData;
    };

    const fetchCoachClasses = async (coachId) => {
        try {
            const { data, error } = await supabase
                .from('Classes')
                .select('*')
                .eq('coach_id', coachId);

            if (error) throw error;


            return data;
        } catch (error) {
            console.error('Class Fetching Error: ', error.message);
            return [];
        }
    };

    const fetchUserClasses = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('ClassParticipants')
                .select('class_id, Classes(*)')
                .eq('user_id', userId)
            
            if (error) throw error;

            return data.map((record) => record.Classes);
        } catch (error) {
            console.error('Class Fetching Error: ', error.message);
            return [];
        }
    };

    const fetchAllClasses = async () => {
        try {
            const { data, error } = await supabase 
                .from('Classes')
                .select('*');

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Class Fetching Error: ', error.message)
            return[];
        }
    };

    const fetchStudentsInClass = async () => {
        try {
            if (!classId) {
                throw new Error('Class ID is missing.');
            }
    
            const { data, error } = await supabase
                .from('ClassParticipants')
                .select('user_id, Users(first_name, last_name, email)')
                .eq('class_id', classId);
    
            if (error) throw error;
    
            return data.map((participant) => ({
                user_id: participant.user_id,
                name: `${participant.Users.first_name} ${participant.Users.last_name}`,
                email: participant.Users.email,
            }));
        } catch (error) {
            console.error('Student Fetching Error: ', error.message);
            return [];
        }
    };
    
    //endregion Class Integration


    return (
        <AppContext.Provider 
            value={{userId, updatedData, role, signUp, logIn, logOut, fetchUserData,
                updateUserDetails, updatePassword, uploadProfilePicture, setRole, generateClassCode,
                createClass, joinClass, fetchCoachClasses, fetchUserClasses, fetchAllClasses, fetchStudentsInClass,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
