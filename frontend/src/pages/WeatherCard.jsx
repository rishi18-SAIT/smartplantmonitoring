import React, { useEffect, useState, useCallback } from "react";
import "./WeatherCard.css";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    const apiKey = "d64ee9a3a74c9af0a8377ed662510cdf";
    
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);
      
      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(forecastData.list.slice(0, 5));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setLoading(false);
    }
  }, []);

  const success = useCallback((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherByCoords(lat, lon);
  }, [fetchWeatherByCoords]);

  const error = useCallback(() => {
    setLoading(false);
    alert("Unable to fetch location. Please search for a city.");
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, [success, error]);

  const fetchWeatherByCity = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    const apiKey = "d64ee9a3a74c9af0a8377ed662510cdf";
    
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);
      
      if (!weatherRes.ok) {
        alert("City not found. Please try again.");
        setLoading(false);
        return;
      }
      
      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(forecastData.list.slice(0, 5));
      setSearchCity("");
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather:", err);
      alert("Error fetching weather data.");
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWeatherByCity(searchCity);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const formatHour = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short"
    });
  };

  const getWeatherIcon = (main) => {
    switch(main) {
      case "Clear": return "☀️";
      case "Clouds": return "☁️";
      case "Rain": return "🌧️";
      case "Snow": return "❄️";
      case "Thunderstorm": return "⛈️";
      case "Drizzle": return "🌦️";
      case "Mist":
      case "Fog": return "🌫️";
      default: return "🌤️";
    }
  };

  const getUVIndex = () => {
    return Math.floor(Math.random() * 11);
  };

  if (loading) {
    return (
      <div className={`weather-app ${darkMode ? 'dark' : ''}`}>
        <div className="loading-screen">Fetching Weather...</div>
      </div>
    );
  }

  return (
    <div className={`weather-app ${darkMode ? 'dark' : ''}`}>
      {/* Top Bar */}
      <div className="top-bar">
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          <div className="toggle-circle"></div>
          <span>Dark Mode</span>
        </button>

        <div className="search-bar-top">
          <svg className="search-icon-top" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for your preferred city..."
            className="search-input-top"
          />
        </div>

        <button className="current-location-btn" onClick={getCurrentLocation}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>
          </svg>
          Current Location
        </button>
      </div>

      {weather && (
        <div className="weather-content-grid">
          {/* Time Card */}
          <div className="time-card card">
            <h2 className="city-name">{weather.name}</h2>
            <div className="current-time">{getCurrentTime()}</div>
            <div className="current-date">{getCurrentDate()}</div>
          </div>

          {/* Main Weather Card */}
          <div className="main-weather card">
            <div className="temp-section">
              <div className="temp-main">{Math.round(weather.main.temp)}°C</div>
              <div className="feels-like-main">Feels like: {Math.round(weather.main.feels_like)}°C</div>
            </div>

            <div className="weather-icon-section">
              <div className="weather-icon-large">{getWeatherIcon(weather.weather[0].main)}</div>
              <div className="weather-condition">{weather.weather[0].main}</div>
            </div>

            <div className="sun-times">
              <div className="sun-time">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v8M12 10a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z"></path>
                  <path d="M17 14v8M7 14v8"></path>
                </svg>
                <div>
                  <div className="label">Sunrise</div>
                  <div className="value">{formatTime(weather.sys.sunrise)}</div>
                </div>
              </div>
              <div className="sun-time">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22v-8M12 14a4 4 0 0 1-4-4h8a4 4 0 0 1-4 4z"></path>
                  <path d="M17 10V2M7 10V2"></path>
                </svg>
                <div>
                  <div className="label">Sunset</div>
                  <div className="value">{formatTime(weather.sys.sunset)}</div>
                </div>
              </div>
            </div>

            <div className="weather-stats">
              <div className="stat-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
                <div className="stat-value">{weather.main.humidity}%</div>
                <div className="stat-label">Humidity</div>
              </div>
              <div className="stat-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
                </svg>
                <div className="stat-value">{Math.round(weather.wind.speed)}km/h</div>
                <div className="stat-label">Wind Speed</div>
              </div>
              <div className="stat-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                <div className="stat-value">{weather.main.pressure}hPa</div>
                <div className="stat-label">Pressure</div>
              </div>
              <div className="stat-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>
                </svg>
                <div className="stat-value">{getUVIndex()}</div>
                <div className="stat-label">UV</div>
              </div>
            </div>
          </div>

          {/* 5 Days Forecast */}
          <div className="forecast-card card">
            <h3 className="card-title">5 Days Forecast:</h3>
            <div className="forecast-list">
              {forecast && forecast.list.filter((_, idx) => idx % 8 === 0).slice(0, 5).map((day, idx) => (
                <div key={idx} className="forecast-item">
                  <div className="forecast-icon-small">{getWeatherIcon(day.weather[0].main)}</div>
                  <div className="forecast-temp">{Math.round(day.main.temp)}°C</div>
                  <div className="forecast-day">
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", { 
                      weekday: "long", 
                      day: "numeric",
                      month: "short"
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Forecast */}
          <div className="hourly-card card">
            <h3 className="card-title">Hourly Forecast:</h3>
            <div className="hourly-list">
              {hourlyForecast && hourlyForecast.map((hour, idx) => (
                <div key={idx} className="hourly-item">
                  <div className="hour-time">{formatHour(hour.dt)}</div>
                  <div className="hour-icon">{getWeatherIcon(hour.weather[0].main)}</div>
                  <div className="hour-temp">{Math.round(hour.main.temp)}°C</div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="wind-icon">
                    <path d="M12 2L6 12h12L12 2z"></path>
                  </svg>
                  <div className="hour-wind">{Math.round(hour.wind.speed)}km/h</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}