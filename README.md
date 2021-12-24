<p align="center">
  <img src="public/img/logo.png" />
</p>

# Challenge MELI

![Lighthouse performance score](.github/badges/lighthouse_performance.svg)
![Lighthouse accesibility score](.github/badges/lighthouse_accessibility.svg)
![Lighthouse best practices score](.github/badges/lighthouse_best-practices.svg)
![Lighthouse SEO score](.github/badges/lighthouse_seo.svg)

Esta challenge fue realizada para MercadoLibre, y se puede visitar en [este link](https://ian-mancini-meli-challenge.herokuapp.com/).

## Ideas
En esta sección hay varias ideas para mejorar el sitio web (principalmente en términos de escalabilidad) que no se llevaron a cabo:

- [ ] Implementar caché de lado de servidor para la vista de detalle de producto, para enviar una respuesta más rápida y no malgastar recursos en renderizar la misma página multiples veces.
- [ ] A su vez, se debería implementar un caché para las respuestas de la API de ML, para poder para determinar cuando la vista se debe renderizar nuevamente ([memoización](https://es.wikipedia.org/wiki/Memoizaci%C3%B3n)).
- [ ] Separar estilos en multiples archivos de SASS por cada vista y estilos compartidos.
