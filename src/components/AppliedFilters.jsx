import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function AppliedFilters() {
  const {
    appliedFilters,
  } = useContext(PlanetsContext);

  return (
    <div>
      {
        appliedFilters.map((filter) => (
          <div key={ filter[0] }>
            <p>{`${filter[0]} ${filter[1]} ${filter[2]}`}</p>
            <button type="button">
              x
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default AppliedFilters;
