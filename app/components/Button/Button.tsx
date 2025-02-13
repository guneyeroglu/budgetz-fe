import { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const Button: FC<TouchableOpacityProps> = ({ ...props }) => {
  return <TouchableOpacity activeOpacity={1} {...props} />;
};
