const fetchPlanets = async () => {
  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const response = await fetch(END_POINT);

  const result = await response.json();

  return result;
};

export default fetchPlanets;
