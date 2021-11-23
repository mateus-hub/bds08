import 'flatpickr/dist/themes/material_green.css';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FilterData, Store } from '../../types';
import { makeRequest } from '../../utils/request';

import './styles.css';

type Props = {
  onFilterChange: (data: FilterData) => void;
};

function Filter({ onFilterChange }: Props) {
  const [storeId, setStore] = useState<Store[]>();

  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();

  const onSubmit = (formData: FilterData) => {
    onFilterChange(formData);
  };

  const onChangeStore = (value: Store) => {
    setValue('storeId', value);

    const obj: FilterData = {
      storeId: getValues('storeId')
    };

    onFilterChange(obj);
  };

  useEffect(() => {
    makeRequest({ url: '/stores' }).then((response) => {
      setStore(response.data);
    });
  }, []);

  return (
    <div className="base-card store-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="store-filter-form">
        <div className="form-control store-filter-gender-container">
          <Controller
            name="storeId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={storeId}
                isClearable
                placeholder="Selecione uma loja"
                classNamePrefix=" store-filter-select"
                onChange={(value) => onChangeStore(value as Store)}
                getOptionLabel={(store: Store) => store.name}
                getOptionValue={(store: Store) => String(store.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default Filter;
