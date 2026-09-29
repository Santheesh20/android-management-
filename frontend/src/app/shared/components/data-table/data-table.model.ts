export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'status' | 'badge' | 'link' | 'stacked' | 'chevron';
}

export interface StackedCell {
  main: string;
  sub?: string;
}

export const STATUS_DOT_STYLES: { [key: string]: string } = {
  online: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]',
  offline: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]',
  healthy: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]',
  warning: 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]',
  critical: 'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]',
};

export const BADGE_STYLES: { [key: string]: string } = {
  healthy: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20',
  critical: 'bg-red-500/15 text-red-400 ring-1 ring-red-500/20',
  blacklist: 'bg-red-500/15 text-red-400 ring-1 ring-red-500/20',
  login: 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20',
  logout: 'bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/20',
  failed: 'bg-red-500/15 text-red-400 ring-1 ring-red-500/20',
  auth: 'bg-sky-500/15 text-sky-400 ring-1 ring-sky-500/20',
  device: 'bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/20',
  organization: 'bg-[#b98668]/15 text-[#d9a988] ring-1 ring-[#b98668]/20',
};

export const BADGE_ICON_STYLES: { [key: string]: string } = {
  login: 'bi-box-arrow-in-right',
  logout: 'bi-box-arrow-right',
  failed: 'bi-exclamation-triangle-fill',
};