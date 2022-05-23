import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function Order() {
  const {
    setFilteredData,
    planets,
    setOrder,
    order,
  } = useContext(PlanetsContext);

  const handleSortChange = ({ target: { value, name } }) => {
    setOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sortASC = () => {
    const UM = 1;
    const UM_NEGATIVO = -1;
    const ZERO = 0;
    const unknown = planets.filter((planet) => planet[order.column] === 'unknown');
    const known = planets.filter((planet) => planet[order.column] !== 'unknown');
    known.sort((a, b) => {
      if (Number(a[order.column]) > Number(b[order.column])) {
        return UM;
      }
      if (Number(a[order.column]) < Number(b[order.column])) {
        return UM_NEGATIVO;
      }
      return ZERO;
    });
    setFilteredData([...known, ...unknown]);
  };

  const sortDESC = () => {
    const UM = 1;
    const UM_NEGATIVO = -1;
    const ZERO = 0;
    const unknown = planets.filter((planet) => planet[order.column] === 'unknown');
    const known = planets.filter((planet) => planet[order.column] !== 'unknown');
    known.sort((a, b) => {
      if (Number(a[order.column]) < Number(b[order.column])) {
        return UM;
      }
      if (Number(a[order.column]) > Number(b[order.column])) {
        return UM_NEGATIVO;
      }
      return ZERO;
    });
    setFilteredData([...known, ...unknown]);
  };

  const handleClickSort = () => {
    if (order.sort === 'ASC') {
      sortASC();
    }
    if (order.sort === 'DESC') {
      sortDESC();
    }
  };

  return (
    <form>
      <label htmlFor="column-sort">
        Ordenar
        <select
          name="column"
          id="column-sort"
          data-testid="column-sort"
          onChange={ (event) => handleSortChange(event) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="sort-asc">
        <input
          type="radio"
          name="sort"
          id="sort-asc"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ (event) => handleSortChange(event) }
        />
        Ascendente
      </label>
      <label htmlFor="sort-desc">
        <input
          type="radio"
          name="sort"
          id="sort-desc"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ (event) => handleSortChange(event) }
        />
        Descendente
      </label>
      <button
        name="sort-button"
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleClickSort() }
      >
        Ordenar
      </button>
    </form>
  );
}

export default Order;
