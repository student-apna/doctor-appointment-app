import { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify';
import axios  from 'axios';
const AddDoctor = () => {
  
   const [docImg,setDocImg] = useState(false);
   const [name,setName] = useState('');
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [experience,setExperience] = useState('1 Year');
   const [fees,setFees] = useState('');
   const [speciality,setSpeciality] = useState('General physician');
   const [degree,setDegree] = useState('');
   const [address1,setAddress1] = useState('');
   const [address2,setAddress2] = useState('');
   const [about,setAbout] = useState('');
   const {backendUrl,aToken} = useContext(AdminContext)

    const onSubmitHandler = async (event)=>{
      event.preventDefault();
      try {
        if(!docImg){
          return toast.error('Image Not Selected');
        }

        // create form data
        const formData = new FormData();
        formData.append('image',docImg);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('experience',experience);
        formData.append('fees',Number(fees));
        formData.append('about',about);
        formData.append('speciality',speciality);
        formData.append('degree',degree);
        formData.append('address',JSON.stringify({line1:address1,line2:address2}));

        // console log formdata
        // formData.forEach((value,key)=>{
        //   console.log(`${key} :${value}`);
        // })

        const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
         
        if(data.success){
          toast.success(data.message);
          setDocImg(false)
          setName('');
          setPassword('');
          setEmail('');
          setAddress1('');
          setAddress2('');
          setDegree('');
          setAbout('');
          setFees('');
        } else{
           toast.error(data.message)
        }
  
      } catch (error) {
         toast.error(error.message)
         console.log(error.message);
        
      }

    }


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-4 text-xl font-semibold text-gray-800">Add Doctor</p>

      <div className="bg-white px-6 py-6 rounded border border-gray-200 max-w-5xl w-full">
        <div className="flex items-center gap-4 mb-6 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img className="w-14 h-14 bg-gray-100 rounded-full object-cover" src={docImg ? URL.createObjectURL(docImg): assets.upload_area}   />
          </label>
          <input  onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm leading-5">
            <span className="font-medium">Upload doctor</span><br />
            picture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700 text-sm">
          <div>
            <p>Doctor name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name "   className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none" required />
          </div>

          <div>
            <p>Speciality</p>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p>Doctor Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" placeholder="Your email" className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none"  required  />
          </div>

         

          <div>
            <p>Doctor Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none"
            />
          </div>
           <div>
            <p>Education</p>
            <input onChange={(e)=>setDegree(e.target.value)} value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none"
            />
          </div>

          <div>
            <p>Address</p>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1}
              type="text"
              placeholder="Address 1"
              required
              className="w-full px-3 py-1.5 mb-2 border border-gray-200 rounded outline-none"
            />
            <input onChange={(e)=>setAddress2(e.target.value)} value={address2}
              type="text"
              placeholder="Address 2"
              required
              className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none"
            />
          </div>

          <div>
            <p>Experience</p>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none">
              {[...Array(11)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Fees</p>
            <input  onChange={(e)=>setFees(e.target.value)} value={fees}
              type="number"
              placeholder="Your fees"
              required
              className="w-full px-3 py-1.5 border border-gray-200 rounded outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <p>About me</p>
          <textarea  onChange={(e)=>setAbout(e.target.value)} value={about}
            placeholder="write about yourself"
            rows={6}
            className="w-full px-3 py-2 border border-gray-200 rounded outline-none resize-none text-sm"
          ></textarea>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-10 py-3 bg-[#5F6FFF] text-white mt-4 text-white rounded-full"
          >
            Add doctor
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddDoctor
