import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, Menu, Settings, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MainLogo } from '@my-monorepo/utils/images';
import { UserInfoDropdown } from './UserInfoDropdown';
const headerNavigation = [{ label: 'Dashboard', href: '/dashboard', active: true }];

const subNavigation = [
  {
    label: 'Analytics',
    href: '/analytics',
    items: [
      {
        label: 'Overview',
        href: '/analytics',
        description: 'Review performance and activity at a glance.',
      },
      {
        label: 'Reports',
        href: '/analytics/reports',
        description: 'Explore detailed reports for your organization.',
      },
    ],
  },
  {
    label: 'Transfer',
    href: '/transfer',
    items: [
      {
        label: 'New transfer',
        href: '/transfer',
        description: 'Move money between your connected accounts.',
      },
      {
        label: 'Scheduled transfers',
        href: '/transfer/scheduled',
        description: 'Review and manage upcoming transfers.',
      },
    ],
  },
  {
    label: 'Wallet',
    href: '/wallet',
    items: [
      {
        label: 'Accounts',
        href: '/wallet',
        description: 'See your balances and connected accounts.',
      },
      {
        label: 'Transactions',
        href: '/wallet/transactions',
        description: 'Track your recent wallet activity.',
      },
    ],
  },
  {
    label: 'Budget',
    href: '/budget',
    items: [
      {
        label: 'Summary',
        href: '/budget',
        description: 'Understand your spending across categories.',
      },
      {
        label: 'Goals',
        href: '/budget/goals',
        description: 'Set targets and track progress over time.',
      },
    ],
  },
];

export function AppHeader() {
  const [openSection, setOpenSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenSection('');
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 flex min-h-16 w-full items-center rounded-none border border-white/70 bg-white/65 px-2 py-2 backdrop-blur-2xl backdrop-saturate-150 sm:mx-5 sm:w-auto sm:rounded-2xl sm:px-5 sm:py-0 lg:mx-8 lg:px-7"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <Link to="/dashboard" className="flex shrink-0 items-center gap-2 text-slate-950 sm:gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-white/80 bg-white/70 shadow-sm">
            <img src={MainLogo} alt="Steadi" className="size-8 object-contain" />
          </span>
          <span className="hidden text-lg font-semibold tracking-tight text-slate-950 sm:inline">
            Steadi
          </span>
        </Link>
        <nav
          className="scrollbar-none ml-1 hidden min-w-0 flex-1 justify-start overflow-x-auto sm:ml-5 sm:flex sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          aria-label="Header navigation"
        >
          <ul className="flex w-max shrink-0 list-none items-center justify-start gap-x-2.5 space-x-0">
            {headerNavigation.map((item) => (
              <li key={item.label} className="relative z-0">
                <Link
                  to={item.href}
                  className="inline-flex items-center rounded-xl bg-slate-950 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 sm:px-3.5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {subNavigation.map((section) => (
              <li
                key={section.label}
                className="relative z-20"
                onMouseEnter={() => setOpenSection(section.label)}
                onMouseLeave={() => setOpenSection('')}
              >
                <button
                  type="button"
                  onMouseDown={() =>
                    setOpenSection((current) => (current === section.label ? '' : section.label))
                  }
                  aria-expanded={openSection === section.label}
                  className={`inline-flex h-auto items-center rounded-md px-2.5 py-2 text-sm font-medium transition-colors sm:px-4 sm:py-2.5 ${
                    openSection === section.label
                      ? 'bg-white/85 text-slate-950 shadow-sm'
                      : 'bg-transparent text-slate-600 hover:bg-white/60 hover:text-slate-950'
                  }`}
                >
                  {section.label}
                  <ChevronDown
                    className={`ml-1 size-3 transition-transform ${
                      openSection === section.label ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {openSection === section.label && (
                  <div className="absolute left-0 top-full z-50 w-[min(600px,calc(100vw-2rem))] pt-3">
                    <div className="rounded-2xl border border-white/80 bg-white/80 p-2 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.5)] backdrop-blur-2xl">
                      <div className="grid gap-1 sm:grid-cols-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="flex flex-col gap-1 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/80"
                          >
                            <span className="font-medium leading-none text-slate-950">
                              {item.label}
                            </span>
                            <span className="line-clamp-2 text-slate-500">{item.description}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex shrink-0 items-center gap-0.5 sm:gap-3">
        <button
          type="button"
          className="rounded-xl p-2 text-slate-700 transition hover:bg-white/75 hover:text-slate-950 sm:hidden"
          onClick={() => setMobileMenuOpen((current) => !current)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <button
          type="button"
          className="relative rounded-xl p-2 text-slate-700 transition hover:bg-white/75 hover:text-slate-950 sm:p-2.5"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-rose-500" />
        </button>
        <button
          type="button"
          className="hidden rounded-xl p-2.5 text-slate-700 transition hover:bg-white/75 hover:text-slate-950 sm:block"
          aria-label="Settings"
        >
          <Settings className="size-5" />
        </button>
        <button
          type="button"
          className="hidden rounded-xl px-2.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/75 hover:text-slate-950 sm:block"
          aria-label="Change language"
        >
          EN
        </button>
        <UserInfoDropdown />
      </div>
      {mobileMenuOpen && (
        <nav
          className="absolute left-2 right-2 top-[calc(100%+0.5rem)] rounded-2xl border border-white/80 bg-white/85 p-2 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.35)] backdrop-blur-2xl sm:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center rounded-xl bg-slate-950 px-3.5 py-3 text-sm font-medium text-white"
          >
            Dashboard
          </Link>
          <div className="mt-1 grid gap-1">
            {subNavigation.map((section) => (
              <div key={section.label} className="rounded-xl bg-white/55 p-1">
                <p className="px-2.5 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {section.label}
                </p>
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex rounded-lg px-2.5 py-2 text-sm text-slate-700 transition hover:bg-white/80 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
