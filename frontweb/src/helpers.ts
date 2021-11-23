import { SalesByGender } from './types';

export const buildSalesByGenderChart = (genders: SalesByGender[]) => {
  const labels = genders.map((genders) => genders.gender);
  const series = genders.map((genders) => genders.sum);

  return {
    labels,
    series
  };
};
