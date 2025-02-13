export interface ICardChip {
  id: number;
  color: string;
  text: {
    label: string;
    color: string;
  };
  subtext: {
    label: string;
    color: string;
  };
}
