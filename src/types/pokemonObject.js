import {
  arrayOf,
  number,
  shape,
  string,
} from 'prop-types';

const pokemonObject = shape({
  averageWeight: shape({
    measurementUnit: string,
    value: string,
  }),
  foundAt: arrayOf(shape({
    location: string,
    map: string,
  })),
  id: number,
  image: string,
  moreInfo: string,
  name: string,
  summary: string,
  type: string,
});

export default pokemonObject;