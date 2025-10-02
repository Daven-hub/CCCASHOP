
// Importez vos routes
const router= require('./src/routes').default
const path = require('path');
const Sitemap = require('react-router-sitemap').default;

// Génération du sitemap
function generateSitemap() {
  const sitemap = new Sitemap(router)
  .applyParams({
    '/products/:id': [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ],
  })
    .build('https://www.cc-ca.ca') // Remplacez par votre domaine
    .save(path.resolve('./public/sitemap.xml')); // Le fichier sera généré dans /public

  return sitemap;
}

generateSitemap();
