import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { IMonthAndYear } from '@/global/interfaces';

interface IProp {
  monthAndYear: IMonthAndYear;
}

interface IAction {
  setMonthAndYear: (by: IMonthAndYear) => void;
}

export const useMonthAndYear = create<IProp & IAction>()(
  persist(
    (set) => ({
      monthAndYear: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      setMonthAndYear: (by: IMonthAndYear) =>
        set(() => ({
          monthAndYear: { month: by.month, year: by.year },
        })),
    }),
    {
      name: 'monthAndYear',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
