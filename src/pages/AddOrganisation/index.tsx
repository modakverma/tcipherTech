import mapUrl from "../../assets/images/login-signup/map.png";
import { FormInput,  FormLabel, FormSelect } from "../../base-components/Form";
import Button from "../../base-components/Button";
import uploadImg from '../../assets/images/login-signup/upload-img.svg'
import { useEffect, useRef, useState } from "react";
import CropImage from "../../components/AddOrganisation/CropImage";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete
} from '@react-google-maps/api';
import { handleGetRequest } from "../../utils/http";
import { twMerge } from "tailwind-merge";

interface coordinates{
  lat:number;
  lng:number;
}
function AddOrganisation() {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey:'AIzaSyAL32gbjsd38_G903WF_4k3PYWdNMSaFkE', // provide API key
    libraries:['places'],
  })
  const [center,setCenter] = useState<coordinates>({
    "lat":31.1048,
    "lng":77.1734,
  }) 
  const getLocationParams =async()=>{
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${center.lat}&lon=${center.lng}`;
    const {address} = await handleGetRequest(url)
    setCountry(address.country);
    setPinCode(address.postcode);
  }
  const [map,setMap] = useState<google.maps.Map | null>(null);
  const [currency,setCurrency] = useState(""); //*
  const [language,setLanguage] = useState(""); //*
  const [country,setCountry] = useState<string>(""); //*
  const [businessAddress,setBusinessAddress] = useState<string>(""); //*
  const [pinCode,setPinCode] = useState<string | number | readonly string[] | undefined>("");
  const [showImageCrop,setShowImageCrop] = useState(false);
  const [alertMsg,setAlertMsg] = useState<null | string>(null);
  const [logo,setLogo] = useState<null | string | File>(null);
  const [croppedLogo,setCroppedLogo] = useState(null);


  const [currencies,setCurrencies] = useState<Array<string>>([]);
  const [languages,setLanguages] =useState<Array<string>>([]);

    // getting currency parameter
    const getCurrencies = async()=>{
      const url = `https://restcountries.com/v3.1/independent?status=true&field=currencies`
      const data = await handleGetRequest(url);
      const currencyArray:Array<string> =[];
      const languageSet = new Set();
      data.forEach(({currencies,flag,languages}:{ currencies: { [key: string]: { name: string; symbol: string } }; flag: string; languages: Array<string> })=>{
        const currencyCode = Object.keys(currencies)[0] as string;
        const innerObject = currencies[currencyCode];
        const currencyName = innerObject.name;
        const currencySymbol = innerObject.symbol;
        currencyArray.push('('+currencySymbol+')'+' '+currencyName+' '+flag);
        const languageKey = Object.keys(languages)[0];
        const lang = languages[languageKey];
        languageSet.add(lang)
      })
      const languagesArray:Array<string> =[...languageSet];
      languagesArray.sort()
      currencyArray.sort()
      setLanguages(languagesArray)
      setCurrencies(currencyArray);
  }

  const originRef = useRef<HTMLInputElement >(null);
  const handlePlaceChange = () => {
    if (originRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        originRef.current
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const coordinates = place.geometry.location;
          const latitude = coordinates.lat();
          const longitude = coordinates.lng();
          setCenter({
            lat:latitude,
            lng:longitude
          })
        }
      });
    }
  };

  const handleLogoUpload=({target:{files}}:{ target: { files: FileList }})=>{
    if(files){
      if(validateImageSize(files[0])){
        console.log(files[0])
        setShowImageCrop(true);
        setLogo(URL.createObjectURL(files[0]))
        setAlertMsg(null)
      }
      else{
        setAlertMsg("logo size greater than 2MB")
      }
    }
  }
  const validateImageSize=(file:File)=>{
    const limit = 2000;
    const imageSize = file.size/1024;
    if(imageSize>limit){
     setAlertMsg("File size is greater than 2 MBs");
     setCroppedLogo(null)
     return false;
    }
    else{
     return true;
    }
 }
 const getCroppedImageFromChild=(childData,showModal:Boolean)=>{
  if(childData){
    setCroppedLogo(childData);
    console.log("this is the cropped image",childData)
  }
  setShowImageCrop(showModal)
 }
 useEffect(()=>{
  getLocationParams();
  getCurrencies();
},[center])

  return (
   <div className="w-full h-screen overflow-y-auto overflow-x-hidden bg-[#E8EFF8]">
     {
       showImageCrop &&
        <CropImage logoImg={logo} croppedLogoImg={croppedLogo} getCroppedImageFromChild={getCroppedImageFromChild} />
     }
      <div className="w-full h-auto flex flex-col gap-8 items-center px-6 sm:px-32 py-32">
      <div className="flex justify-between w-full pr-10">
      <h1 className="font-medium text-2xl">Add Business Information</h1>
      <Button className='bg-[#04032D] flex gap-2 font-light py-2 text-white px-6 rounded-xl group'>
        Continue
      <span className="
          scale-120
          group-hover:scale-130
          group-hover:translate-y-1
          group-hover:translate-x-1
          transition">&rarr;
      </span>
      </Button>
           

      </div>
      <div className="p-8 gap-4 flex flex-col lg:flex-row bg-[#FFF] w-full min-h-[10rem] rounded-lg">
        <div className="flex flex-col gap-8 lg:w-[40%]">
           <div>
           <FormLabel>Language</FormLabel>
           <FormSelect
           onChange={(e)=>setLanguage(e.target.value)}
           >
        <option>Select</option>
        {languages.map((item)=>(
        <option>{item}</option>
        ))
        }
    </FormSelect>
           </div>
           <div className="flex gap-4">
           <div className="w-1/2">
           <FormLabel>Country</FormLabel>
           <FormInput 
           value={country}
           placeholder="Select"/>
           </div>
           <div className="w-1/2">
           <FormLabel>Currency</FormLabel>
           <FormSelect
           onChange={(e)=>setCurrency(e.target.value)}>
           <option 
           hidden
           className="text-slate-300"
           >Select</option>
           {currencies.map((item)=>(
            <option>{item}</option>
           ))}
         </FormSelect>
          </div>
          </div>
           {/* === logo upload === */}
          <div className="flex flex-col">
          <FormLabel>Upload Business Logo</FormLabel>
          <div className="relative h-auto w-full flex flex-col cursor-pointer">
            <FormInput 
            className={twMerge([
              alertMsg && 'border-red-400 focus:border-red-400',
              croppedLogo && 'border-green-400 focus:border-green-400'
            ])}
            onChange={handleLogoUpload}
            accept="image/*"
            type="file"
             />
            <div className="absolute w-full h-full text-[#7664FE] flex items-center flex-col justify-center">
              {croppedLogo===null ? 
              <>
              <img src={uploadImg} alt="upload-img"/>
              <h1>Upload a file or drag and drop</h1>
              </>:
              <>
              <h1 className="text-green-600">chosen &#10003;</h1>
              <div className=" w-20 rounded-md overflow-hidden">
              {/* <img src={croppedLogo} alt="cropped-logo" className=" object-contain" /> */}
              </div>
              </>
              }
              {alertMsg==null?croppedLogo!==null?<></>:
                <h1 className="text-slate-400 text-sm font-light">Documents up to 2MB</h1>:
                <h1 className="text-red-400 text-sm font-normal">{alertMsg}</h1>
              }
              </div>
          </div>
          </div>

           <div>
           <FormLabel>Business Name</FormLabel>
           <FormInput 
           placeholder="Ex. Google"/>
           </div>
        </div>

          <div className="bg-[#E5E5E5] w-[1.5px] mx-5 xl:mx-10 2xl:mx-20"></div>
      
        <div className=" flex flex-col gap-8 lg:w-[60%]">
        <div>
        <FormLabel>Business Address</FormLabel>
         {isLoaded &&
         <Autocomplete>
         <FormInput 
          onChange={handlePlaceChange}
          ref={originRef}
          placeholder="Search business address here"/>
         </Autocomplete>
        }
        </div>
        <div className=" h-80 w-full bg-slate-200 rounded-xl overflow-hidden">
        <div className=" h-full w-full">
       {isLoaded ?
         <GoogleMap 
         center={center} 
         zoom={15}
         mapContainerStyle={{
           width:'100%',
           height:'100%'
         }}
         options={{
           streetViewControl:false,
           mapTypeControl:false
         }}
         onLoad={(map)=>setMap(map)}
         >
           <Marker position={center}/>
         </GoogleMap>
         :
         <img src={mapUrl} alt="map" className="h-full w-full" />
      }
       </div>
      </div>
        <div className="flex gap-4">
          <div>
          <FormLabel className="whitespace-nowrap">Business Latitude</FormLabel>
          <FormInput 
          value={center.lat}
          placeholder="Select"/>
          </div>
          <div>
          <FormLabel className=" whitespace-nowrap">Business Longitude</FormLabel>
          <FormInput 
          value={center.lng}
          placeholder="Select"/>
          </div>
          <div>
          <FormLabel className=" whitespace-nowrap">Pincode</FormLabel>
          <FormInput 
          value={pinCode}
          placeholder="Select"/>
          </div>
        </div>
        </div>
        </div>
    </div>
   </div>
  );
}
export default AddOrganisation;