import { StyleSheet, View } from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { Card } from '@/components/Card';
import { DonutChart } from '@/components/Chart';
import { Layout } from '@/components/Layout';
import { ListCard } from '@/components/ListCard';
import { Text } from '@/components/Text';
import { ICardChip } from '@/global/interfaces';
import { calculatePercentage, convertMoney, formatDate, useAppFont } from '@/global/utils';
import { COLORS, SPACING, TYPOGRAPHY } from '@/theme';

interface IComingDebt {
  debtId: number;
  dueDate: string;
  remainingDays: number;
  debtInfoText: string;
  debtInfoSource: string;
  debtAmount: number;
}

export default function HomeScreen() {
  const monthlyIncome: number = 10_000;
  const monthlyExpense: number = 5_000;
  const paidDebt: number = 3_500;
  const remainingIncome: number = monthlyIncome - paidDebt;
  const remainingExpense: number = monthlyExpense - paidDebt;
  const comingDebtList: Array<IComingDebt> = [
    {
      debtId: 123456,
      remainingDays: 0,
      dueDate: formatDate(new Date('2025-02-24').toISOString(), { hideYear: true }),
      debtInfoText: 'İhtiyaç Kredisi',
      debtInfoSource: 'Garanti Bankası',
      debtAmount: 1_000,
    },
    {
      debtId: 123457,
      remainingDays: 4,
      dueDate: formatDate(new Date('2025-02-28').toISOString(), { hideYear: true }),
      debtInfoText: 'Kredi Kartı Borcu',
      debtInfoSource: 'YapıKredi Bankası',
      debtAmount: 500,
    },
  ];

  const monthlyIncomeChipColor: string = COLORS.success;
  const monthlyExpenseChipColor: string = COLORS.warning;
  const remainingIncomeChipColor: string = COLORS.accent;
  const paidDebtChipColor: string = COLORS.info;
  const remainingExpenseChipColor: string = COLORS.error;

  const { fontMedium: fontMediumSizeXLarge } = useAppFont(TYPOGRAPHY.fontSize.xl);
  const { fontRegular: fontRegularSizeSmall } = useAppFont(TYPOGRAPHY.fontSize.sm);

  const incomesChips: ICardChip[] = [
    {
      id: 1,
      color: monthlyIncomeChipColor,
      text: {
        label: 'Toplam Gelir',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(monthlyIncome),
        color: COLORS.text,
      },
    },
    {
      id: 2,
      color: monthlyExpenseChipColor,
      text: {
        label: 'Aylık Giderler',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(monthlyExpense),
        color: COLORS.text,
      },
    },

    {
      id: 3,
      color: paidDebtChipColor,
      text: {
        label: 'Bu Ay Ödenen',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(paidDebt),
        color: COLORS.text,
      },
    },
    {
      id: 4,
      color: remainingExpenseChipColor,
      text: {
        label: 'Kalan Borç',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(remainingExpense),
        color: COLORS.text,
      },
    },
    {
      id: 5,
      color: remainingIncomeChipColor,
      text: {
        label: 'Net Bakiye',
        color: COLORS.text,
      },
      subtext: {
        label: convertMoney(remainingIncome),
        color: COLORS.text,
      },
    },
  ];

  return (
    <Layout>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Card
            title='Aylık Finansal Özetim'
            chips={incomesChips}
            ChartComponent={() => (
              <DonutChart
                data={[
                  {
                    color: paidDebtChipColor,
                    value: calculatePercentage(paidDebt, monthlyExpense),
                  },
                  {
                    color: remainingExpenseChipColor,
                    value: calculatePercentage(remainingExpense, monthlyExpense),
                  },
                ]}
                radius={100}
                innerRadius={65}
                title={{
                  text: `${calculatePercentage(paidDebt, monthlyExpense)}%`,
                  font: fontMediumSizeXLarge,
                }}
                subtitle={{
                  text: `Ödenen Borç`,
                  font: fontRegularSizeSmall,
                }}
                chartInfoText='*Ödenen borcun toplam borca oranı'
              />
            )}
          />
          <View>
            <Text fontSize='xl'>Yaklaşan Ödemelerim</Text>
            <View style={styles.comingDebtList}>
              {comingDebtList.map((list: IComingDebt) => (
                <ListCard
                  key={list.debtId}
                  title={list.debtInfoText}
                  subtitle={list.debtInfoSource}
                  amount={convertMoney(list.debtAmount)}
                  dueDate={list.dueDate}
                  remainingDays={list.remainingDays}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: SPACING.md,
    gap: SPACING['2xl'],
  },
  comingDebtList: {
    marginTop: SPACING.md,
    gap: SPACING.md,
  },
});
