import Home from '../templates/Home';
import axios from 'axios';
import config from '../config';
import { mapData } from '../api/map-data';

export default function HomePage({ data = null }) {
  return <Home data={data} />;
}

export const getStaticProps = async () => {
  let getStaticPropsReturn = {
    props: {
      data: [],
    },
  };
  try {
    const raw = await axios.get(config.url);
    getStaticPropsReturn.props.data = mapData(raw.data);
    return getStaticPropsReturn;
  } catch (error) {
    return getStaticPropsReturn;
  }
};
