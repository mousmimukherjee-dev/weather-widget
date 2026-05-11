import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import type { ApiProps } from '../../types/ApiProps';
import { InfoBox } from '../InfoBox';
import { Typography } from '@mui/material';




export const SearchBox=()=>{

  const[city, setCity] = useState("")
  const[error, setError] = useState(false)
  const[searchRes, setSearchRes] = useState<ApiProps | null>(null)
  const apiKey= import.meta.env.VITE_WEATHER_API_KEY

  const handleChange=(e : React.ChangeEvent<HTMLInputElement>)=>{

   
    setCity(e.target.value)
  }

  const fetchWeather= async (e : React.FormEvent)=>{

    e.preventDefault();
    
     
    const URL= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
     if(!city.trim()) return 
     try{

      const res = await fetch(URL);
     
      const data = await res.json();
       if(!res.ok) {
      
        setSearchRes(null);
        setCity("")
        setError(true)
        console.log("city not found")
        return
        
      }
      setSearchRes(data)
      setCity("")
      setError(false)
     }
     catch(error){

     

      console.log(error)
     }
     
   
    
  }


  useEffect(()=>{

  const savedData= localStorage.getItem("save-search")

  if(savedData){

    setSearchRes(JSON.parse(savedData))
  }
  },[])


  return(

  <Box sx={{textAlign:"center", display:"flex",flexDirection:"column",justifyContent:"flex-start",alignItems:"center",margin:"0 auto", minHeight: "100vh",
 backgroundImage:"url(/background.jpg)",
 backgroundPosition:{

  xs: "center",
  md:"center"
 } ,
 backgroundSize:{

  xs: "cover",
  md:"cover"
 } ,
 backgroundRepeat: "no-repeat"}}>
      <Typography variant='h3' sx={{m: 7 , color: "snow"}}>Weather Widget</Typography>
      <Box sx={{textAlign:"center",width: "300px", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",margin:"0 auto"} }>
       
       <form onSubmit={fetchWeather} >
         <TextField value={city} id="city" label="City Name" variant="outlined"   required onChange={handleChange} sx={{input:{color:"snow"},label:{color:"snow"}}}/>
          <Button type="submit" variant="contained" loadingPosition="center" sx={{mt : 4}} >Search</Button>      
      </form>
      
      {error === true ? <Typography variant='h5' sx={{color: "red", mt: 6}}>City Not Found</Typography> : ""}
      {searchRes && <InfoBox info={searchRes}/>}
      

      </Box>
      
    </Box>
  )
}