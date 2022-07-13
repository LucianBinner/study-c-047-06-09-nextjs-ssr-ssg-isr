import axios from 'axios';
import config from '../config';
import { mapData } from './map-data';

export const loadPages = async (slug = '') => {
  const cleanSlug = slug ? `?slug=${slug.replace(/[^a-z0-9-_]/gi, '')}` : '';
  const url = `${config.url}/pages${cleanSlug}`;
  const raw = await axios.get(url);
  const data = mapData(raw.data);
  return data;
};
