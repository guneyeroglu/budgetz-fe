import React, { FC } from 'react';
import { Text as RNText, TextProps } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@/theme';

interface IProps extends TextProps {
  color?: keyof typeof COLORS;
  fontSize?: keyof typeof TYPOGRAPHY.fontSize;
  variant?: keyof typeof TYPOGRAPHY.fontFamily;
}

export const Text: FC<IProps> = ({
  children,
  style,
  color = 'text',
  fontSize = 'md',
  variant = 'regular',
  ...rest
}) => {
  return (
    <RNText
      style={[
        {
          color: COLORS[color],
          fontSize: TYPOGRAPHY.fontSize[fontSize],
          fontFamily: TYPOGRAPHY.fontFamily[variant],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
