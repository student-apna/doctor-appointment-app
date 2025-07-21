
import logo from './logo.svg'
import logo2 from './logo2.png'
import logo4 from './logo4.png';
import profile_pic from './profile_pic.jpg'
import dropdown_icon from './dropdown_icon.svg'
import group_profile from './group_profiles.png'
import header_img from './header_img.png';
import arrow_icon from './arrow_icon.svg';
import doctors_img from './threedoctors_img.png'

import Gastroenterologist from './Gastroenterologist.svg';
import General_physician from './General_physician.svg';
import Gynecologist from './Gynecologist.svg';
import Neurologist from './Neurologist.svg';
import Pediatricians from './Pediatricians.svg';
import Dermatologist from './Dermatologist.svg';

import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import doc16 from './doc16.png'

import appointment_img from './appointment_img.png'
import my_photo from './my_photo.png'
import verified_icon from './verified_icon.svg'
import info_icon from './info_icon.svg'
import about_image from './about_image.png'
import contact_image from './contact_image.png'
import lock_icon from './lock_icon.svg'
import mail_icon from './mail_icon.svg'
import person_icon from './person_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import upload_icon from './upload_area.png'
import github_icon from './githubLogo.png'
import linkedin_icon from './linkedinLogo.png'
import QR_Code from './QRCode.jpg';




export const assets = {
  
    logo,
    profile_pic,
    dropdown_icon,
    group_profile,
    header_img,
    arrow_icon,
    doctors_img,
    appointment_img,
    my_photo,
    verified_icon,
    info_icon,
    contact_image,
    about_image,
    lock_icon,
    mail_icon,
    person_icon,
    menu_icon,
    cross_icon,
    upload_icon,
    github_icon,
    linkedin_icon,
    logo2,
    QR_Code,
    logo4
    
}

export const specialityData = [
    {
        speciality:'General physician',
        image: General_physician
    },
     {
        speciality:'Gynecologist',
        image: Gynecologist
    },
     {
        speciality:'Dermatologist',
        image: Dermatologist
    },
    {
        speciality:'Pediatricians',
        image: Pediatricians
    },
    {
        speciality:'Neurologist',
        image:Neurologist
    },
    {
        speciality:'Gastroenterologist',
        image: Gastroenterologist
    },

    

]

export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Aarav Jain',
    image: doc1,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Aarav Jain is a trusted General Physician with 4 years of experience in managing routine illnesses and chronic health conditions with a focus on preventive care.',
    fees: 400,
    address: {
      line1: '5, MG Road',
      line2: 'Indiranagar, Bengaluru, Karnataka'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Ranjana Sharma',
    image: doc2,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Ranjana Sharma is a skilled Gynecologist with expertise in reproductive health, prenatal care, and women’s wellness, delivering quality care with empathy.',
    fees: 600,
    address: {
      line1: '12, Park Street',
      line2: 'Salt Lake, Kolkata, West Bengal'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Altaf Khan',
    image: doc3,
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Altaf Khan specializes in skincare, treating acne, eczema, pigmentation, and hair loss, with a modern and patient-centric approach.',
    fees: 500,
    address: {
      line1: '22, Civil Lines',
      line2: 'Aligarh, Uttar Pradesh'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Y. K. Amdekar',
    image: doc4,
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Y. K. Amdekar is a Pediatrician devoted to children’s health and development. He ensures timely immunization and promotes holistic growth in young children.',
    fees: 450,
    address: {
      line1: '19, Tilak Marg',
      line2: 'Dadar, Mumbai, Maharashtra'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Jennifer Garcia',
    image: doc5,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Jennifer Garcia is a Neurologist treating brain and nerve disorders such as epilepsy, migraine, and stroke with advanced diagnostics and compassionate care.',
    fees: 700,
    address: {
      line1: '34, Cunningham Road',
      line2: 'Shivaji Nagar, Bengaluru, Karnataka'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. B. S. Singhal',
    image: doc6,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. B. S. Singhal brings rich experience in diagnosing and managing neurological disorders like Parkinson’s, dementia, and multiple sclerosis with precision.',
    fees: 700,
    address: {
      line1: '11, Rajiv Chowk',
      line2: 'Connaught Place, Delhi'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Devi Shetty',
    image: doc7,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Devi Shetty is a General Physician known for treating lifestyle diseases, seasonal flu, and hypertension with a personalized and preventive outlook.',
    fees: 400,
    address: {
      line1: '6, Gariahat Road',
      line2: 'Ballygunge, Kolkata, West Bengal'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Deepak Rao',
    image: doc8,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Deepak Rao is an experienced Gynecologist focusing on fertility treatments, menstrual disorders, and women’s hormonal health with utmost dedication.',
    fees: 600,
    address: {
      line1: '14, Baner Road',
      line2: 'Aundh, Pune, Maharashtra'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Usba Khan',
    image: doc9,
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Usba Khan is a young Dermatologist passionate about treating acne, fungal infections, and skin allergies using advanced dermatological care.',
    fees: 500,
    address: {
      line1: '50, Hazratganj',
      line2: 'Lucknow, Uttar Pradesh'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Jeffrey King',
    image: doc10,
    speciality: 'Pediatricians',
    degree: 'MBBS',
    experience: '2 Years',
    about: 'Dr. Jeffrey King offers expert care in childhood illnesses, developmental screenings, and nutritional guidance for growing children.',
    fees: 450,
    address: {
      line1: '31, Residency Road',
      line2: 'Ashok Nagar, Hyderabad, Telangana'
    }
  },
  {
    _id: 'doc11',
    name: 'Dr. Zoe Kelly',
    image: doc11,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Zoe Kelly is dedicated to treating neurological disorders including migraines, seizures, and neuropathies with evidence-based medicine.',
    fees: 700,
    address: {
      line1: '18, Sector 62',
      line2: 'Noida, Uttar Pradesh'
    }
  },
  {
    _id: 'doc12',
    name: 'Dr. Patrick Harris',
    image: doc12,
    speciality: 'Neurologist',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Patrick Harris is a Neurologist focused on disorders of the nervous system, offering comprehensive treatment plans for long-term relief.',
    fees: 700,
    address: {
      line1: '21, IT Park Road',
      line2: 'Mohali, Punjab'
    }
  },
  {
    _id: 'doc13',
    name: 'Dr. Aruna Sharma',
    image: doc13,
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. Aruna Sharma is an experienced General Physician known for her diagnostic acumen and effective treatment of infections, allergies, and metabolic disorders.',
    fees: 400,
    address: {
      line1: '15, Mall Road',
      line2: 'Amritsar, Punjab'
    }
  },
  {
    _id: 'doc14',
    name: 'Dr. Hrishikesh Pai',
    image: doc14,
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Hrishikesh Pai is a highly regarded Gynecologist with special expertise in IVF treatments, high-risk pregnancies, and menstrual disorders.',
    fees: 600,
    address: {
      line1: '9, Abids Road',
      line2: 'Hyderabad, Telangana'
    }
  },

  {
    _id: 'doc15',
    name: 'Dr. Amelia Hill',
    image: doc15,
    speciality: 'Gastroenterologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Amelia Hill is a Gastroenterologist skilled in diagnosing and treating digestive disorders like acidity, IBS, and liver-related ailments.',
    fees: 550,
    address: {
      line1: '27, Lalbagh Road',
      line2: 'Bangalore, Karnataka'
    }
  },
   {
    _id: 'doc16',
    name: 'Dr. suhail',
    image: doc16,
    speciality: 'Gastroenterologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. suhail is a Gastroenterologist skilled in diagnosing and treating digestive disorders like acidity, IBS, and liver-related ailments.',
    fees: 550,
    address: {
      line1: '27, Lalbagh Road',
      line2: 'Tambour, Sitapur'
    }
  }
]
