import React, { useState, useEffect, useCallback } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, AlertTriangle } from 'lucide-react';
import { WeatherService, WeatherData, FloodAlert, weatherUtils } from '../services/weatherService';
import { useAppContext } from '../contexts/AppContext';

interface WeatherWidgetProps {
  compact?: boolean;
  showAlerts?: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ compact = false, showAlerts = true }) => {
  const { state } = useAppContext();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [alerts, setAlerts] = useState<FloodAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (state.userLocation) {
      fetchWeatherData();
    }
  }, [state.userLocation]);

  const fetchWeatherData = useCallback(async () => {
    if (!state.userLocation) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherData, alertsData] = await Promise.all([
        WeatherService.getCurrentWeather(state.userLocation.lat, state.userLocation.lng),
        showAlerts ? WeatherService.getWeatherAlerts(state.userLocation.lat, state.userLocation.lng) : Promise.resolve([])
      ]);

      setWeather(weatherData);
      setAlerts(alertsData);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [state.userLocation, showAlerts]);

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '01d': <Sun className="text-yellow-500" size={compact ? 24 : 32} />,
      '01n': <Sun className="text-yellow-300" size={compact ? 24 : 32} />,
      '02d': <Cloud className="text-gray-500" size={compact ? 24 : 32} />,
      '02n': <Cloud className="text-gray-400" size={compact ? 24 : 32} />,
      '03d': <Cloud className="text-gray-600" size={compact ? 24 : 32} />,
      '03n': <Cloud className="text-gray-500" size={compact ? 24 : 32} />,
      '04d': <Cloud className="text-gray-700" size={compact ? 24 : 32} />,
      '04n': <Cloud className="text-gray-600" size={compact ? 24 : 32} />,
      '09d': <CloudRain className="text-blue-500" size={compact ? 24 : 32} />,
      '09n': <CloudRain className="text-blue-400" size={compact ? 24 : 32} />,
      '10d': <CloudRain className="text-blue-600" size={compact ? 24 : 32} />,
      '10n': <CloudRain className="text-blue-500" size={compact ? 24 : 32} />,
      '11d': <CloudRain className="text-purple-600" size={compact ? 24 : 32} />,
      '11n': <CloudRain className="text-purple-500" size={compact ? 24 : 32} />,
      '13d': <Cloud className="text-blue-200" size={compact ? 24 : 32} />,
      '13n': <Cloud className="text-blue-100" size={compact ? 24 : 32} />,
      '50d': <Cloud className="text-gray-400" size={compact ? 24 : 32} />,
      '50n': <Cloud className="text-gray-300" size={compact ? 24 : 32} />,
    };

    return iconMap[iconCode] || <Sun className="text-yellow-500" size={compact ? 24 : 32} />;
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-4 ${compact ? 'p-3' : 'p-6'}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-4 ${compact ? 'p-3' : 'p-6'}`}>
        <div className="text-center text-gray-500">
          <Cloud className="mx-auto mb-2" size={compact ? 24 : 32} />
          <p className="text-sm">{error || 'Weather data unavailable'}</p>
          <button
            onClick={fetchWeatherData}
            className="mt-2 text-xs text-blue-600 hover:text-blue-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getWeatherIcon(weather.icon)}
            <div>
              <div className="font-semibold text-lg">{weatherUtils.formatTemperature(weather.temperature)}</div>
              <div className="text-xs text-gray-600 capitalize">{weather.description}</div>
            </div>
          </div>
          <div className="text-right text-xs text-gray-600">
            <div>💧 {weather.humidity}%</div>
            <div>💨 {weather.windSpeed} m/s</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Current Weather</h3>
        <button
          onClick={fetchWeatherData}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Refresh
        </button>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {getWeatherIcon(weather.icon)}
          <div>
            <div className="text-3xl font-bold text-gray-900">
              {weatherUtils.formatTemperature(weather.temperature)}
            </div>
            <div className="text-gray-600 capitalize">{weather.description}</div>
            <div className="text-sm text-gray-500">
              Feels like {weatherUtils.formatTemperature(weather.feelsLike)}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" size={16} />
          <div>
            <div className="text-sm font-medium text-gray-900">{weather.humidity}%</div>
            <div className="text-xs text-gray-600">Humidity</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="text-gray-500" size={16} />
          <div>
            <div className="text-sm font-medium text-gray-900">{weather.windSpeed} m/s</div>
            <div className="text-xs text-gray-600">
              {weatherUtils.getWindDirection(weather.windDirection)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Eye className="text-green-500" size={16} />
          <div>
            <div className="text-sm font-medium text-gray-900">{weather.visibility} km</div>
            <div className="text-xs text-gray-600">Visibility</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Thermometer className="text-red-500" size={16} />
          <div>
            <div className="text-sm font-medium text-gray-900">{weather.pressure} hPa</div>
            <div className="text-xs text-gray-600">Pressure</div>
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      {showAlerts && alerts.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={16} />
            Weather Alerts ({alerts.length})
          </h4>
          <div className="space-y-2">
            {alerts.slice(0, 2).map((alert, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border-l-4"
                style={{ borderLeftColor: weatherUtils.getSeverityColor(alert.severity) }}
              >
                <div className="text-sm font-medium text-gray-900">{alert.title}</div>
                <div className="text-xs text-gray-600 mt-1">{alert.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Flood Risk Indicator */}
      {WeatherService.isFloodRisk(weather) && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-red-600" size={16} />
            <div className="text-sm">
              <div className="font-medium text-red-900">Flood Risk Detected</div>
              <div className="text-red-700">Heavy rainfall conditions present</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
