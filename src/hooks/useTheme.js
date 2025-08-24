import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function useTheme() {
  const { theme, setTheme, applyTheme } = useContext(ThemeContext);
  return { theme, setTheme, applyTheme };
}

export default useTheme;
