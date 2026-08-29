import {
  BarChart3,
  Building2,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Organizations', href: '/organizations', icon: Building2 },
  { label: 'Users', href: '/users', icon: Users },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Documents', href: '/documents', icon: FileText },
];

type SidebarProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (isOpen: boolean) => void;
};

function UserAccount() {
  const [accountOpen, setAccountOpen] = useState(false);
  const userInfo = useAuthStore((state) => state.userInfo);
  const clearUserInfo = useAuthStore((state) => state.clearUserInfo);
  const name = userInfo ? `${userInfo.firstName} ${userInfo.lastName}`.trim() || userInfo.email : 'Admin User';
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAccountOpen((isOpen) => !isOpen)}
        className="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
        aria-expanded={accountOpen}
        aria-haspopup="menu"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-slate-800">{name}</span>
          <span className="block truncate text-xs text-slate-500">Administrator</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-slate-400" />
      </button>
      {accountOpen && (
        <div role="menu" className="absolute bottom-14 left-0 z-20 w-full rounded-md border border-slate-200 bg-white p-1 shadow-lg">
          <button type="button" role="menuitem" onClick={clearUserInfo} className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm text-red-600 hover:bg-red-50">
            <LogOut className="size-4" />Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
        <Link to="/dashboard" onClick={onClose} className="flex items-center gap-2.5 text-slate-900">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary-600 text-white"><ShieldCheck className="size-5" /></span>
          <span className="text-base font-bold">Control Center</span>
        </Link>
        <button type="button" onClick={onClose} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Close navigation"><X className="size-5" /></button>
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-5" aria-label="Primary navigation">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Workspace</p>
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink key={item.label} to={item.href} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
              <item.icon className="size-5" />{item.label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto pt-6">
          <NavLink to="/settings" onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Settings className="size-5" />Settings
          </NavLink>
        </div>
      </nav>
      <div className="border-t border-slate-200 p-3"><UserAccount /></div>
    </>
  );
}

export function Sidebar({ mobileOpen, onMobileOpenChange }: SidebarProps) {
  const closeMobile = () => onMobileOpenChange(false);

  return (
    <>
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex"><SidebarContent onClose={closeMobile} /></aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-slate-950/35" onClick={closeMobile} aria-label="Close navigation overlay" />
          <aside className="relative flex h-full w-72 flex-col bg-white shadow-xl"><SidebarContent onClose={closeMobile} /></aside>
        </div>
      )}
    </>
  );
}

export function MobileNavButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu className="size-5" /></button>;
}