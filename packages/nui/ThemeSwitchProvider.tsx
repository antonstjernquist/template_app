import { ReactNode } from 'react';
import { themes } from './app.theme';

interface ThemeSwitchProviderProps {
  mode: 'light' | 'dark';
  children: ReactNode;
}
const ThemeSwitchProvider = ({ children, mode }: ThemeSwitchProviderProps) => {
  const themeOptions = themes[mode];
  console.log(themeOptions);
  return children;
};

export default ThemeSwitchProvider;
