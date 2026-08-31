import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, Grid2X2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenSection('');
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-10"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Link to="/dashboard" className="flex shrink-0 items-center gap-3 text-slate-950">
          <span className="flex size-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm">
            <span className="flex flex-col gap-1">
              <span className="h-0.5 w-5 rounded-full bg-white" />
              <span className="h-0.5 w-3.5 rounded-full bg-white" />
              <span className="h-0.5 w-5 rounded-full bg-white" />
            </span>
          </span>
          <span className="hidden text-xl font-semibold tracking-tight sm:inline">Steadi</span>
        </Link>
        <nav
          className="scrollbar-none ml-3 min-w-0 flex-1 justify-start overflow-x-auto sm:ml-5 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          aria-label="Header navigation"
        >
          <ul className="flex w-max shrink-0 list-none items-center justify-start gap-x-2.5 space-x-0">
            {headerNavigation.map((item) => (
              <li key={item.label} className="relative z-0">
                <Link
                  to={item.href}
                  className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition-colors"
                >
                  {item.label === 'Dashboard' && <Grid2X2 className="mr-2 inline size-4" />}
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
                  className={`inline-flex h-auto items-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    openSection === section.label
                      ? 'bg-slate-100 text-slate-950'
                      : 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-950'
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
                    <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                      <div className="grid gap-1 sm:grid-cols-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            className="flex flex-col gap-1 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-slate-100"
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
      <div className="flex items-center gap-1.5 sm:gap-3">
        <button
          type="button"
          className="relative rounded-full p-2.5 text-slate-700 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-2.5 top-2 size-1.5 rounded-full bg-rose-500" />
        </button>
        <button
          type="button"
          className="rounded-full p-2.5 text-slate-700 hover:bg-slate-100"
          aria-label="Settings"
        >
          <Settings className="size-5" />
        </button>
        <button
          type="button"
          className="hidden rounded-full px-2.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:block"
          aria-label="Change language"
        >
          EN
        </button>
        <UserInfoDropdown />
      </div>
    </header>
  );
}
