export const addOpacity = (rgbaColor: string, opacity: number = 1): string => {
  if (opacity < 0) opacity = 0;
  if (opacity > 1) opacity = 1;

  if (rgbaColor.startsWith('rgba')) {
    return rgbaColor.replace(/rgba?\(([^)]+)\)/, (_, values) => {
      const rgbValues = values.split(',').slice(0, 3).join(',');
      return `rgba(${rgbValues}, ${opacity})`;
    });
  }

  if (rgbaColor.startsWith('rgb')) {
    return rgbaColor.replace(/rgb\(([^)]+)\)/, `rgba($1, ${opacity})`);
  }

  return rgbaColor;
};
