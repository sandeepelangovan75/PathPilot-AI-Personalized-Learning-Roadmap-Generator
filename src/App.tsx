import React, { useState } from 'react';
import { AppProvider, useApp, ActiveView } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { OnboardingWizard } from './components/OnboardingWizard';
import { DashboardView } from './components/DashboardView';
import { RoadmapView } from './components/RoadmapView';
import { SkillGapView } from './components/SkillGapView';
import { DailyPlanView } from './components/DailyPlanView';
import { AssessmentView } from './components/AssessmentView';
import { ProjectView } from './components/ProjectView';
import { ResourcesView } from './components/ResourcesView';
import { CareerReadinessView } from './components/CareerReadinessView';
import { CopilotDrawer } from './components/CopilotDrawer';
import { DemoTourModal } from './components/DemoTourModal';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // If in landing or onboarding, don't show the dashboard sidebar
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1">
          <LandingPage />
        </main>
        <CopilotDrawer />
        <DemoTourModal />
      </div>
    );
  }

  if (currentView === 'onboarding') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
        <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1">
          <OnboardingWizard />
        </main>
        <CopilotDrawer />
        <DemoTourModal />
      </div>
    );
  }

  // Dashboard & Workspaces
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'roadmap':
        return <RoadmapView />;
      case 'skillgap':
        return <SkillGapView />;
      case 'daily':
        return <DailyPlanView />;
      case 'assessment':
        return <AssessmentView />;
      case 'projects':
        return <ProjectView />;
      case 'resources':
        return <ResourcesView />;
      case 'readiness':
        return <CareerReadinessView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Slide-in Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-md">
            <div className="w-72 h-full bg-slate-950 border-r border-slate-800 p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-white text-base">Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 p-1"
                >
                  ✕
                </button>
              </div>
              <Sidebar closeMobileMenu={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Work Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-full">
          {renderView()}
        </main>
      </div>

      <CopilotDrawer />
      <DemoTourModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
