import { useContext, useEffect, useState } from "react"
import { AppContext } from '../context/AppContext'
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";


const MyAppointments = () => {

  // const {doctors} = useContext(AppContext)
  const { backendUrl, token, getDoctorData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  // formate the date 17_7_2025 => 17 Jul 2025
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }



  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message);

    }
  }

  const cancelAppointment = async (appointmentId) => {

    try {
      // console.log(appointmentId);
      const { data } = await axios.post(backendUrl + '/api/user/cancle-appointment', { appointmentId }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorData(); // when user cancelled the appointment then the time slot automatically update without loading the page
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);

    }

  }

  const makePayment = async (appointmentId) => {

     try {
      const {data} = await axios.post(backendUrl+ '/api/user/confirm-payment', {appointmentId}, {headers: { token } });

      if (data.success) {
        toast.success("Payment confirmed!");
        getUserAppointments();
        setSelectedAppointment(null);
      } else {
        toast.error("Failed to confirm payment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error confirming payment.");
    }

  }


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }

  }, [token])

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b ">My Appointments</p>
      <div>
        {
          appointments.map((item, index) => (
            <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
              <div>
                <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-sm mt-1"> <span className="text-sm text-neutral-700 font-medium" >Date & Time:</span> {slotDateFormate(item.slotDate)} | {item.slotTime}</p>
              </div>
              {/* responsive ke liye hai bas ye empty div */}
              <div></div>

              <div className="flex flex-col gap-2 justify-end ">

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => setSelectedAppointment(item)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5F6FFF] hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button
                    disabled
                    className="text-sm sm:min-w-48 py-2 border rounded text-green-600 border-green-500 cursor-default"
                  >
                    Paid
                  </button>
                )}


                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white active:bg-red-600 active:text-white focus:bg-red-600 focus:text-white transition-all duration-300">Cancel appointment</button>}

                {item.cancelled && !item.isCompleted && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500"> Appointment cancelled</button>}
                { item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500"> Appointment completed</button>}

              </div>


            </div>
          ))
        }


        {selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg text-center w-80 relative">
              <h2 className="font-semibold text-lg mb-3">Scan to Pay</h2>
              <img
                src={assets.QR_Code}
                alt="QR Code"
                className="w-64 h-64 object-contain"
              />
              <p className="text-sm text-gray-500 mt-2 mb-4">Use any UPI app to scan and pay</p>

              <button
                onClick={()=>makePayment(selectedAppointment._id)}
                className="bg-[#5F6FFF] text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                I have paid
              </button>

              <button
                onClick={() => setSelectedAppointment(null)}
                className="mt-2 text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}


      </div>


    </div>
  )
}

export default MyAppointments