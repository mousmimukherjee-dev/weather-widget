import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import type { ApiProps } from "../../types/ApiProps"
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';


export const InfoBox=({info}:{info : ApiProps | null})=>{

const  Sunny_url="https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const  Rainy_url="https://images.unsplash.com/photo-1599806112354-67f8b5425a06?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const winter_url="https://images.unsplash.com/photo-1641672222794-536ad524a929?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
const[infoBox , setInfobox] = useState<ApiProps | null>(info)


const handleSave=()=>{

  if(!infoBox)return;

  localStorage.setItem("save-search", JSON.stringify(infoBox))
}


useEffect(()=>{

if(!info) return

setInfobox(info)
  
},[info])

  return(


    <Card sx={{ maxWidth: 400 , mt: 6, width: "100%" , marginBottom : "30px"}}>
      <CardMedia
        sx={{ height: 194 }}
        image={
        infoBox?.main?.humidity != null && infoBox.main.humidity > 80 ? Rainy_url : infoBox?.main?.temp != null && infoBox.main.temp > 15 ? Sunny_url: winter_url}
        title="green iguana"
      />
       {infoBox && <CardContent sx={{width:300}}>
        <Typography gutterBottom variant="h5" component="div" sx={{texAlign : "centre"}}>
        {infoBox?.name}{
        infoBox?.main?.humidity != null && infoBox.main.humidity > 80 ? <ThunderstormIcon /> : infoBox?.main?.temp != null && infoBox.main.temp > 15 ? <SunnyIcon /> : <AcUnitIcon />}
        </Typography>
       <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary'}}><br></br>
        Temprature= {Math.floor(infoBox?.main.temp)}&deg;C<br></br>
        Max Temp={Math.floor(infoBox?.main.temp_max)}&deg;C<br></br>
        Min Temp={Math.floor(infoBox?.main.temp_min)}&deg;C<br></br>
        The weather can be described as {infoBox?.weather[0].description} feels like {infoBox?.main?.feels_like}&deg;C
        </Typography>
        </Box>
       <Button onClick={handleSave}>Save Search</Button>
      </CardContent>}
      
      
    </Card>
   


  )
}