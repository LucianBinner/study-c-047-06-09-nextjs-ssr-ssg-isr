import { loadPages } from '../api/load-pages';
import Home from '../templates/Home';

export default function PageSlug({ data }) {
  return <Home data={data} />;
}

// Por padrão sempre que queremos gerar arquivos estaticos com getStaticProps no next em rotas dinamicas temos de utilizar em conjunto o getStaticPaths
export const getStaticPaths = async () => {
  const paths = (await loadPages()).map((pages) => {
    return {
      params: {
        slug: pages.slug,
      },
    };
  });
  return {
    paths, // Todas os caminhos que teram sua correspondencia direcionada para este coponente
    fallback: false, // fallback em true indica que todas as páginas que não existem correspondencia tera seu caminho direcionado para este componente, já em false só direicionará as correspondencias em que estão dentro do array de paths
  };
};

export const getStaticProps = async (context) => {
  let data = null;
  try {
    data = await loadPages(context.params.slug);
  } catch (error) {
    data = null;
  }

  if (!data || !data.length) {
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
