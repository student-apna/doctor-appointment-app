import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
 

  const [state,setState] = useState('Sign Up');
  const navigate = useNavigate();
  
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onSubmitHandler = async (event) =>{
    event.preventDefault()
  }


  return (
    
          

          <form  className='min-h-[80vh] flex items-center'>
               
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
                      state==="Sign Up"? '' : <p onClick={()=> navigate('/forgot-password')} className='text-blue-400 underline cursor-pointer'>forgot password ?</p>
                    }

                  
                    <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ?'sign up' : 'log in'} </button>

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