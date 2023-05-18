import React from "react";
import { useEffect, useRef, useState } from "react";

const Weather = () => {
  const weatherData = useRef([]);
  const lattitude = useRef("");
  const longitude = useRef("");
  const [cityName, setCityName] = useState(" ");
  const [temp, setTemp] = useState(" ");
  const [maxTemp1, setMaxTemp1] = useState(" ");
  const [minTemp1, setMinTemp1] = useState(" ");
  const [maxTemp2, setMaxTemp2] = useState(" ");
  const [minTemp2, setMinTemp2] = useState(" ");
  const [maxTemp3, setMaxTemp3] = useState(" ");
  const [minTemp3, setMinTemp3] = useState(" ");
  const [tommorow, setTommorow] = useState("");
  const [day2, setDay2] = useState("");
  const [day3, setDay3] = useState("");
  // const API_endpoint = `https://api.openweathermap.org/data/2.5/forecast?`;
  // const API_key = `appid=2ae0337d04286db6d41ea6c633a0005f`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      lattitude.current = position.coords.latitude;
      longitude.current = position.coords.longitude;
      weatherUpdate();
    });

    // let finalApi = `${API_endpoint}lat=${+lattitude.current}&lon=${+longitude.current}&units=metric&${API_key}`;
    // axios.get(finalApi).then((response) => {
    //   console.log(response.data);
    // });
  }, []);

  // useEffect(() => {
  //   const citydata = JSON.parse(window.localStorage.getItem("cityName"));
  //   cityName(citydata);
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("cityName", cityName);
  // }, [cityName]);
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const getDay = (day) => {
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayName = days[new Date(day).getDay()];
    var date = new Date(day).getDate();
    return dayName + -date;
  };

  const weatherUpdate = async () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${+lattitude.current}&lon=${+longitude.current}&units=metric&appid=2ae0337d04286db6d41ea6c633a0005f`;
    let data = await fetch(url);
    let parseData = await data.json();
    weatherData.current = parseData;
    console.log(weatherData.current);
    setCityName(weatherData.current.city.name);
    setTemp(weatherData.current.list[0].main.temp);
    setMaxTemp1(weatherData.current.list[10].main.temp_max);
    setMinTemp1(weatherData.current.list[10].main.temp_min);
    setMaxTemp2(weatherData.current.list[20].main.temp_max);
    setMinTemp2(weatherData.current.list[20].main.temp_min);
    setMaxTemp3(weatherData.current.list[30].main.temp_max);
    setMinTemp3(weatherData.current.list[30].main.temp_min);
    setTommorow(weatherData.current.list[10].dt_txt);
    setDay2(weatherData.current.list[20].dt_txt);
    setDay3(weatherData.current.list[30].dt_txt);
  };

  // if (cityName.current === "") {
  //   useForceUpdate();
  // }
  // useEffect(
  //   () => {
  //     weatherUpdate();
  //   }, // eslint-disable-next-line
  //   []
  // );

  return (
    <>
      <div className="card" style={{ height: "100%" }}>
        <img
          src="images/weather.jpg"
          alt="weather"
          className="position-relative"
          style={{ height: "300px", borderRadius: "15px" }}
        />
        <div className="card-body position-absolute d-flex flex-column justify-content-center w-100">
          <h2 className="text-center mb-2">{cityName}</h2>
          <h6 className="text-center mb-3">{formatAMPM(new Date())}</h6>
          <img src="images/suny.svg" alt="weather" style={{ height: "50px" }} />
          <h1 className="text-center">{temp + "° C"}</h1>
          <div className="row d-flex py-3 px-4">
            <div className="col-4">
              <p className="mb-0">{getDay(tommorow)}</p>
              <p className="mb-0">Max : {maxTemp1 + "° C"}</p>
              <p className="mb-0">Min : {minTemp1 + "° C"}</p>
            </div>
            <div className="col-4">
              <p className="mb-0">{getDay(day2)}</p>
              <p className="mb-0">Max : {maxTemp2 + "° C"}</p>
              <p className="mb-0">Min : {minTemp2 + "° C"}</p>
            </div>
            <div className="col-4">
              <p className="mb-0">{getDay(day3)}</p>
              <p className="mb-0">Max : {maxTemp3 + "° C"}</p>
              <p className="mb-0">Min : {minTemp3 + "° C"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Weather);
