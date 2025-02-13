import { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { Canvas, Path, Skia, Group, SkPath, Text as SkiaText, SkFont } from '@shopify/react-native-skia';

import { COLORS, SPACING } from '@/theme';

import { Text } from '../Text';

interface IChartData {
  value: number;
  color: string;
}

interface IText {
  text: string;
  font: SkFont | null;
  color?: string;
}

interface IProps {
  data: IChartData[];
  radius: number;
  innerRadius?: number;
  title?: IText;
  subtitle?: IText;
  chartInfoText?: string;
}

interface IPoint {
  x: number;
  y: number;
}

enum ARC_DIRECTION {
  CLOCKWISE = 1,
  COUNTER_CLOCKWISE = 0,
}

export const DonutChart: FC<IProps> = ({
  data,
  radius,
  innerRadius = radius * 0.6,
  title,
  subtitle,
  chartInfoText,
}) => {
  const titleText: string = title?.text ?? '';
  const titleFont: SkFont | null = title?.font ?? null;
  const titleColor: string = title?.color ?? COLORS.text;
  const subtitleText: string = subtitle?.text ?? '';
  const subtitleFont: SkFont | null = subtitle?.font ?? null;
  const subtitleColor: string = subtitle?.color ?? COLORS.text;

  const total: number = data.reduce((sum: number, item: IChartData) => sum + item.value, 0);
  const center: number = radius;
  const size: number = radius * 2;

  const createArcPath = (startAngle: number, endAngle: number): string => {
    const outerStart: IPoint = {
      x: center + radius * Math.cos(startAngle),
      y: center + radius * Math.sin(startAngle),
    };
    const outerEnd: IPoint = {
      x: center + radius * Math.cos(endAngle),
      y: center + radius * Math.sin(endAngle),
    };
    const innerStart: IPoint = {
      x: center + innerRadius * Math.cos(endAngle),
      y: center + innerRadius * Math.sin(endAngle),
    };
    const innerEnd: IPoint = {
      x: center + innerRadius * Math.cos(startAngle),
      y: center + innerRadius * Math.sin(startAngle),
    };

    const largeArcFlag: ARC_DIRECTION =
      endAngle - startAngle <= Math.PI ? ARC_DIRECTION.COUNTER_CLOCKWISE : ARC_DIRECTION.CLOCKWISE;

    return `
      M ${outerStart.x} ${outerStart.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
      L ${innerStart.x} ${innerStart.y}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerEnd.x} ${innerEnd.y}
      Z
    `;
  };

  let currentAngle: number = -Math.PI / 2;

  const titleTextWidth: number = titleFont?.measureText(titleText).width ?? 0;
  const titleTextHeight: number = titleFont?.measureText(titleText).height ?? 0;
  const subtitleTextWidth: number = subtitleFont?.measureText(subtitleText).width ?? 0;
  const subtitleTextHeight: number = subtitleFont?.measureText(titleText).height ?? 0;

  return (
    <View style={styles.container}>
      <View style={styles.chartInfoTextContainer}>
        <Text style={styles.chartInfoText} color='subtext' fontSize='xxs'>
          {chartInfoText}
        </Text>
      </View>
      <Canvas style={{ width: size, height: size + 1 }}>
        <Group>
          {data.map((item: IChartData, index: number) => {
            let itemValue: number = item.value;
            if (item.value === 0) itemValue = 0.0001;
            if (item.value === 100) itemValue = 99.9999;

            const sweepAngle: number = (itemValue / total) * (Math.PI * 2);
            const path: SkPath | null = Skia.Path.MakeFromSVGString(
              createArcPath(currentAngle, currentAngle + sweepAngle),
            );

            if (!path) return null;
            currentAngle += sweepAngle;

            return <Path key={index} path={path} color={item.color} style='fill' />;
          })}
          {titleText && titleFont && (
            <SkiaText
              x={center - titleTextWidth / 2}
              y={center + titleTextHeight / 4 - (subtitleText ? 8 : -5)}
              text={titleText}
              font={titleFont}
              color={titleColor}
            />
          )}
          {subtitleText && subtitleFont && (
            <SkiaText
              x={center - subtitleTextWidth / 2}
              y={center + subtitleTextHeight / 4 + (titleText ? 18 : 5)}
              text={subtitleText}
              font={subtitleFont}
              color={subtitleColor}
            />
          )}
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  chartInfoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chartInfoText: {
    flex: 1,
    textAlign: 'left',
  },
});
