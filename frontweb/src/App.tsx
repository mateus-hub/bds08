import Header from './components/header';

import { useEffect, useMemo, useState } from 'react';
import { FilterData, PieChartConfig, SalesByGender } from './types';

import './App.css';
import { buildFilterParams, makeRequest } from './utils/request';

import SalesCard from './components/sales-card';

import { buildSalesByGenderChart } from './helpers';
import Filter from './components/filter';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByGender, setSalesByGender] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesByGender[]>('sales/by-gender', { params })
      .then((response) => {
        const newSalesByGender = buildSalesByGenderChart(response.data);
        setSalesByGender(newSalesByGender);
      })
      .catch(() => {
        console.error('Error to fetch sales by gender');
      });
  }, [params]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />

        <div className="sales-overview-container">
          <SalesCard
            name=""
            labels={salesByGender?.labels}
            series={salesByGender?.series}
            FilterData={filterData}
          />
        </div>
      </div>
    </>
  );
}

export default App;
