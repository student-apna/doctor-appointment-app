import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
export const AppContext = createContext()

const AppContextProvider = (props) =>{

   const currencySymbol = "₹"
   const [doctors,setDoctor] = useState([]);

   const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);

   const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const [userData,setUserData] = useState(false);
   

    const getDoctorData = async ()=>{
        try {
            const{data} = await axios.get(backendUrl+'/api/doctor/list');
            if(data.success){
                setDoctor(data.doctors);
            }else{
              toast.error(data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }

    const loadUserProfileData = async ()=>{
        try {
            
            const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}});

            if(data.success){
                setUserData(data.userData);
                console.log(userData.gender);
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            
        }
    }

     const value = {
        doctors,getDoctorData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData

    }

    useEffect(()=>{
        getDoctorData();

    },[]);

    useEffect(()=>{
        if(token){
           loadUserProfileData(); 
        }else{
            setUserData(false);
        }

    },[token])

    return (
        <AppContext.Provider value={value}>
             {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider