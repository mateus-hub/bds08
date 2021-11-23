import { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FilterData, SalesSummaryData } from '../../types';
import { formatPrice } from '../../utils/formatters';
import { buildFilterParams, makeRequest } from '../../utils/request';

import { buildPieChartConfig } from './helpers';

import './styles.css';

type Props = {
  labels?: string[];
  name: string;
  series?: number[];
  FilterData?: FilterData;
};

const initialSummary = {
  sum: 0
};

function SalesCard({ labels = [], name, series = [], FilterData }: Props) {
  const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);

  const params = useMemo(() => buildFilterParams(FilterData), [FilterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>('sales/summary', { params })
      .then((response) => {
        setSummary(response.data);
      })
      .catch(() => {
        console.error('Error to fetch total sales');
      });
  }, [params]);

  return (
    <div className="base-card sales-container">
      <div className="sales-data">
        <div className="sales-quantity-container">
          <h2 className="sales-quantity">{formatPrice(summary?.sum)}</h2>
          <span className="sales-quantity-label">Total de vendas</span>
        </div>
        <div className="pie-chart-card">
          <ReactApexChart
            options={buildPieChartConfig(labels, name)}
            type="donut"
            width="300"
            height="300"
            series={series}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesCard;
