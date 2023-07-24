import './App.css';
import React from 'react';
import Pro_logo from './image/Pro_logo.svg';
import Button from '@material-ui/core/Button';
import { TextField } from "@material-ui/core";
import { Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle } from 'react-shapes';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { borderColor } from '@mui/system';
import imageicon from './imageicon.jsx';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import CitySelector from './components/CitySelector';
import { Container } from 'react-bootstrap';
import UseFetch from './hooks/UseFetch';
import { API_KEY, API_BASE_URL } from './apis/congif';
import WeatherList from './components/WeatherList';

function pumpStart(){
  alert('Pump Started');
}

function pumpStop(){
  alert('Pump Stopped');
}

function App() {


  const { data, error, isLoading, setUrl } = UseFetch();

  const getContent = () => {
    if (error) return <h2>Error when fetching: {error}</h2>
    if (!data && isLoading) return <h2>LOADING...</h2>
    if (!data) return null;
    return <WeatherList weathers={data.list} />
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 0.1,
        width: '75%',
      }}
    />
  );

  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);


  return (
    <>

    <div className="App">

      <div className="Header" style={{ display: "flex", justifyContent: "space-around", backgroundColor: "#f5f5f5 " }}>
        <img src={Pro_logo} alt="Pro logo" />
        <p>Last Updated : {' '}
          {dateState.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}, {' '}
          {dateState.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p>
      </div>

      <div className="App" style={{backgroundColor: "#ffffff"}}>



        {/* <p >
          {dateState.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
        </p> */}
      </div>

      <div class="DisplayButtons" style={{ paddingTop: "30px" }}>

        {/* color dot in inside button in react js */}

        <Button variant="outlined" style={{
          marginRight: "8%", borderWidth: 1,
          borderColor: '#AFAFAF',
          alignItems: 'center',
          justifyContent: 'center',
          height: '5%',
          width: '25%',
          backgroundColor: '#fff',
          borderWidth: 1.5,
          borderRadius: 20,
        }}><b style={{ fontFamily: "sans-serif", fontSize: "90%", marginRight: "3%" }}>System Status</b> <Circle r={12} fill={{ color: '#EBEF18' }} /></Button>
        <Button variant="outlined" style={{
          marginRight: "8%", borderWidth: 1,
          borderColor: '#AFAFAF',
          alignItems: 'center',
          justifyContent: 'center',
          height: '5%',
          width: '25%',
          backgroundColor: '#fff',
          borderColor: '#B4B4B4',
          borderWidth: 1.5,
          borderRadius: 20,
        }}><b style={{ fontFamily: "sans-serif", fontSize: "90%", marginRight: "3%" }}>Notifications</b>
          <Circle r={12} fill={{ color: '#EBEF18' }} /></Button>
        <Button variant="outlined" style={{
          borderWidth: 1,
          borderColor: '#AFAFAF',
          alignItems: 'center',
          justifyContent: 'center',
          height: '5%',
          width: '25%',
          backgroundColor: '#fff',
          borderColor: '#B4B4B4',
          borderWidth: 1.5,
          borderRadius: 20,
        }} ><b style={{ fontFamily: "sans-serif", fontSize: "90%", marginRight: "5%" }}></b>
          <Circle r={12} fill={{ color: '#3AB207' }} /></Button>

      </div>

      <div className="Enter_device" style={{ marginTop: "20px" }}>

        <TextField className="inputRounded" id="outlined-basic" label="Enter Device ID to add" variant="outlined" style={{ width: "30%" }} />
        <Button style={{ marginLeft: "12%", height: "50px", width: "30%", fontFamily: "sans-serif", color: "#F5F5F5", backgroundColor: "#0E6938", borderRadius: 15, }} variant="contained">Register</Button>

      </div>


      <div className="Solar" style={{}}>
        <Button variant="outlined" style={{
          marginTop: "50px",
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60px',
          width: '400px',
          borderColor: '#B4B4B4',
          borderWidth: 1.5,
          backgroundColor: '#fff',
          borderRadius: 20
        }}><b style={{ fontSize: "18x" }}>Solar Powered Battery</b><b style={{ color: "green", marginLeft: "10px", fontSize: "20px" }}> 80%</b> </Button>

      </div>
      <div className="line" style={{ marginTop: "30px" }}>
        <ColoredLine color="grey" />
      </div>

      <div class="DisplayButtons" style={{ marginBottom: "30px", display: "flex", justifyContent: "space-evenly" }}>

        <Button variant="outlined" href="#" style={{
          borderWidth: 1,
          borderColor: '#EE6002',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50px',
          width: '200px',
          backgroundColor: '#fff',
          borderRadius: 20,
          borderWidth: 1.5,
        }}><b style={{ fontFamily: "sans-serif", fontSize: "135%", color: "#5A5959" }}>Temperature</b></Button>
        <Button variant="outlined" href="#" style={{
          borderWidth: 1,
          borderColor: '#EE6002',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50px',
          width: '200px',
          backgroundColor: '#fff',
          borderRadius: 20,
          borderWidth: 1.5,
        }}><b style={{ fontFamily: "sans-serif", fontSize: "15px", color: "#5A5959" }}>PH Level</b></Button>
        <Button variant="outlined" href="#" style={{
          borderWidth: 1,
          borderColor: '#EE6002',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50px',
          width: '200px',
          backgroundColor: '#fff',
          borderRadius: 20,
          borderWidth: 1.5,
        }}><b style={{ fontFamily: "sans-serif", fontSize: "15px", color: "#5A5959" }}>Humidity</b></Button>
        <Button variant="outlined" onClick={{ backgroundColor: '#EE6002' }} href="#" style={{
          borderWidth: 1,
          borderColor: '#EE6002',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50px',
          width: '200px',
          backgroundColor: '#fff',
          borderRadius: 20,
          borderWidth: 1.5,
        }}><b style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#5A5959" }}>Check your Device Status</b></Button>

        <Button variant="outlined" href="#" style={{
          borderWidth: 1,
          borderColor: '#EE6002',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50px',
          width: '200px',
          backgroundColor: '#fff',
          borderRadius: 20,
          borderWidth: 1.5,
        }}><b style={{ fontFamily: "sans-serif", fontSize: "15px", color: "#5A5959" }}> Abormality Detection</b></Button>

      </div>

      <div className="line" style={{ marginTop: "60px" }}>
        <ColoredLine color="grey" />
      </div>

      <Container className="Apper">
          <CitySelector onSearch={(city) => setUrl(`${API_BASE_URL}/data/2.5/forecast?q=${city}&cnt=5&appid=${API_KEY}`)} />

          {/* conditionally render  */}
          {getContent()}
        </Container>

      <div className="Today_status" style={{ paddingBottom: "15px", paddingTop: "10px", backgroundColor:"#F5f5f5", padding : "10%"  }}>
        <div className="Today_status_header" style={{ fontSize: "25px", marginRight: "850px", fontFamily: "Noto Sans" }}>
          {/* <b style={{ fontWeight: "bold" }}>Today</b><VolumeUpIcon style={{ marginLeft: "20px" }} /> */}
        </div>
        {/* middle sectoin square */}
        <div className="midsquare" style={{ padding: "10%" , backgroundColor:"#3236a8"}}>
        <>
            <imageicon headline = "./logo512.png"/>
        </>
        </div>

      </div>

      <div className="Pump">
        <b style={{ fontSize: "30px", position:"relative"}}> Irrigation Pump Switch </b>

        
      </div>



      <div className="Options" style={{ display: "flex", justifyContent: "space-evenly", paddingBottom: "50px", backgroundColor:"f5f5f5" }}>
        <button onClick = {pumpStart} style = {{ backgroundColor: '#FFFFFF', width: "40%", height : "200px", borderColor: "#0E6938", borderWidth: "10px", borderRadius: "20px"   }}  >
          <p style = {{fontSize: "30px"}}>
            Start
          </p>
        </button>

        <button onClick = {pumpStop} style = {{ backgroundColor: '#FFFFFF', width: "40%", height : "200px", borderColor: "#B00020", borderWidth: "10px", borderRadius: "20px"   }}  >
          <p style = {{fontSize: "30px"}}>
            Stop
          </p>
        </button>
        {/* <Rectangle width={100} height={100} fill={{ color: '#FFFFFF' }} stroke={{ color: '#0E6938' }} strokeWidth={5} /> */}
        {/* <Rectangle width={100} height={100} fill={{ color: '#FFFFFF' }} stroke={{ color: '#B00020' }} strokeWidth={5} /> */}
      </div>


    </div>
    </>
  );
}

export default App;