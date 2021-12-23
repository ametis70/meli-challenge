import { Helmet } from 'react-helmet-async'

type SEOProps = {
  description?: string
  title?: string
  image?: string
  meta?: ConcatArray<
    { name: string; content: string } | { property: string; content: string }
  >
}

const author = 'Ian Mancini <contacto@ianmancini.com.ar>'

const metadata = {
  locale: 'es',
  siteUrl: 'https://ian-mancini-meli-challenge.herokuapp.com',
  name: 'MELI Challenge',
  description: `Challenge (sitio web) realizado por ${author} para MELI`,
  image: 'img/logo.png',
  author,
}

const SEO: React.FC<SEOProps> = ({ title, description, image, meta = [] }) => {
  const computedTitle = title ? `${title} | ${metadata.name}` : metadata.name
  const computedDescription = description ?? metadata.description

  return (
    <Helmet
      title={computedTitle}
      meta={[
        {
          name: 'description',
          content: computedDescription,
        },
        {
          property: 'og:title',
          content: computedTitle,
        },
        {
          property: 'og:description',
          content: computedDescription,
        },
        {
          property: 'og:locale',
          content: metadata.locale,
        },
        {
          property: 'og:image',
          content: image ?? `${metadata.siteUrl}/${metadata.image}`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: metadata.author || '',
        },
        {
          name: 'twitter:title',
          content: computedTitle,
        },
        {
          name: 'twitter:description',
          content: computedDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
