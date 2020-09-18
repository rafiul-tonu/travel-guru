import React from 'react';
import InfoDetails from '../InfoDetails/InfoDetails';
import image from '../../Image/Rectangle 1.png';
import image2 from '../../Image/Sreemongol.png';
import image3 from '../../Image/sundorbon.png';





const Home = () => {
  
  

    const data = [
      { 
        name:'COX`S-BAZAR',
        image : image,
        description:'Cox,s Bazar (Bengali: কক্সবাজার) is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it is infamous for the largest refugee camp in the world. It is located 150 km (93 mi) south of the divisional headquarter city of Chittagong.'
      },

      { 
        name:'SREEMANGAL',
        image: image2,
        description:'Sreemangal (Bengali: শ্রীমঙ্গল, romanized: Srimongol) is an Upazila of Moulvibazar District in the Sylhet Division of Bangladesh.  It is said the name Sreemangal (or Srimangal) is named after Sri Das and Mangal Das; two brothers who settled on the banks of the Hail Haor.  A copper plate of Raja Marundanath from the 11th century was found in Kalapur. During an excavation at Lamua, an ancient statue of Ananta Narayan was dug out. In 1454, the Nirmai Shiva Bari was built and still stands today. Srimangal thana was established in 1912.'

      },
      { 
        name:'SUNDARBANS',
        image: image3,
        description:'The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal. It spans from the Hooghly River in India,s state of West Bengal to the Baleswar River in Bangladesh. It comprises closed and open mangrove forests, agriculturally used land, mudflats and barren land, and is intersected by multiple tidal streams and channels.'
      },
  
    ]
    
  return (
    <div> 
      {
        data.map(item =><InfoDetails item={item} ></InfoDetails>)
      }
     </div>
  );
};

export default Home;