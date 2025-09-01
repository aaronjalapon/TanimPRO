import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, MapPin, Calendar } from 'lucide-react';

export function MarketPrices({ user }) {
  const [selectedCrop, setSelectedCrop] = useState('Rice (Palay)');
  const [selectedRegion, setSelectedRegion] = useState(user?.location || 'Nueva Ecija');
  const [timeframe, setTimeframe] = useState('30days');

  const crops = ['Rice (Palay)', 'Corn', 'Tomato', 'Eggplant', 'Okra', 'Kangkong', 'Banana', 'Coconut'];
  const regions = ['Nueva Ecija', 'Laguna', 'Pangasinan', 'Iloilo', 'Cebu', 'Davao', 'Metro Manila'];

  // Mock price data for different timeframes
  const priceData = {
    '30days': [
      { date: 'Jan 1', price: 22.5, volume: 850 },
      { date: 'Jan 5', price: 23.0, volume: 920 },
      { date: 'Jan 10', price: 22.8, volume: 780 },
      { date: 'Jan 15', price: 24.2, volume: 1100 },
      { date: 'Jan 20', price: 23.8, volume: 950 },
      { date: 'Jan 25', price: 25.1, volume: 1200 },
      { date: 'Today', price: 24.8, volume: 980 }
    ],
    '90days': [
      { date: 'Nov 1', price: 21.0, volume: 800 },
      { date: 'Nov 15', price: 20.5, volume: 750 },
      { date: 'Dec 1', price: 21.8, volume: 900 },
      { date: 'Dec 15', price: 22.2, volume: 850 },
      { date: 'Jan 1', price: 22.5, volume: 950 },
      { date: 'Jan 15', price: 24.2, volume: 1100 },
      { date: 'Today', price: 24.8, volume: 980 }
    ]
  };

  const forecast = [
    { date: 'Jan 29', predicted: 25.2, confidence: 85 },
    { date: 'Feb 5', predicted: 25.8, confidence: 78 },
    { date: 'Feb 12', predicted: 26.1, confidence: 72 },
    { date: 'Feb 19', predicted: 25.9, confidence: 65 },
    { date: 'Feb 26', predicted: 25.5, confidence: 60 },
    { date: 'Mar 5', predicted: 24.8, confidence: 55 },
    { date: 'Mar 12', predicted: 24.2, confidence: 50 }
  ];

  const marketInsights = [
    {
      title: 'Seasonal Peak Expected',
      description: 'Prices typically increase 15-20% during February-March due to planting season demand',
      impact: 'positive',
      timeframe: 'Next 4-6 weeks'
    },
    {
      title: 'Import Arrivals',
      description: 'Large shipment of imported rice expected mid-February may affect local prices',
      impact: 'negative',
      timeframe: 'February 15-20'
    },
    {
      title: 'Weather Impact',
      description: 'Recent favorable weather in major growing regions supports stable supply',
      impact: 'neutral',
      timeframe: 'Current month'
    }
  ];

  const currentPrice = priceData[timeframe][priceData[timeframe].length - 1];
  const previousPrice = priceData[timeframe][priceData[timeframe].length - 2];
  const priceChange = ((currentPrice.price - previousPrice.price) / previousPrice.price * 100).toFixed(1);
  const isPositiveChange = parseFloat(priceChange) > 0;

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <h2>Market Prices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger>
              <SelectValue placeholder="Select Crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map(crop => (
                <SelectItem key={crop} value={crop}>{crop}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Current Price */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-3xl mb-2">₱{currentPrice.price}/kg</div>
            <div className="flex items-center justify-center gap-2">
              {isPositiveChange ? 
                <TrendingUp className="w-4 h-4 text-green-500" /> : 
                <TrendingDown className="w-4 h-4 text-red-500" />
              }
              <span className={`text-sm ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                {isPositiveChange ? '+' : ''}{priceChange}% from last update
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {selectedCrop} in {selectedRegion}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Price Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={priceData[timeframe]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`₱${value}`, 'Price per kg']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Price Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            7-Day Price Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'predicted' ? `₱${value}` : `${value}%`,
                  name === 'predicted' ? 'Predicted Price' : 'Confidence'
                ]}
              />
              <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            Dotted line shows AI-predicted prices with decreasing confidence over time
          </div>
        </CardContent>
      </Card>

      {/* Trading Volume */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Volume (MT)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={priceData[timeframe]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} MT`, 'Volume']} />
              <Bar dataKey="volume" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm">{insight.title}</h4>
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                <div className="text-xs text-muted-foreground">
                  Timeline: {insight.timeframe}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="text-center">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-sm">Find Nearby Buyers</div>
          </div>
        </Card>
        <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-sm">Set Price Alert</div>
          </div>
        </Card>
      </div>
    </div>
  );
}