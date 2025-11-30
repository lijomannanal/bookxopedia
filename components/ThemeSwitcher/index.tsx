'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '../ui/switch';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-3 mt-8">
      <Sun className="h-5 w-5 text-yellow-500" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        className="data-[state=checked]:bg-zinc-700"
      />
      <Moon className="h-5 w-5 text-slate-600" />
    </div>
  );
}
