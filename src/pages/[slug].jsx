import { loadPages } from '../api/load-pages';
import Home from '../templates/Home';
import { useRouter } from 'next/router';

export default function PageSlug({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    // Verifica se o falback é true se for ele tenta renderizar a página e depois passa falback para false
    return <h1>Carregando...</h1>;
  }
  return <Home data={data} />;
}

// // getServerSideProps
// // O metodo de getServerSideProps é muito similar ao getStaticProps, pois não é necessário fazer quase que alteração alguma, a única coisa que muda é no trabalho de build final do next, pois o gatStaticProps gera páginas estáticas e o getServerSideProps necessita de servido para ficar buscando as páginas em tempo real
// // O metodo de getServerSideProps ou revalidate não utilizar-se do next export, pois ocorrerá conflitos.
// export const getServerSideProps = async (context) => {
//   let data = null;
//   try {
//     data = await loadPages(context.params.slug);
//   } catch (error) {
//     data = null;
//   }

//   if (!data || !data.length) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       data,
//     },
//   };
// };

// ============================================================================

// // GetStaticProps - Exemplo 01
// // Por padrão sempre que queremos gerar arquivos estaticos com getStaticProps no next em rotas dinamicas temos de utilizar em conjunto o getStaticPaths
// export const getStaticPaths = async () => {
//   const paths = (await loadPages()).map((pages) => {
//     return {
//       params: {
//         slug: pages.slug,
//       },
//     };
//   });
//   return {
//     paths, // Todas os caminhos que teram sua correspondencia direcionada para este coponente
//     fallback: false, // fallback em true indica que todas as páginas que não existem correspondencia tera seu caminho direcionado para este componente, já em false só direicionará as correspondencias em que estão dentro do array de paths
//   };
// };

// export const getStaticProps = async (context) => {
//   let data = null;
//   try {
//     data = await loadPages(context.params.slug);
//   } catch (error) {
//     data = null;
//   }

//   if (!data || !data.length) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       data,
//     },
//   };
// };

// ============================================================================

// GetStaticProps - Exemplo 02 (Com fallback: true)
export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          slug: 'udemy', // Prerenderiza apenas a página com o slug da udemy, os demais ele tenta buscar
        },
      },
    ],
    fallback: true,
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
    revalidate: 30, // Revalida a página a cada 30 segundos
  };
};
