import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { Minus, Plus, Loader2 } from "lucide-react";
import { FaTrashAlt } from "react-icons/fa";
import {
  getAllCarts,
  updateCarts,
  deleteCarts,
  removeCarts,
} from "../../store/slices/cart.slice";
import {
  getAllProduits,
} from "../../store/slices/produits.slice";
import { getAllProduitVariants } from "../../store/slices/produitVariant.slice";
import Breadcrumb from "../../components/Breadcumb";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/Table";
import StarRating from "../../components/ui/StarRating";
import LoaderUltra from "../../components/ui/LoaderUltra";
import { BaseUrl } from "../../config";
import { useToast } from "../../hook/use-toast";
import { useAuth } from "../../context/authContext";
import Slugify from "../../utils/Slugify";

function Cart() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { produits } = useSelector((state) => state.produit);
  const { carts } = useSelector((state) => state.cart);
  const [loadTime, setLoadTime] = useState(0)
  const { toast } = useToast();
  const { userConnected } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const idConnected =
    userConnected?.role === "fournisseur"
      ? userConnected?.id
      : userConnected?.idUsershop;

  useEffect(() => {
    const loadData = async () => {
      const start = performance.now()
      try {
        await Promise.all([
      //     dispatch(getAllCateg()).unwrap(),
          dispatch(getAllProduits()).unwrap(),
          dispatch(getAllCarts()).unwrap(),
          dispatch(getAllProduitVariants()).unwrap(),
        ]);
        const end = performance.now()
        const duration = end - start
        setLoadTime(duration.toFixed(0))
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const monPanier = useMemo(() => {
    const res = carts?.filter(
      (x) =>
        x?.idUsershop === idConnected && x?.roleUser === userConnected?.role
    );
    return res?.map((y) => ({
      ...y,
      produit: produits?.find((z) => z.idproduits === y.idproduits),
    }));
  }, [carts, produits, idConnected, userConnected?.role]);

  const handleQuantityChange = async (item, newQte) => {
    if (newQte < 1) return;
    try {
      setLoading(true);
      await dispatch(
        updateCarts({ id: item.id, datas: { qte: newQte } })
      ).unwrap();
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la quantité.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await dispatch(removeCarts(id)).unwrap();
      toast({ title: "Produit supprimé du panier" });
    } catch {
      toast({
        title: "Erreur",
        description: "Suppression échouée.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPanier = monPanier?.reduce(
    (acc, item) => acc + item.produit?.pu * item.qte,
    0
  );

  if (isLoading) return <LoaderUltra loading={isLoading} duration={loadTime} />;

  return (
    <div className="bg-gray-50">
      {/* HEADER */}
      <div className="px-[5%] py-4 border-b bg-white">
        <Breadcrumb
          data={[
            { label: t("accueille"), path: "/" },
            { label: "Mon Panier", path: "/cart" },
          ]}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 px-[5%] pt-5 pb-8">
        {/* --- TABLE PANIER --- */}
        <div className="w-full md:w-2/3 bg-white rounded-[6px] h-fit border py-2 px-4">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-[55%]">Produit</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {monPanier?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 py-8"
                  >
                    Votre panier est vide 😔
                  </TableCell>
                </TableRow>
              ) : (
                monPanier.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <TableCell className="w-[55%]">
                      <div className="flex items-center gap-4">
                        <img
                          src={BaseUrl + item.produit?.profile}
                          alt={item.produit?.nom}
                          className="w-[70px] flex-shrink-0 h-[70px] object-contain rounded-lg border bg-gray-100"
                        />
                        <div>
                          <NavLink to={"/produits/" + Slugify(item.produit?.nom)} className="font-semibold text-blue-700">
                            {item.produit?.nom}
                          </NavLink>
                          <p className="text-gray-500 mb-1 text-sm line-clamp-2">
                            {item.produit?.description}
                          </p>
                          <StarRating rating={item.produit?.rating} size={13} />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-medium text-gray-700">
                      ${item.produit?.pu}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item, item.qte - 1)
                          }
                          className="!rounded-none !rounded-l-[6px] flex-shrink-0 border hover:bg-gray-100"
                        >
                          <Minus className="w-2 h-2" />
                        </Button>
                        <Input
                          type="number"
                          value={item.qte}
                          min={1}
                          onChange={(e) =>
                            handleQuantityChange(
                              item,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-full !rounded-none text-center border-y"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item, item.qte + 1)
                          }
                          className="!rounded-none !rounded-r-[6px] flex-shrink-0 border hover:bg-gray-100"
                        >
                          <Plus className="w-2 h-2" />
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="font-semibold text-gray-900">
                      ${(item.produit?.pu * item.qte).toFixed(2)}
                    </TableCell>

                    <TableCell className="text-right">
                      {loading ? (
                        <Loader2 className="animate-spin w-5 h-5 text-gray-400" />
                      ) : (
                        <FaTrashAlt
                          className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                          onClick={() => handleDelete(item.id)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* --- RÉSUMÉ --- */}
        <div className="w-full md:w-1/3 h-fit sticky top-24 bg-white rounded-[6px] border p-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
            Résumé de commande
          </h3>

          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>${totalPanier?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span className="text-green-600 font-medium">Gratuite</span>
            </div>
            <div className="flex justify-between border-t pt-3 font-semibold text-gray-900 text-lg">
              <span>Total</span>
              <span>${totalPanier?.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/checkout")}
            className="w-full mt-6 py-3 text-white font-medium bg-gray-900 hover:bg-gray-800 transition rounded-xl"
          >
            Passer à la caisse
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
