import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, Droplets, Sun, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export function PlantingSchedule({ user }) {
  const [selectedCrop, setSelectedCrop] = useState(user?.primaryCrop || 'Rice (Palay)');
  
  const crops = ['Rice (Palay)', 'Corn', 'Tomato', 'Eggplant', 'Okra', 'Kangkong'];
  
  const plantingData = {
    'Rice (Palay)': {
      nextBestDate: 'February 15-25, 2025',
      status: 'optimal',
      daysToPlant: 18,
      variety: 'NSIC Rc222 (Mestizo 20)',
      duration: '105-110 days',
      yield: '4.5-6.0 tons/hectare',
      tips: [
        'Pre-germinate seeds 24-48 hours before planting',
        'Maintain 2-3 cm water depth during seedling stage',
        'Apply basal fertilizer 2 weeks before planting'
      ],
      schedule: [
        { phase: 'Land Preparation', dates: 'Feb 1-10', status: 'upcoming' },
        { phase: 'Seeding', dates: 'Feb 15-18', status: 'optimal' },
        { phase: 'Transplanting', dates: 'Feb 25-28', status: 'optimal' },
        { phase: 'First Fertilizer', dates: 'Mar 15', status: 'scheduled' },
        { phase: 'Flowering Stage', dates: 'Apr 20-30', status: 'scheduled' },
        { phase: 'Harvest', dates: 'Jun 1-10', status: 'scheduled' }
      ]
    },
    'Corn': {
      nextBestDate: 'February 10-20, 2025',
      status: 'good',
      daysToPlant: 13,
      variety: 'Pioneer 30G19',
      duration: '95-105 days',
      yield: '8-12 tons/hectare',
      tips: [
        'Plant when soil moisture is adequate',
        'Maintain 75cm between rows, 25cm between plants',
        'Apply organic matter before planting'
      ],
      schedule: [
        { phase: 'Land Preparation', dates: 'Feb 1-8', status: 'upcoming' },
        { phase: 'Direct Seeding', dates: 'Feb 10-15', status: 'good' },
        { phase: 'Side Dress Fertilizer', dates: 'Mar 1', status: 'scheduled' },
        { phase: 'Tasseling Stage', dates: 'Apr 1-10', status: 'scheduled' },
        { phase: 'Harvest', dates: 'May 15-25', status: 'scheduled' }
      ]
    }
  };

  const currentData = plantingData[selectedCrop] || plantingData['Rice (Palay)'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'caution': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'upcoming': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'optimal': return <Sun className="w-4 h-4 text-green-500" />;
      case 'good': return <Sun className="w-4 h-4 text-blue-500" />;
      default: return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2>Planting Schedule</h2>
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {crops.map(crop => (
              <SelectItem key={crop} value={crop}>{crop}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Next Planting Recommendation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Next Planting Window
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <div className="text-2xl mb-2">{currentData.nextBestDate}</div>
            <Badge className={getStatusColor(currentData.status)}>
              {currentData.status.charAt(0).toUpperCase() + currentData.status.slice(1)} Timing
            </Badge>
            <div className="text-sm text-muted-foreground mt-2">
              {currentData.daysToPlant} days from today
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-sm text-muted-foreground">Recommended Variety</div>
              <div>{currentData.variety}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Expected Yield</div>
              <div>{currentData.yield}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5" />
            Weather Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-500" />
              <div>
                <div className="text-sm">Sunshine Hours</div>
                <div className="text-sm text-muted-foreground">6-8 hrs/day optimal</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm">Rainfall Forecast</div>
                <div className="text-sm text-muted-foreground">Adequate for next 2 weeks</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Heavy rains expected Jan 30-Feb 1. Consider delaying planting by 2-3 days.</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planting Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Expert Tips for {selectedCrop}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentData.tips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Growing Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Complete Growing Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentData.schedule.map((phase, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
                <div className="flex items-center gap-3">
                  {getPhaseIcon(phase.status)}
                  <div>
                    <div className="text-sm">{phase.phase}</div>
                    <div className="text-xs text-muted-foreground">{phase.dates}</div>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(phase.status)}>
                  {phase.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button className="flex-1">Set Planting Reminder</Button>
        <Button variant="outline" className="flex-1">Download Schedule</Button>
      </div>
    </div>
  );
}