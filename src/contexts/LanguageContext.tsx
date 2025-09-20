import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.getStarted': 'Get Started',
    
    // Landing Page
    'landing.title': 'Smart Farming for Kerala Farmers',
    'landing.subtitle': 'Get personalized crop guidance, weather alerts, and farming recommendations tailored to your land, crops, and local conditions in Malayalam.',
    'landing.startJourney': 'Start Your Farm Journey',
    'landing.scheduleDemoCall': 'Schedule Demo Call',
    'landing.activeThousands': '5000+',
    'landing.activeFarmers': 'Active Farmers',
    'landing.yieldIncrease': '25%',
    'landing.yieldIncreaseText': 'Yield Increase',
    'landing.cropTypes': '50+',
    'landing.cropTypesText': 'Crop Types',
    
    // Home Page
    'home.welcome': 'Welcome, ',
    'home.activeCrops': 'Active Crops',
    'home.yieldIncrease': 'Yield Increase',
    'home.pendingTasks': 'Pending Tasks',
    'home.alerts': 'Alerts',
    'home.weatherToday': 'Weather Today',
    'home.humidity': 'Humidity',
    'home.aiRecommendations': 'AI Recommendations',
    'home.personalizedAdvice': 'Personalized advice for your farm',
    'home.quickActions': 'Quick Actions',
    'home.logActivities': 'Log activities and get instant advice',
    'home.logFarmActivity': 'Log Farm Activity',
    'home.viewFarmCalendar': 'View Farm Calendar',
    'home.askAiAssistant': 'Ask AI Assistant',
    'home.viewAnalytics': 'View Analytics',
    
    // Features
    'features.climateSmartPredictions': 'Climate Smart Predictions',
    'features.aiMicroplasticDetector': 'AI Microplastic Detector',
    'features.voiceBasedQueries': 'Voice-Based Queries',
    'features.cropDiseaseDetection': 'Crop Disease Detection',
    'features.cropCalendar': 'Crop Calendar',
    'features.satelliteDamageMapping': 'Satellite Damage Mapping',
    'features.smartInsuranceConnector': 'Smart Insurance Connector',
    'features.emergencySosSystem': 'Emergency SOS System',
    'features.marketIntelligence': 'Market Intelligence',
  },
  ml: {
    // Navigation
    'nav.features': 'സവിശേഷതകൾ',
    'nav.howItWorks': 'എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    'nav.contact': 'ബന്ധപ്പെടുക',
    'nav.login': 'ലോഗിൻ',
    'nav.getStarted': 'ആരംഭിക്കുക',
    
    // Landing Page
    'landing.title': 'കേരള കർഷകർക്കായി സ്മാർട്ട് കൃഷി',
    'landing.subtitle': 'നിങ്ങളുടെ ഭൂമി, വിളകൾ, പ്രാദേശിക അവസ്ഥകൾ എന്നിവയ്ക്കനുസരിച്ച് മലയാളത്തിൽ വ്യക്തിഗതമാക്കിയ കൃഷി നിർദ്ദേശങ്ങൾ, കാലാവസ്ഥാ മുന്നറിയിപ്പുകൾ, കാർഷിക ശുപാർശകൾ എന്നിവ നേടുക.',
    'landing.startJourney': 'നിങ്ങളുടെ കാർഷിക യാത്ര ആരംഭിക്കുക',
    'landing.scheduleDemoCall': 'ഡെമോ കോൾ ഷെഡ്യൂൾ ചെയ്യുക',
    'landing.activeThousands': '5000+',
    'landing.activeFarmers': 'സജീവ കർഷകർ',
    'landing.yieldIncrease': '25%',
    'landing.yieldIncreaseText': 'വിള വർദ്ധനവ്',
    'landing.cropTypes': '50+',
    'landing.cropTypesText': 'വിള തരങ്ങൾ',
    
    // Home Page
    'home.welcome': 'സ്വാഗതം, ',
    'home.activeCrops': 'സജീവ വിളകൾ',
    'home.yieldIncrease': 'വിള വർദ്ധനവ്',
    'home.pendingTasks': 'തീർപ്പാക്കാത്ത ജോലികൾ',
    'home.alerts': 'മുന്നറിയിപ്പുകൾ',
    'home.weatherToday': 'ഇന്നത്തെ കാലാവസ്ഥ',
    'home.humidity': 'ആർദ്രത',
    'home.aiRecommendations': 'AI ശുപാർശകൾ',
    'home.personalizedAdvice': 'നിങ്ങളുടെ ഫാമിനുള്ള വ്യക്തിഗത ഉപദേശം',
    'home.quickActions': 'ദ്രുത പ്രവർത്തനങ്ങൾ',
    'home.logActivities': 'പ്രവർത്തനങ്ങൾ രേഖപ്പെടുത്തി തൽക്ഷണ ഉപദേശം നേടുക',
    'home.logFarmActivity': 'ഫാം പ്രവർത്തനം രേഖപ്പെടുത്തുക',
    'home.viewFarmCalendar': 'ഫാം കലണ്ടർ കാണുക',
    'home.askAiAssistant': 'AI അസിസ്റ്റന്റിനോട് ചോദിക്കുക',
    'home.viewAnalytics': 'അനാലിറ്റിക്സ് കാണുക',
    
    // Features
    'features.climateSmartPredictions': 'കാലാവസ്ഥാ സ്മാർട്ട് പ്രവചനങ്ങൾ',
    'features.aiMicroplasticDetector': 'AI മൈക്രോപ്ലാസ്റ്റിക് ഡിറ്റക്ടർ',
    'features.voiceBasedQueries': 'ശബ്ദ അടിസ്ഥാനമാക്കിയ ചോദ്യങ്ങൾ',
    'features.cropDiseaseDetection': 'വിള രോഗ കണ്ടെത്തൽ',
    'features.cropCalendar': 'വിള കലണ്ടർ',
    'features.satelliteDamageMapping': 'സാറ്റലൈറ്റ് കേടുപാടുകൾ മാപ്പിംഗ്',
    'features.smartInsuranceConnector': 'സ്മാർട്ട് ഇൻഷുറൻസ് കണക്ടർ',
    'features.emergencySosSystem': 'എമർജൻസി SOS സിസ്റ്റം',
    'features.marketIntelligence': 'മാർക്കറ്റ് ഇന്റലിജൻസ്',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ml' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};