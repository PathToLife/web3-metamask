import { createTheme, ThemeOptions } from '@material-ui/core'
import { blue, blueGrey, orange } from '@material-ui/core/colors'
import { fontMayaSamuelsExtraLight, fontMayaSamuelsLight } from './font'

export const colorPalette = {
  orange: {
    ...orange,
    main: '#E0643A',
  },
  darkBlue: {
    ...blue,
    main: '#526AA2',
  },
  blueGrey: {
    ...blueGrey,
    main: '#8C96A8',
  },
  darkGrey: {
    main: '#5C5C5C',
  },
}

const themeDefault: ThemeOptions = {
  palette: {
    primary: colorPalette.orange,
    secondary: colorPalette.darkBlue,
    text: {
      primary: colorPalette.darkGrey.main,
    },
  },
  typography: {
    fontFamily: [
      'MayaSamuelsLight',
      '-apple-system',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          fontMayaSamuelsExtraLight as any,
          fontMayaSamuelsLight as any,
        ],
      },
    },
  },
}

export const themes = {
  dark: createTheme({
    ...themeDefault,
    palette: {
      ...themeDefault.palette,
      type: 'dark',
    },
  }),
  light: createTheme({
    ...themeDefault,
    palette: {
      ...themeDefault.palette,
      type: 'light',
    },
  }),
}
