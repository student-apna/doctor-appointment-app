import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';

const Login = () => {
 

  const [state,setState] = useState('Sign Up');
  const navigate = useNavigate();
  const {backendUrl,token,setToken} = useContext(AppContext);
  
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onSubmitHandler = async (event) =>{
    event.preventDefault();

    try {
       
      if(state==='Sign Up'){

        const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password});
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }
        else{
           toast.error(data.message);
        }
      }
      else{
         const {data} = await axios.post(backendUrl+'/api/user/login',{email,password});
           if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
         }
        else{
           toast.error(data.message);
        }
      }
      
    } catch (error) {
      toast.error(error.message);
      
    }

  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }

  },[token]);


  return (
    
          

          <form onSubmit={onSubmitHandler}  className='min-h-[80vh] flex items-center'>
               
               <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold '>{state==='Sign Up' ? "Create Account" :"Login"}</p>
                <p>Please {state === 'Sign Up' ?'sign up' : 'log in'} to book appointment</p>

                 {
                  state ==='Sign Up'
                   && <div className='w-full'>
                  <p>Full Name</p>
                  <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={e=>setName(e.target.value)}  value={name}  type="text" placeholder='Enter Name'  required/>
                 </div>
                  
                 }

                

                 <div  className='w-full'>
                  <p>Email</p>
                  <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={e=>setEmail(e.target.value)}  value={email}  type="email" placeholder='Enter email'  required/>
                 </div>

                 <div className='w-full'>
                  <p>Password</p>
                  <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={e=>setPassword(e.target.value)}  value={password}  type="password" placeholder='Enter password'  required/>
                 </div>

                    {
                      state==="Sign Up"? '' : <p onClick={()=> navigate('/reset-password')} className='text-blue-400 underline cursor-pointer'>Forgot Password ?</p>
                    }

                  
                    <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ?'sign up' : 'log in'} </button>

                    {
                      state ==="Sign Up" 
                      ? <p>Already have an account? <span onClick={()=> setState('Login')} className='text-blue-400 underline cursor-pointer'>Login here</span></p>
                      :<p>Create an new account? <span onClick={()=> setState('Sign Up')} className='text-blue-400 underline cursor-pointer' >click here</span> </p>
                    }

               </div>
             
               

             

             

           
           </form> 
          

             
     
  )
}

export default Login