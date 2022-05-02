import React, { useContext, useEffect } from 'react';

import PlanetsContext from '../context/PlanetsContext';
import Table from '../components/Table';
import Filters from '../components/Filters';

function Home() {
  const { getPlanets } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Filters />
      <Table />
    </>
  );
}

export default Home;
