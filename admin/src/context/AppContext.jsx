import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const currency = "₹"

    const calculateAge = (dob)=>{

        const today = new Date();
        const birthDate  = new Date(dob);
        const age = today.getFullYear()-birthDate.getFullYear();

        return age;

    }

    
  // formate the date 17_7_2025 => 17 Jul 2025
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }


    const value = {
        calculateAge,
        slotDateFormate,
        currency
        
    }

    return (
        <AppContext.Provider value={value}>
            {
                props.children
            }
        </AppContext.Provider>
    )

}
export default AppContextProvider