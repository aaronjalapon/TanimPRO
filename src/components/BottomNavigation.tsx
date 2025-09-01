import React from 'react';
import { Button } from './ui/button';
import { 
  Home, 
  Calendar, 
  TrendingUp, 
  Camera, 
  MessageSquare, 
  Calculator, 
  Settings,
  BarChart3
} from 'lucide-react';

export function BottomNavigation({ currentScreen, onNavigate }) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'planting', label: 'Planting', icon: Calendar },
    { id: 'prices', label: 'Prices', icon: BarChart3 },
    { id: 'scanner', label: 'Scanner', icon: Camera },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'financial', label: 'Finance', icon: Calculator },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="grid grid-cols-7 gap-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={`h-12 flex-col gap-1 p-1 ${isActive ? '' : 'text-muted-foreground'}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}