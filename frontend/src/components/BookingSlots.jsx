// components/BookingSlots.jsx

const BookingSlots = ({ docSlots, slotIndex, setSlotIndex, slotTime, setSlotTime, daysOfWeek,bookAppointment }) => {
  return (
    <div className='sm:ml-72 mt-4 font-medium text-gray-700'>
      <p>Booking slots</p>

      <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
        {
          docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
              key={index}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))
        }
      </div>

      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {
          docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))
        }
      </div>

      <button onClick={bookAppointment}  className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
    </div>
  );
};

export default BookingSlots;
