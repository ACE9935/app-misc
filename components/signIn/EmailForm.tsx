import React from 'react';
import { Formik } from 'formik';
import { TextField, Button } from '@mui/material';
import { signIn } from "next-auth/react";

const EmailForm = ({setVerify,setEmail,...props}:{setVerify:(a:boolean)=>void,setEmail:(a:string)=>void}) => (
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ email: '' }}
      validate={values => {
        const errors:{email?:string} = {};
        
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        signIn('resend',{email:values.email,redirect:false})
        setVerify(true)
        setEmail(values.email)
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
            inputProps={{maxLength:60}}
            type="email"
            name="email"
            error={errors.email?.length!>0}
            helperText={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
           label='Email' color='secondary' variant='filled' className="shadow-xl !w-[19rem]"/>
           <Button type='submit' className='!bg-main !text-white !rounded-full !p-3 !px-8 shadow-md w-fit'>Continue</Button>
           </div>
        </form>
      )}
    </Formik>
);

export default EmailForm;