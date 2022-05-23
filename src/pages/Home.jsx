import React, { useContext, useEffect } from 'react';

import PlanetsContext from '../context/PlanetsContext';
import Table from '../components/Table';
import Filters from '../components/Filters';
import AppliedFilters from '../components/AppliedFilters';
import Order from '../components/Order';

function Home() {
  const { getPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Filters />
      <Order />
      <AppliedFilters />
      <Table />
    </>
  );
}

export default Home;
