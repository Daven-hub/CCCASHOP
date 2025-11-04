import React, { useState } from "react";
import { StarIcon, TruckIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.profile);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-[5%] flex flex-col gap-10">
      {/* Fil d’Ariane */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <a href="/" className="hover:text-primary">Accueil</a>
        <ChevronRightIcon size={14} />
        <a href="/produits" className="hover:text-primary">Produits</a>
        <ChevronRightIcon size={14} />
        <span className="text-gray-800 font-semibold">{product.nom}</span>
      </div>

      {/* Section principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <Card className="p-4 flex justify-center items-center aspect-square bg-white">
            <img
              src={mainImage}
              alt={product.nom}
              className="object-contain max-h-[500px] w-auto"
            />
          </Card>
          <div className="flex gap-3 justify-center">
            {product.other_image?.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img.nom)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  mainImage === img.nom ? "border-primary" : "border-gray-200"
                }`}
              >
                <img src={img.nom} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Infos produit */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.nom}</h1>
            <div className="flex items-center gap-2 mt-1">
              <StarIcon className="text-yellow-400" size={18} />
              <span className="text-gray-600 text-sm">{product.rating} / 5</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold text-primary">
              {product.pu?.toLocaleString()} FCFA
            </span>
            <span className="text-sm text-gray-500">
              En stock : {product.qte} unités
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            {product.hasVariation && (
              <div className="flex flex-wrap gap-2">
                {product.productvariant?.map((variant, i) => (
                  <Button key={i} variant="outline" className="text-sm">
                    {variant.variantvalue.map(v => v.attributevalue.value).join(" / ")}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <TruckIcon className="text-green-600" size={20} />
            <span className="text-sm font-medium text-green-700">
              Livraison rapide disponible
            </span>
          </div>

          <div className="flex gap-3 mt-4">
            <Button className="flex-1">Ajouter au panier</Button>
            <Button variant="outline" className="flex-1">Acheter maintenant</Button>
          </div>
        </div>
      </div>

      {/* Description & Détails techniques */}
      <Tabs defaultValue="desc" className="w-full mt-10">
        <TabsList className="flex gap-3 border-b">
          <TabsTrigger value="desc">Description</TabsTrigger>
          <TabsTrigger value="specs">Spécifications</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
        </TabsList>
        <TabsContent value="desc" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700">{product.description}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specs" className="mt-6">
          <Card>
            <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><strong>SKU:</strong> {product.skuProduit}</div>
              <div><strong>Catégorie:</strong> {product.categories?.nom}</div>
              <div><strong>Stock minimum:</strong> {product.minStock}</div>
              <div><strong>État:</strong> {product.status ? "Actif" : "Inactif"}</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-500 italic">Aucun avis pour le moment.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
