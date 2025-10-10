import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-4 py-2 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité - Fournisseurs Marketplace</h1>

      <p className="mb-4">
        Cette politique de confidentialité s'applique aux fournisseurs utilisant notre plateforme marketplace
        pour vendre leurs produits ou services. Elle explique comment nous collectons, utilisons, stockons
        et protégeons les données personnelles des vendeurs.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Informations collectées</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Nom de l'entreprise, nom du représentant légal</li>
        <li>Adresse e-mail et numéro de téléphone professionnel</li>
        <li>Informations bancaires pour les paiements</li>
        <li>Informations sur les produits/services proposés</li>
        <li>Données de connexion et d'activité sur la plateforme</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Utilisation des données</h2>
      <p className="mb-4">
        Les données collectées sont utilisées pour :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Gérer votre compte fournisseur</li>
        <li>Faciliter les paiements et la facturation</li>
        <li>Assurer le support client</li>
        <li>Respecter nos obligations légales et fiscales</li>
        <li>Améliorer la sécurité de la plateforme</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Partage des données</h2>
      <p className="mb-4">
        Vos données peuvent être partagées avec :
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Nos partenaires de paiement</li>
        <li>Les autorités fiscales et légales, si requis</li>
        <li>Les clients dans le cadre du service (ex : informations de livraison)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sécurité</h2>
      <p className="mb-4">
        Nous mettons en place des mesures de sécurité techniques et organisationnelles
        pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Conservation des données</h2>
      <p className="mb-4">
        Vos données sont conservées aussi longtemps que nécessaire pour les finalités décrites,
        ou conformément aux obligations légales en vigueur.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Vos droits</h2>
      <p className="mb-4">
        Vous avez le droit d'accéder à vos données, de les corriger, de demander leur suppression
        ou leur portabilité. Pour toute demande, veuillez nous contacter à :
        <span className="font-medium"> support@votremarketplace.com</span>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Modifications</h2>
      <p className="mb-4">
        Nous pouvons mettre à jour cette politique à tout moment. Toute modification importante sera
        communiquée via votre tableau de bord fournisseur.
      </p>

      <p className="mt-8 text-sm text-gray-600">
        Dernière mise à jour : 9 octobre 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
