import { useState } from 'react';
import logoImg from '../assets/TanimPro_Logo.png';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

export function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    primaryCrop: '',
    farmSize: '',
    language: 'english',
    offlineMode: false
  });

  const locations = [
    'Metro Manila', 'Cebu', 'Davao', 'Laguna', 'Cavite', 'Bulacan', 'Rizal', 
    'Nueva Ecija', 'Pangasinan', 'Iloilo', 'Negros Occidental', 'Misamis Oriental'
  ];

  const crops = [
    'Rice (Palay)', 'Corn', 'Coconut', 'Sugarcane', 'Banana', 'Mango', 
    'Tomato', 'Eggplant', 'Okra', 'Kangkong', 'Pechay', 'Carrots'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoImg} alt="TanimPro Logo" className="h-16 mx-auto mb-4" />
          <p className="text-green-700">Smart Farming Solutions for Filipino Farmers</p>
        </div>

        <Card className="border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
            <CardTitle className="text-white">
              {step === 1 && "Welcome! Let's get to know you"}
              {step === 2 && "Tell us about your farm"}
              {step === 3 && "Setup preferences"}
            </CardTitle>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded ${
                    i <= step ? 'bg-yellow-300' : 'bg-green-300/50'
                  }`}
                />
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="name" className="text-green-800">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Juan dela Cruz"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-green-800">Location/Province</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue placeholder="Select your location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="crop" className="text-green-800">Primary Crop</Label>
                  <Select value={formData.primaryCrop} onValueChange={(value) => handleInputChange('primaryCrop', value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue placeholder="What do you mainly grow?" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="farmSize" className="text-green-800">Farm Size (hectares)</Label>
                  <Input
                    id="farmSize"
                    placeholder="1.5"
                    type="number"
                    step="0.1"
                    value={formData.farmSize}
                    onChange={(e) => handleInputChange('farmSize', e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label htmlFor="language" className="text-green-800">Preferred Language</Label>
                  <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="tagalog">Tagalog</SelectItem>
                      <SelectItem value="bisaya">Bisaya</SelectItem>
                      <SelectItem value="ilonggo">Ilonggo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="offline"
                    checked={formData.offlineMode}
                    onCheckedChange={(checked) => handleInputChange('offlineMode', checked)}
                  />
                  <Label htmlFor="offline" className="text-green-800">Enable Offline Mode</Label>
                </div>
                <div className="text-sm text-green-700 bg-green-50 p-3 rounded border border-green-200">
                  <p>🌐 Online Mode: Get real-time weather and market updates</p>
                  <p>📱 Offline Mode: Access core tools without internet</p>
                </div>
              </>
            )}

            <div className="flex gap-2 pt-4">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious} 
                  className="flex-1 border-green-300 text-green-700 hover:bg-green-50"
                >
                  Previous
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                disabled={
                  (step === 1 && (!formData.name || !formData.location)) ||
                  (step === 2 && (!formData.primaryCrop || !formData.farmSize))
                }
              >
                {step === 3 ? "Start Farming Smart! 🚀" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}