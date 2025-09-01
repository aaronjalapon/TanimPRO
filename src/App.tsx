import React, { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { Dashboard } from './components/Dashboard';
import { PlantingSchedule } from './components/PlantingSchedule';
import { MarketPrices } from './components/MarketPrices';
import { CropHealthScanner } from './components/CropHealthScanner';
import { Community } from './components/Community';
import { FinancialTools } from './components/FinancialTools';
import { Settings } from './components/Settings';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [user, setUser] = useState(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    // Check if user is already registered
    const savedUser = localStorage.getItem('tanimproUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentScreen('dashboard');
    }
  }, []);

  const handleUserRegistration = (userData) => {
    setUser(userData);
    localStorage.setItem('tanimproUser', JSON.stringify(userData));
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleUserRegistration} />;
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'planting':
        return <PlantingSchedule user={user} />;
      case 'prices':
        return <MarketPrices user={user} />;
      case 'scanner':
        return <CropHealthScanner user={user} />;
      case 'community':
        return <Community user={user} />;
      case 'financial':
        return <FinancialTools user={user} />;
      case 'settings':
        return <Settings 
          user={user} 
          isOfflineMode={isOfflineMode}
          setIsOfflineMode={setIsOfflineMode}
          onNavigate={setCurrentScreen}
        />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen !== 'onboarding' && (
        <div className="fixed top-0 left-0 right-0 bg-primary text-primary-foreground p-4 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium">TanimPro</h1>
            <div className="flex items-center gap-2">
              {isOfflineMode && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
                  Offline
                </span>
              )}
              <span className="text-sm">Kumusta, {user?.name}!</span>
            </div>
          </div>
        </div>
      )}
      
      <div className={currentScreen !== 'onboarding' ? 'pt-16 pb-16' : ''}>
        {renderScreen()}
      </div>
      
      {currentScreen !== 'onboarding' && (
        <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
}