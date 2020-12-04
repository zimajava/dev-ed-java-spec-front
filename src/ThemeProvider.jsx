import React, { useCallback, useReducer, useMemo, useContext } from 'react';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  useTheme,
} from '@material-ui/core/styles';

const ThemeDispatchContext = React.createContext(null);

export const ThemeProvider = ({ children, theme }) => {
  const themeInitialOptions = {
    paletteType: 'light',
  };

  const [themeOptions, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return { ...state, paletteType: action.payload };
      default:
        throw new Error();
    }
  }, themeInitialOptions);

  const memoizedTheme = useMemo(() => {
    return createMuiTheme({ ...theme, palette: { type: themeOptions.paletteType } });
  }, [theme, themeOptions.paletteType]);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export const useChangeTheme = () => {
  const dispatch = useContext(ThemeDispatchContext);
  const theme = useTheme();

  return useCallback(() => {
    dispatch({ type: 'changeTheme', payload: theme.palette.type === 'light' ? 'dark' : 'light' });
  }, [theme.palette.type, dispatch]);
};
