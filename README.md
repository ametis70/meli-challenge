<p align="center">
  <img src="public/img/logo.png" />
</p>

# Challenge MELI
[![Node.js CI](https://github.com/ametis70/meli-challenge/actions/workflows/node.js.yml/badge.svg)](https://github.com/ametis70/meli-challenge/actions/workflows/node.js.yml)
![Lighthouse performance score](.github/badges/lighthouse_performance.svg)
![Lighthouse accesibility score](.github/badges/lighthouse_accessibility.svg)
![Lighthouse best practices score](.github/badges/lighthouse_best-practices.svg)
![Lighthouse SEO score](.github/badges/lighthouse_seo.svg)

Esta challenge fue realizada para MercadoLibre, y se puede visitar en [este link](https://ian-mancini-meli-challenge.herokuapp.com/).

## Instrucciones

Instalar dependencias

```sh
npm install
```

### Desarrollo

Para abrir los servidores de desarrollo se debe usar:

```sh
npm run dev
```

El servidor de express estará disponible por defecto en el puerto 3000 (que se puede modificar con la variable de entorno `PORT`). El servidor de desarrollo de webpack (front-end) está disponible en el puerto 8000

### Producción

Para compilar el proyecto se debe usar:

```sh
npm run build
```

Mientras que para correrlo (luego de haberlo compilado):

```sh
npm run start
```

## Ideas
En esta sección hay varias ideas para mejorar el sitio web (principalmente en términos de escalabilidad) que no se llevaron a cabo:

- [ ] Implementar caché de lado de servidor para la vista de detalle de producto, para enviar una respuesta más rápida y no malgastar recursos en renderizar la misma página multiples veces.
- [ ] A su vez, se debería implementar un caché para las respuestas de la API de ML, para poder para determinar cuando la vista se debe renderizar nuevamente ([memoización](https://es.wikipedia.org/wiki/Memoizaci%C3%B3n)).
- [ ] Separar estilos en multiples archivos de SASS por cada vista y estilos compartidos.
- [ ] Agregar tests
