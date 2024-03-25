import { useAppDispatch, useAppSelector } from "@/app-state/app-hooks";
import MiscToast from "@/components/MiscToast";
import { useSession } from 'next-auth/react';
import { useToast } from "@chakra-ui/react";
import { CloseOutlined, Edit } from "@mui/icons-material";
import {  Dialog, IconButton, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import SignInBtnBasicFilled from "@/components/signIn/SignInBtnBasicFilled";
import { closeEditUserNameTab } from "@/app-state/edit-user-name";

const deletePlaylist = async ({ userId,name,update }: { userId: string,name:string,update:any }) => {
    try {
      const apiUrl = '/rename-user/api';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may include additional headers like Authorization if needed
        },
        body: JSON.stringify({userId,name}),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      await update()
  
      return response.json();
    } catch (error) {
      // Handle errors here, you can log them or throw a custom error
      console.error('Error in addFavoriteSong:', error);
      throw new Error('Failed to add song to favorites');
    }
  };

function RenameUserModel() {
    const {data,update}=useSession()
    const model=useAppSelector(state=>state.editUserName)
    const dispatch=useAppDispatch()
    const toast = useToast()

    const { mutate,status } = useMutation({mutationFn:deletePlaylist,onSuccess:()=> {
     dispatch(closeEditUserNameTab())
      toast({
      position:'bottom-left',
      render:()=>(<MiscToast title='Playlist edited' Icon={Edit}/>),
      duration: 2000,
    })}});

    return (<Dialog onClose={()=>dispatch(closeEditUserNameTab())} open={model.open}>
    <div className="p-5 px-8 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-7 pb-5">
        <h1 className="text-xl font-bold">Edit your user-name</h1>
    <IconButton onClick={()=>dispatch(closeEditUserNameTab())}><CloseOutlined sx={{fontSize:30}}/></IconButton>
    </div>
      <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ name:"" }}
      validate={(values) => {
        const errors:{name?:string} = {};
        
        if (!values.name) errors.name = 'Required';
        if(values.name.length>20) errors.name = 'Pick a shorter name'
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        mutate({userId:data?.user?.infos._id,update,name:values.name})
          
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
        </div>
  </Dialog> );
}

export default RenameUserModel;