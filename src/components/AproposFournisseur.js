import React from 'react';

const AproposFournisseur = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">À propos de nous</h1>

      <p className="mb-6 text-lg text-center max-w-3xl mx-auto">
        Bienvenue sur notre marketplace ! Nous sommes une équipe passionnée par l'innovation,
        le commerce équitable et la mise en relation entre fournisseurs et clients dans un
        environnement sécurisé, moderne et efficace.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
          <p className="text-gray-700">
            Nous avons pour mission de simplifier la vente en ligne pour les fournisseurs en leur
            offrant une plateforme accessible, performante et transparente. Que vous soyez un petit
            artisan ou une entreprise établie, nous vous aidons à atteindre plus de clients
            sans les contraintes techniques.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Pourquoi nous choisir ?</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Inscription rapide et sans frais cachés</li>
            <li>Gestion simplifiée des produits et commandes</li>
            <li>Support dédié aux fournisseurs 7j/7</li>
            <li>Outils de promotion et de statistiques avancés</li>
            <li>Paiements sécurisés et rapides</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Nos valeurs</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Transparence et confiance</li>
            <li>Respect des vendeurs et des clients</li>
            <li>Qualité et accessibilité</li>
            <li>Éthique commerciale</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Notre équipe</h2>
          <p className="text-gray-700">
            Notre équipe est composée d'experts en e-commerce, développeurs, designers et
            professionnels du service client. Ensemble, nous travaillons pour garantir la meilleure
            expérience possible pour vous en tant que vendeur sur notre marketplace.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg">
          Vous souhaitez vendre avec nous ? <span className="font-semibold text-blue-600">Contactez notre équipe fournisseur</span> dès aujourd'hui !
        </p>
      </div>
    </div>
  );
};

export default AproposFournisseur;
