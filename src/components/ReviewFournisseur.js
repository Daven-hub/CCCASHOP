import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';

const ReviewFournisseur = ({ fournisseur }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      nom: "Jean Dupont",
      note: 5,
      commentaire: "Excellent service et livraison rapide !",
      date: "2025-10-01"
    },
    {
      id: 2,
      nom: "Sophie Martin",
      note: 4,
      commentaire: "Produits de qualité, je recommande.",
      date: "2025-09-22"
    }
  ]);

  const [newReview, setNewReview] = useState({
    nom: "",
    note: 0,
    commentaire: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.nom || !newReview.note || !newReview.commentaire) return;

    const newAvis = {
      ...newReview,
      id: reviews.length + 1,
      date: new Date().toISOString().slice(0, 10)
    };

    setReviews([newAvis, ...reviews]);
    setNewReview({ nom: "", note: 0, commentaire: "" });
  };

  return (
    <div className="w-full px-2 py-2 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Avis sur le fournisseur : <span className="text-blue-600">{fournisseur.nom}</span>
      </h1>

      {/* Liste des avis */}
      <div className="space-y-6 mb-10">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">Aucun avis pour ce fournisseur pour le moment.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{review.nom}</h4>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <ReactStars
                count={5}
                value={review.note}
                size={20}
                edit={false}
                activeColor="#facc15"
              />
              <p className="mt-2 text-gray-700">{review.commentaire}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulaire d'avis */}
      <div className="bg-white p-6 shadow rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Laisser un avis</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Votre nom</label>
            <input
              type="text"
              value={newReview.nom}
              onChange={(e) => setNewReview({ ...newReview, nom: e.target.value })}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: Marie Dupuis"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Votre note</label>
            <ReactStars
              count={5}
              value={newReview.note}
              size={28}
              activeColor="#facc15"
              onChange={(newRating) => setNewReview({ ...newReview, note: newRating })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Votre avis</label>
            <textarea
              value={newReview.commentaire}
              onChange={(e) => setNewReview({ ...newReview, commentaire: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Décrivez votre expérience..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Envoyer l'avis
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewFournisseur;
