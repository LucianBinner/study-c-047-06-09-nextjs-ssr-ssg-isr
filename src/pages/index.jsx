import Home from '../templates/Home';
import { loadPages } from '../api/load-pages';

export default function HomePage({ data = null }) {
  return <Home data={data} />;
}

export const getStaticProps = async () => {
  let data = [];
  try {
    data = await loadPages('landing-page');
  } catch (error) {
    console.log(error);
  }
  if (!data || !data.length) {
    // Caso não tenha dados é exibido a página notFound
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
};
