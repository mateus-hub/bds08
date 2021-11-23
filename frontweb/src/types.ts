// export type Store = 'Araguari' | 'Ituitaba' | 'Uberaba' | 'Uberlândia';
// export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Store = {
  id: number;
  name: string;
};
export type SalesSummaryData = {
  sum: number;
  min?: number;
  max?: number;
  avg?: number;
  count?: number;
};

export type FilterData = {
  storeId?: Store | null;
};

export type SalesByGender = {
  gender: string;
  sum: number;
};

export type PieChartConfig = {
  labels: string[];
  series: number[];
};
