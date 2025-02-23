const APPLE_COLORS = {
  red: 'rgb(255, 69, 58)',
  orange: 'rgb(255, 159, 10)',
  yellow: 'rgb(255, 214, 10)',
  green: 'rgb(48, 209, 88)',
  mint: 'rgb(120, 230, 210)',
  teal: 'rgb(54, 220, 220)',
  cyan: 'rgb(100, 210, 255)',
  blue: 'rgb(10, 132, 255)',
  indigo: 'rgb(94, 92, 230)',
  purple: 'rgb(191, 90, 242)',
  pink: 'rgb(255, 55, 95)',
  brown: 'rgb(172, 142, 104)',

  gray: 'rgb(142, 142, 147)',
  gray2: 'rgb(99, 99, 102)',
  gray3: 'rgb(72, 72, 74)',
  gray4: 'rgb(58, 58, 60)',
  gray5: 'rgb(44, 44, 46)',
  gray6: 'rgb(28, 28, 30)',
} as const;

const APP_COLORS = {
  primary: 'rgb(10, 18, 45)',
  secondary: 'rgb(18, 30, 70)',
  cardBackground: 'rgb(22, 38, 65)',
  border: 'rgb(28, 45, 78)',

  text: 'rgb(235, 235, 245)',
  subtext: 'rgb(150, 155, 165)',
  disabledText: 'rgb(135, 140, 150)',

  success: APPLE_COLORS.green,
  warning: APPLE_COLORS.orange,
  error: APPLE_COLORS.red,
  info: APPLE_COLORS.cyan,

  accent: APPLE_COLORS.teal,
  transparent: 'transparent',
  shadow: 'rgb(0, 0, 0)',
} as const;

export const COLORS = {
  ...APPLE_COLORS,
  ...APP_COLORS,
} as const;
