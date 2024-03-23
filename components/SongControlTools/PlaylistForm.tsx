import React from 'react';
import { Formik } from 'formik';
import { TextField, Button } from '@mui/material';
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from '@/app-state/app-hooks';
import { close } from '@/app-state/playlist-model';
import { useMutation } from '@tanstack/react-query';
import { ISong } from '@/app/api/models';
import { useToast } from '@chakra-ui/react';
import MiscToast from '../MiscToast';
import { DoneOutline } from '@mui/icons-material';
import SignInBtnBasicFilled from '../signIn/SignInBtnBasicFilled';

const addSongToPlaylist = async ({ userId, name, song, update }: { userId: string; song: ISong; name: string; update: any }) => {
    try {
      const response = await fetch('/create-playlist/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may include additional headers like Authorization if needed
        },
        body: JSON.stringify({ userId, name, song }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Call update only if the request was successful
      await update();
  
      return response.json();
    } catch (error) {
      // Handle errors here, you can log them or throw a custom error
      console.error('Error in addSongToPlaylist:', error);
      throw new Error('Failed to add song to playlist');
    }
  };

const PlaylistForm = () => {
    const {data,update}=useSession()
    const dispatch=useAppDispatch()
    const toast=useToast()
    
    const { mutate,status } = useMutation({mutationFn:addSongToPlaylist,onSuccess:()=>{
        dispatch(close())
        toast({
            position:'bottom-left',
            render:()=>(<MiscToast title='Playlist created successfully' Icon={DoneOutline}/>),
            duration: 2000,
          })
    },})

    const playlistSong=useAppSelector(state=>state.addPlaylist)
    return (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ name:'' }}
      validate={(values) => {
        const errors:{name?:string} = {};
        
        if (!values.name) errors.name = 'Required';
        if(values.name.length>20) errors.name = 'Pick a shorter name'
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
      mutate({ userId:data?.user?.infos._id,name:values.name,song:playlistSong.song!,update:update })
          
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} noValidate>
        <div className='flex flex-col items-center gap-12'>
     <TextField
        required
        error={errors.name?.length!>0}
        helperText={errors.name}
        inputProps={{maxLength:20}}
        onBlur={handleBlur}
        type="text"
        name="name"
        onChange={handleChange}
        value={values.name}
       label='Choose a name' color='secondary' variant='filled' className="shadow-xl"/>
       <div className='flex gap-3 items-center'>
        {status=="pending"&&<img width={40} height={40} src='/loading.gif'/>}
        <SignInBtnBasicFilled
       disabled={status=="pending"}
       type='submit'>Continue</SignInBtnBasicFilled>
       </div>
       </div>
    </form>
      )}
    </Formik>
)}

export default PlaylistForm;

