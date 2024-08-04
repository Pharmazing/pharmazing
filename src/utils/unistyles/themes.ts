import { core } from './core';

export const lightTheme = {
  colors: {
    ...core.colors,
    loadingPrimary: core.colors.Blue500,
    loadingBackground: core.colors.Gray400,
    tabsContentBg: core.colors.Gray100,
    tabBarIcon: {
      default: '#505050',
      focused: core.colors.Green500,
    },
    addressBtnBg: '#AAAAAA',
    addressBtnFg: '#CCCCCC',
    icon: {
      default: '#5F6368',
    },
    text: {
      fg: core.colors.Blue900,
    },
  },
  size: {
    icon: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
    },
    text: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    layout: {
      xs: 2,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      xxl: 32,
    },
  },
} as const;

export const darkTheme = {
  colors: {
    ...core.colors,
    loadingPrimary: '#345ABB',
    loadingBackground: '#B9B9B9',
    tabsContentBg: '#FAFAFA',
    addressBtnBg: '#AAAAAA',
    addressBtnFg: '#CCCCCC',
    tabBarIcon: {
      default: '#505050',
      focused: '#345ABB',
    },
    icon: {
      default: '#5F6368',
    },
    text: {
      fg: core.colors.Blue900,
    },
  },
  size: {
    icon: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 48,
    },
    text: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    layout: {
      xs: 2,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      xxl: 32,
    },
  },
} as const;

// define other themes
