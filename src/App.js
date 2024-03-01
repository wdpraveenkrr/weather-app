import axios from "axios";
import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { FaTemperatureHigh } from "react-icons/fa";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { WiHumidity } from "react-icons/wi";
import { WiDayWindy } from "react-icons/wi";
import { IoBatteryHalf } from "react-icons/io5";
import { GiNetworkBars } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import "./App.css";
import Data from "./Data";

function App() {
  const [info, setInfo] = useState("");
  const [city, setCity] = useState(null);

  const [charCount, setCharCount] = useState(0);
  const [seebutton, setSeeButton] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  const pictures = [
    {
      name: "Clouds",
      src: "https://cdn-icons-png.flaticon.com/128/414/414927.png",
    },
    {
      name: "Clear",
      src: "https://cdn-icons-png.flaticon.com/128/3222/3222800.png",
    },
    {
      name: "Smoke",
      src: "https://cdn-icons-png.flaticon.com/128/11717/11717603.png",
    },
    {
      name: "Snow",
      src: "https://cdn-icons-png.flaticon.com/128/2315/2315309.png",
    },
    {
      name: "Rain",
      src: "https://cdn-icons-png.flaticon.com/128/2469/2469994.png",
    },
    {
      name: "Haze",
      src: "https://cdn-icons-png.flaticon.com/128/1779/1779807.png",
    },
    {
      name: "Drizzle",
      src: "https://cdn-icons-png.flaticon.com/128/5113/5113614.png",
    },
    {
      name: "Mist",
      src: "https://cdn-icons-png.flaticon.com/128/4005/4005817.png",
    },
  ];

  useEffect(() => {
    var myapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35ee61165ceaa838ca77693876236409`;

    if (city !== null) {
      axios
        .get(myapi)
        .then((response) => {
          setInfo(response.data);
        })
        .catch((err) => {
          setInfo(err.response.data);
        });
    }
  }, [city]);

  const generateReport = () => {
    setCity(document.getElementById("cn").value);
    setIsVisible(false);
  };

  const disp = () => {
    window.location.reload();
  };

  const inputs = () => {
    setSeeButton(true);
  };

  return (
    <>
      <div className="App">
        {isVisible && (
          <div className="Login-container">
            <div className="notch"></div>
            <div className="icons">
              {" "}
              <GiNetworkBars />
              <FaWifi />
              <IoBatteryHalf />
            </div>
            <div className="time">
              <Data />
            </div>

            <div className="date-day">
              <h1>Weather-App</h1>
            </div>

            <div className="input-design">
              <label>City Name : </label>
              <br></br>
              <input
                type="text"
                id="cn"
                placeholder="Enter a City Name"
                onFocus={inputs}
                onChange={(e) => setCharCount(e.target.value.length)}
              />
              <br></br>
              {charCount > 2 && seebutton && (
                <button
                  className="btn"
                  onClick={(event) => generateReport(event)}
                >
                  Weather Report
                </button>
              )}
            </div>
          </div>
        )}

        {!isVisible && (
          <div className="output-container">
            <div className="notch"></div>

            <div className="Output-design">
              {info.cod === 200 && (
                <>
                  <div className="output-result">
                    <div className="icons">
                      {" "}
                      <GiNetworkBars />
                      <FaWifi />
                      <IoBatteryHalf />
                    </div>
                    <h3 style={{ marginBottom: "0px" }}>
                      <FaLocationDot />
                      {info.name}
                    </h3>
                  </div>
                  <div className="climate-description">
                    <p>{info.weather[0].main}</p>

                    <div className="weather-pic">
                      {pictures
                        .filter((e) => e.name === info.weather[0].main)
                        .map((item) => (
                          <img src={item.src} alt="#" />
                        ))}

                      <div></div>
                    </div>
                  </div>
                  <div className="message">
                    <div className="description">
                      <p className="des">
                        <MdDescription /> Description
                      </p>
                      <p>{info.weather[0].description}</p>
                    </div>

                    <div className="temperature-container">
                      <div className="temp-name">
                        <p>
                          <FaTemperatureHigh /> Temperature
                        </p>
                      </div>
                      <div className="temperature">
                        <div className="kelvin">
                          {" "}
                          <p
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            {info.main.temp}
                            <sup>
                              <small>o</small>
                            </sup>
                            K
                          </p>{" "}
                        </div>
                        <div className="celcius">
                          {" "}
                          <p
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            {(info.main.temp - 273.15).toFixed(2)}
                            <sup>
                              <small>o</small>
                            </sup>{" "}
                            C
                          </p>{" "}
                        </div>
                        <div className="Fahrenheit">
                          {" "}
                          <p
                            style={{ backgroundColor: "black", color: "white" }}
                          >
                            {((info.main.temp - 273.15) * (9 / 5) + 32).toFixed(
                              2
                            )}
                            <sup>
                              <small>o</small>
                            </sup>{" "}
                            F
                          </p>{" "}
                        </div>
                      </div>
                    </div>

                    <div className="lat-lan">
                      <div className="latitude">
                        {" "}
                        <p>
                          <TbWorldLatitude /> Latitude
                        </p>
                        <p>{info.coord.lat} </p>{" "}
                      </div>
                      <div className="longitude">
                        {" "}
                        <p>
                          <TbWorldLongitude /> Longitude
                        </p>
                        <p>{info.coord.lon} </p>{" "}
                      </div>
                    </div>

                    <div className="sunrise-set">
                      <div className="sunrise">
                        {" "}
                        <p>
                          <GiSunrise /> Sunrise
                        </p>
                        <p>
                          {new Date(
                            info.sys.sunrise * 1000
                          ).toLocaleTimeString()}
                        </p>{" "}
                      </div>
                      <div className="sunset">
                        {" "}
                        <p>
                          <GiSunset /> Sunset
                        </p>
                        <p>
                          {new Date(
                            info.sys.sunset * 1000
                          ).toLocaleTimeString()}
                        </p>{" "}
                      </div>
                    </div>

                    <div className="humidity-wind">
                      <div className="humidity">
                        {" "}
                        <p>
                          <WiHumidity /> Humidity
                        </p>
                        <p>{info.main.humidity} %</p>{" "}
                      </div>
                      <div className="wind">
                        {" "}
                        <p>
                          <WiDayWindy /> Wind Speed
                        </p>
                        <p>{info.wind.speed} km/h</p>{" "}
                      </div>
                    </div>
                  </div>
                  <button className="clear" onClick={disp}>
                    clear
                  </button>{" "}
                </>
              )}

              {info.cod === "404" && (
                <>
                  <h2>City Not Found</h2>
                  <button className="clear" onClick={disp}>
                    clear
                  </button>
                  <div>
                    <div>
                      <h2>404</h2>
                      <p>Got lost?</p>
                      <p style={{ fontWeight: "bold" }}>
                        {" "}
                        &copy; wdpraveenkrr 2024
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default App;
