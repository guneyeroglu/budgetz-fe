import { SkFont, useFont } from '@shopify/react-native-skia';

interface IUseAppFont {
  fontLight: SkFont | null;
  fontRegular: SkFont | null;
  fontMedium: SkFont | null;
  fontBold: SkFont | null;
}

export const useAppFont = (size: number): IUseAppFont => {
  const fontLight: SkFont | null = useFont(require('../../../../assets/fonts/Poppins-Light.ttf'), size);
  const fontRegular: SkFont | null = useFont(require('../../../../assets/fonts/Poppins-Regular.ttf'), size);
  const fontMedium: SkFont | null = useFont(require('../../../../assets/fonts/Poppins-Medium.ttf'), size);
  const fontBold: SkFont | null = useFont(require('../../../../assets/fonts/Poppins-Bold.ttf'), size);

  return { fontLight, fontRegular, fontMedium, fontBold };
};
