
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import DoctorDetails from '../components/DoctorDetails';
import BookingSlots from '../components/BookingSlots';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';
const Appointment = () => {

  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);

  }

  const getAvialableSlots = async () => {
    // first clear the previous slots
    setDocSlots([]);

    // getting current date
    let today = new Date();

    // calculate the 7 day from today

    for (let i = 0; i < 7; i++) {

      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the  date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(23, 0, 0, 0);

      // settings hours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        // future date hai 
        // tab hours 10 se start karenge and min 0
        currentDate.setHours(10);
        currentDate.setMinutes(0);

      }


      let timeSlots = [];
      while (currentDate < endTime) {
        // create slots in every 30 minutes
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        // check the doctor data if we find this slot booked then we not pushed this in slotArray

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {

          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

        }



        // increament current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }
      setDocSlots(prev => ([...prev, timeSlots]))


    }

  }


  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login');
    }
    try {
      // store the selected date
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate();
      let month = date.getMonth() + 1;  // month index starts from 0
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;
      //  console.log(slotDate);

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getDoctorData()
        navigate('/my-appointments')

      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  useEffect(() => {
    fetchDocInfo();

  }, [doctors, docId])

  useEffect(() => {
    getAvialableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])

  return docInfo && (
    <div>

      {/* --------Doctors Details----- */}
      <DoctorDetails docInfo={docInfo} currencySymbol={currencySymbol} />



      {/* ------- Booking Slots------   */}
      <BookingSlots
        docSlots={docSlots}
        slotIndex={slotIndex}
        setSlotIndex={setSlotIndex}
        slotTime={slotTime}
        setSlotTime={setSlotTime}
        daysOfWeek={daysOfWeek}
        bookAppointment={bookAppointment}
      />

      {/* ----- Listing Related Doctors------ */}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />


    </div>
  )
}

export default Appointment