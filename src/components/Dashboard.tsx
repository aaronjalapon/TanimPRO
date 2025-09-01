import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Cloud, Sun, CloudRain, TrendingUp, TrendingDown, Calendar, AlertTriangle } from 'lucide-react';

export function Dashboard({ user }) {
  const weatherData = {
    current: { temp: 28, condition: 'Partly Cloudy', humidity: 78, windSpeed: 12 },
    forecast: [
      { day: 'Today', high: 30, low: 24, condition: 'sunny', rain: 10 },
      { day: 'Tomorrow', high: 29, low: 23, condition: 'cloudy', rain: 30 },
      { day: 'Thu', high: 27, low: 22, condition: 'rainy', rain: 80 },
      { day: 'Fri', high: 31, low: 25, condition: 'sunny', rain: 5 }
    ]
  };

  const marketPrices = {
    'Rice (Palay)': { current: 23.50, change: 1.2, trend: 'up' },
    'Corn': { current: 18.75, change: -0.8, trend: 'down' },
    'Tomato': { current: 45.00, change: 3.2, trend: 'up' }
  };

  const tasks = [
    { id: 1, title: 'Check irrigation system', priority: 'high', dueDate: 'Today' },
    { id: 2, title: 'Apply fertilizer to corn field', priority: 'medium', dueDate: 'Tomorrow' },
    { id: 3, title: 'Inspect for pests', priority: 'medium', dueDate: 'Jan 31' },
    { id: 4, title: 'Prepare seedbed for next planting', priority: 'low', dueDate: 'Feb 5' }
  ];

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg border border-green-200">
        <h2 className="text-green-800">Good morning, {user?.name}! 🌅</h2>
        <p className="text-green-700">Here's what's happening on your farm today</p>
      </div>

      {/* Weather Card */}
      <Card className="border-green-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-white">
            {getWeatherIcon('cloudy')}
            Weather in {user?.location}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-2xl text-green-800">{weatherData.current.temp}°C</div>
              <div className="text-sm text-green-600">{weatherData.current.condition}</div>
            </div>
            <div className="text-sm space-y-1 text-green-700">
              <div>Humidity: {weatherData.current.humidity}%</div>
              <div>Wind: {weatherData.current.windSpeed} km/h</div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="text-center p-2 bg-green-50 border border-green-200 rounded">
                <div className="text-xs mb-1 text-green-700">{day.day}</div>
                {getWeatherIcon(day.condition)}
                <div className="text-sm mt-1 text-green-800">{day.high}°</div>
                <div className="text-xs text-green-600">{day.rain}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Prices */}
      <Card className="border-yellow-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-t-lg">
          <CardTitle className="text-yellow-900">Market Prices Today 💰</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {Object.entries(marketPrices).map(([crop, data]) => (
              <div key={crop} className="flex justify-between items-center p-2 bg-yellow-50 border border-yellow-200 rounded">
                <span className="text-yellow-900">{crop}</span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-900">₱{data.current}/kg</span>
                  <div className="flex items-center gap-1">
                    {data.trend === 'up' ? 
                      <TrendingUp className="w-4 h-4 text-green-500" /> : 
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    }
                    <span className={`text-sm ${data.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {data.trend === 'up' ? '+' : ''}{data.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="p-6 h-auto flex-col gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
          <Calendar className="w-6 h-6" />
          <span>Planting Guide</span>
        </Button>
        <Button className="p-6 h-auto flex-col gap-2 border-green-300 text-green-700 hover:bg-green-50" variant="outline">
          <TrendingUp className="w-6 h-6" />
          <span>Price Forecast</span>
        </Button>
      </div>

      {/* Today's Tasks */}
      <Card className="border-green-200 shadow-md">
        <CardHeader className="bg-green-100 border-b border-green-200">
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Calendar className="w-5 h-5" />
            Today's Tasks 📋
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {tasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-800">{task.title}</span>
                    <Badge className={`${getPriorityColor(task.priority)} border`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Due: {task.dueDate}
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                  Done
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 text-green-700 hover:bg-green-100">
            View all tasks
          </Button>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-orange-200 shadow-md">
        <CardHeader className="bg-orange-100 border-b border-orange-200">
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Farm Alerts ⚠️
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="p-3 bg-orange-50 border border-orange-200 rounded">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-800">Heavy rain expected Thursday - protect seedlings</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-800">Optimal planting window for corn starts February 10</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}