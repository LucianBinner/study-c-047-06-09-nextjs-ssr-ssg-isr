import { GridContent } from '../../components/GridContent';
import { GridImage } from '../../components/GridImage';
import { GridText } from '../../components/GridText';
import { GridTwoColumns } from '../../components/GridTwoColumns';

import { Base } from '../Base';

import Head from 'next/head';
import config from '../../config';

function Home({ data }) {
  const { menu, sections, footerHtml, slug, title } = data[0];
  const { links, text, link, srcImg } = menu;

  return (
    <>
      <Head>
        <title>
          {title} | {config.siteName}
        </title>
      </Head>
      <Base
        links={links}
        footerHtml={footerHtml}
        logoData={{ text, link, srcImg }}
      >
        {sections.map((section, index) => {
          const { component } = section;
          const key = `${slug}-${index}`;

          if (component === 'section.section-two-columns') {
            return <GridTwoColumns key={key} {...section} />;
          }

          if (component === 'section.section-content') {
            return <GridContent key={key} {...section} />;
          }

          if (component === 'section.section-grid-text') {
            return <GridText key={key} {...section} />;
          }

          if (component === 'section.section-grid-image') {
            return <GridImage key={key} {...section} />;
          }
        })}
      </Base>
    </>
  );
}

export default Home;
