import React from 'react';
import { useApp, ActiveView } from '../context/AppContext';
import {
  LayoutDashboard,
  GitFork,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  FolderGit2,
  BookOpen,
  Award,
  Bot,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  closeMobileMenu?: () => void;
}

interface NavItem {
  id: ActiveView;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ closeMobileMenu }) => {
  const { currentView, setCurrentView, profile, careerReadiness, setCopilotOpen } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'roadmap', label: 'My Roadmap', icon: GitFork, badge: 'Adaptive', badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { id: 'skillgap', label: 'Skill Gap Analysis', icon: BarChart3 },
    { id: 'daily', label: "Today's Plan", icon: CalendarCheck, badge: '60 min', badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'assessment', label: 'AI Assessment', icon: CheckCircle2, badge: 'Test', badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { id: 'projects', label: 'Portfolio Projects', icon: FolderGit2 },
    { id: 'resources', label: 'Learning Resources', icon: BookOpen },
    { id: 'readiness', label: 'Career Readiness', icon: Award, badge: `${careerReadiness.overallScore}%`, badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  ];

  const handleNavClick = (viewId: ActiveView) => {
    setCurrentView(viewId);
    if (closeMobileMenu) closeMobileMenu();
  };

  return (
    <aside className="w-64 shrink-0 flex flex-col justify-between border-r border-slate-800/80 bg-slate-950/70 p-4 h-[calc(100vh-4rem)] sticky top-16 select-none overflow-y-auto">
      <div className="space-y-6">
        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/10 text-white border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* AI Copilot quick banner */}
        <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-b from-cyan-950/30 to-indigo-950/20 p-3.5 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>SkillPilot Copilot</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Ask questions tailored to your profile, daily minutes & roadmap.
          </p>
          <button
            onClick={() => setCopilotOpen(true)}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 py-1.5 px-2.5 text-xs font-semibold text-cyan-200 transition-colors"
          >
            <Bot className="h-3.5 w-3.5 text-cyan-400" />
            <span>Open Copilot</span>
            <ChevronRight className="h-3 w-3 ml-auto opacity-70" />
          </button>
        </div>
      </div>

      {/* Profile summary in footer of sidebar */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            {profile.name ? profile.name.charAt(0) : 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">{profile.name || 'Alex Rivera'}</p>
            <p className="text-[10px] text-slate-400 truncate">{profile.targetRole || 'Data Analyst'}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
