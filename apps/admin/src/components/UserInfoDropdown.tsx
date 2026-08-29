import { ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@my-monorepo/ui';
import { useAuthStore } from '../store/auth.store';

export function UserInfoDropdown() {
  const navigate = useNavigate();
  const userInfo = useAuthStore((state) => state.userInfo);
  const signOut = useAuthStore((state) => state.signOut);

  const handleSignOut = () => {
    signOut();
    navigate('/sign-in', { replace: true });
  };

  const fullName =
    [userInfo?.firstName, userInfo?.lastName].filter(Boolean).join(' ') || 'Account user';
  const initials =
    [userInfo?.firstName?.[0], userInfo?.lastName?.[0]].filter(Boolean).join('').toUpperCase() ||
    'AD';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user information"
          className="flex items-center gap-2 rounded-full p-1 text-left hover:bg-slate-100"
        >
          {userInfo?.image ? (
            <img
              src={userInfo.image}
              alt=""
              className="size-10 rounded-full object-cover ring-2 ring-orange-100"
            />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-full bg-orange-200 text-sm font-semibold text-orange-900 ring-2 ring-orange-100">
              {initials}
            </span>
          )}
          <span className="hidden max-w-32 flex-col sm:flex">
            <span className="truncate text-sm font-semibold text-slate-900">{fullName}</span>
            <span className="truncate text-xs text-slate-500">
              {userInfo?.email || 'Signed in user'}
            </span>
          </span>
          <ChevronDown className="hidden size-4 text-slate-500 sm:block" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <p className="truncate text-sm font-semibold text-slate-950">{fullName}</p>
          <p className="truncate text-xs font-normal text-slate-500">
            {userInfo?.email || 'Signed in user'}
          </p>
          {userInfo?.userType && (
            <p className="mt-1 text-xs font-normal capitalize text-slate-400">
              {userInfo.userType}
            </p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut} className="text-slate-700">
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
