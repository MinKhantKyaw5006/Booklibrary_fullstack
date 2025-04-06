'use client';
import AuthForm from '@/components/AuthForm'
import { signInSchema, signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => (
  <AuthForm
  type= "SIGN_UP"
  schema={signUpSchema}
  defaultValues ={{
    email: "",
    password: "",
    fullName: "",
    universityId: 0,
    universityCard: "",
  }}
  onSubmit={()=>{}}
  />
)

export default page
