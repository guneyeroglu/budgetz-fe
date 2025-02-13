import { COLORS } from '@/theme';

interface IShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export const getShadow = (color: string = COLORS.shadow): IShadow => {
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  };
};
