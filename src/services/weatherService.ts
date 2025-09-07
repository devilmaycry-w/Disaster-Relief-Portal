// OpenWeatherMap API Service for real-time disaster data
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  icon: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  feelsLike: number;
}

export interface FloodAlert {
  type: string;
  severity: string;
  title: string;
  description: string;
  start: number;
  end: number;
}

export interface CycloneData {
  name: string;
  category: string;
  windSpeed: number;
  pressure: number;
  location: {
    lat: number;
    lng: number;
  };
  movement: {
    speed: number;
    direction: number;
  };
}

export class WeatherService {
  // Get current weather data
  static async getCurrentWeather(lat: number, lng: number): Promise<WeatherData | null> {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();

      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        uvIndex: 0, // Will be updated from One Call API
        feelsLike: Math.round(data.main.feels_like)
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return null;
    }
  }

  // Get detailed weather data including alerts (using free tier)
  static async getDetailedWeather(lat: number, lng: number) {
    try {
      // Use forecast API for free tier instead of One Call 3.0
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }

      const data = await response.json();

      // Transform forecast data to match expected format
      return {
        alerts: [], // Free tier doesn't include alerts
        current: {
          temp: data.list[0].main.temp,
          humidity: data.list[0].main.humidity,
          wind_speed: data.list[0].wind.speed,
          wind_deg: data.list[0].wind.deg,
          weather: data.list[0].weather,
          visibility: data.list[0].visibility || 10000
        },
        daily: data.list.slice(0, 8).map((item: {
          main: { temp: number };
          weather: { id: number; main: string; description: string; icon: string }[];
          pop?: number;
        }) => ({
          temp: { day: item.main.temp },
          weather: item.weather,
          pop: item.pop || 0
        }))
      };
    } catch (error) {
      console.error('Error fetching detailed weather:', error);
      return null;
    }
  }

  // Get weather alerts (basic implementation for free tier)
  static async getWeatherAlerts(lat: number, lng: number): Promise<FloodAlert[]> {
    try {
      const data = await this.getDetailedWeather(lat, lng);
      if (!data) return [];

      const alerts: FloodAlert[] = [];

      // Check for heavy rain in forecast (basic flood risk detection)
      data.daily.forEach((day: {
        pop?: number;
        temp?: { day?: number };
        weather?: { id: number; main: string; description: string; icon: string }[];
      }, index: number) => {
        if (day.pop && day.pop > 0.7) { // 70% chance of rain
          alerts.push({
            type: 'rain',
            severity: 'moderate',
            title: 'Heavy Rain Warning',
            description: `High chance of rain (${Math.round(day.pop * 100)}%) expected. Monitor for potential flooding.`,
            start: Date.now() + (index * 24 * 60 * 60 * 1000),
            end: Date.now() + ((index + 1) * 24 * 60 * 60 * 1000)
          });
        }
      });

      // Check current conditions for immediate alerts
      if (data.current) {
        if (data.current.weather[0].main.toLowerCase().includes('rain') ||
            data.current.weather[0].main.toLowerCase().includes('storm')) {
          alerts.unshift({
            type: 'weather',
            severity: 'minor',
            title: 'Current Weather Alert',
            description: `${data.current.weather[0].description}. Stay alert for changing conditions.`,
            start: Date.now(),
            end: Date.now() + (3 * 60 * 60 * 1000) // 3 hours
          });
        }
      }

      return alerts;
    } catch (error) {
      console.error('Error generating weather alerts:', error);
      return [];
    }
  }

  // Get cyclone/tropical storm data
  static async getCycloneData(): Promise<CycloneData[]> {
    try {
      // For India region, we'll check major coastal areas
      const coastalLocations = [
        { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
        { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
        { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 }
      ];

      const cycloneData: CycloneData[] = [];

      for (const location of coastalLocations) {
        const weather = await this.getCurrentWeather(location.lat, location.lng);
        if (weather && weather.windSpeed > 20) { // Winds > 20 m/s indicate storm conditions
          cycloneData.push({
            name: `Storm near ${location.name}`,
            category: this.getCycloneCategory(weather.windSpeed),
            windSpeed: weather.windSpeed,
            pressure: weather.pressure,
            location: { lat: location.lat, lng: location.lng },
            movement: { speed: 0, direction: 0 } // Would need additional API for movement
          });
        }
      }

      return cycloneData;
    } catch (error) {
      console.error('Error fetching cyclone data:', error);
      return [];
    }
  }

  // Get 5-day weather forecast
  static async getWeatherForecast(lat: number, lng: number) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      return null;
    }
  }

  // Get weather map overlay URL for Leaflet
  static getWeatherMapLayer(layer: 'precipitation' | 'clouds' | 'temperature' | 'wind'): string {
    const layerMap = {
      precipitation: 'precipitation_new',
      clouds: 'clouds_new',
      temperature: 'temp_new',
      wind: 'wind_new'
    };

    return `https://tile.openweathermap.org/map/${layerMap[layer]}/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`;
  }

  // Get air quality data
  static async getAirQuality(lat: number, lng: number) {
    try {
      const response = await fetch(
        `${BASE_URL}/air_pollution?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Air quality API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching air quality:', error);
      return null;
    }
  }

  // Helper methods
  private static getCycloneCategory(windSpeed: number): string {
    if (windSpeed >= 67) return 'Category 5';
    if (windSpeed >= 58) return 'Category 4';
    if (windSpeed >= 50) return 'Category 3';
    if (windSpeed >= 43) return 'Category 2';
    if (windSpeed >= 33) return 'Category 1';
    return 'Tropical Storm';
  }

  // Check if weather indicates flood risk
  static isFloodRisk(weather: WeatherData): boolean {
    return (
      weather.humidity > 90 ||
      weather.description.toLowerCase().includes('flood') ||
      weather.description.toLowerCase().includes('heavy rain') ||
      weather.description.toLowerCase().includes('storm')
    );
  }
}

// Export utility functions
export const weatherUtils = {
  // Convert wind direction degrees to cardinal direction
  getWindDirection: (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  },

  // Get weather icon URL
  getWeatherIconUrl: (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  },

  // Format temperature
  formatTemperature: (temp: number): string => {
    return `${Math.round(temp)}°C`;
  },

  // Get severity color
  getSeverityColor: (severity: string): string => {
    switch (severity.toLowerCase()) {
      case 'severe': return '#dc2626'; // red-600
      case 'moderate': return '#ea580c'; // orange-600
      case 'minor': return '#ca8a04'; // yellow-600
      default: return '#6b7280'; // gray-500
    }
  }
};
