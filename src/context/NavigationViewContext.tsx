import React, { createContext, useContext, useState, ReactNode } from 'react';

type NavigationView = 'dashboard' | 'realtime-ops';

interface NavigationViewContextType {
  activeView: NavigationView;
  setActiveView: (view: NavigationView) => void;
}

const NavigationViewContext = createContext<NavigationViewContextType | undefined>(undefined);

export const NavigationViewProvider = ({ children }: { children: ReactNode }) => {
  const [activeView, setActiveView] = useState<NavigationView>('dashboard');

  return (
    <NavigationViewContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </NavigationViewContext.Provider>
  );
};

export const useNavigationView = () => {
  const context = useContext(NavigationViewContext);
  if (!context) {
    throw new Error('useNavigationView must be used within a NavigationViewProvider');
  }
  return context;
};