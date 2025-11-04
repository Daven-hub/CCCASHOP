import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendor } from "../../store/slices/vendeur.slice";
import { getAllProduitVariants } from "../../store/slices/produitVariant.slice";
import { ShoppingCart01Icon, FavouriteIcon, EyeIcon } from "hugeicons-react";
import Slugify from "../../utils/Slugify";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "../../hook/use-toast";
import { BaseUrl } from "../../config";
import StarRating from "../ui/StarRating";
import {
  createCarts,
  getAllCarts,
  updateCarts,
} from "../../store/slices/cart.slice";
import { useAuth } from "../../context/authContext";
import { Loader2 } from "lucide-react";
import {
  createFavoris,
  getAllFavoris,
  removeFavoris,
} from "../../store/slices/favoris.slice";
import LoaderProduitCard from "../loader/LoaderProduitCard";

export const CardProduit = ({ x }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const { produitVariants } = useSelector((state) => state.produitVariant);
  const { vendeurs } = useSelector((state) => state.vendeur);
  const { carts } = useSelector((state) => state.cart);
  const { favoris } = useSelector((state) => state.favori);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userConnected } = useAuth();
  const idConnected =
    userConnected?.role === "fournisseur"
      ? userConnected?.id
      : userConnected?.idUsershop;

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      const start = performance.now();
      try {
        await Promise.all([
          dispatch(getAllVendor()).unwrap(),
          dispatch(getAllProduitVariants()).unwrap(),
          dispatch(getAllCarts()).unwrap(),
          dispatch(getAllFavoris()).unwrap(),
        ]);

        const end = performance.now();
        const duration = end - start;
        setLoadTime(duration.toFixed(0));
      } catch (error) {
        toast({
          title: error?.toString(),
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, toast]);

  const getPrixVariantSock = (id) => {
    const variants = produitVariants
      ?.filter((x) => x.idProduit === id)
      .map((y) => y?.pu);
    const min = Math.min(...variants);
    const max = Math.max(...variants);
    let result = "$" + min;
    if (min !== max) {
      result += " - $" + max;
    }
    return result;
  };

  const handleAddCart = async (produits, idVariant, qte) => {
    setLoading(true);
    const { idproduits } = produits;
    const cartUnique = carts?.find(
      (x) => x?.idproduits === idproduits && x?.idUsershop === idConnected && x?.idProduitVariant===idVariant && x?.roleUser===userConnected?.role
    );
    let data;
    if (!cartUnique) {
      data = {
        idproduits: idproduits,
        idUsershop: idConnected,
        roleUser: userConnected?.role,
        qte: qte,
        idProduitVariant: idVariant,
      };
    } else {
      data = {
        id: cartUnique?.id,
        datas: { qte: cartUnique?.qte + qte },
      };
    }
    try {
      if (!userConnected) {
        navigate("/mon-compte/connexion");
      } else {
        if (!cartUnique) {
          await dispatch(createCarts(data)).unwrap();
        } else {
          await dispatch(updateCarts(data)).unwrap();
        }
        toast({
          title: "Produit ajouté dans le panier",
        });
      }
    } catch (error) {
      toast({
        title: "Enregistrement échouée",
        description: error?.toString(),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRemoveFavoris = async (produits) => {
    setLoading(true);
    const { idproduits } = produits;
    const favorisUnique = favoris?.find(
      (x) => x?.idProduits === idproduits && x?.idUser === idConnected
    );
    const data = {
      idProduits: idproduits,
      idUser: idConnected,
      roleUser: userConnected?.role,
    };

    try {
      if (!userConnected) {
        navigate("/mon-compte/connexion");
      } else {
        if (!favorisUnique) {
          await dispatch(createFavoris(data)).unwrap();
          toast({
            title: "Produit ajouté dans les favoris",
          });
        } else {
          await dispatch(removeFavoris(favorisUnique?.idFavoris)).unwrap();
          dispatch(getAllFavoris()).unwrap();
          toast({
            title: "Produit retiré des favoris",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Enregistrement échouée",
        description: error?.toString(),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isFavoris = (y) => {
    const favorisUnique = favoris?.find(
      (x) => x?.idProduits === y && x?.idUser === idConnected
    );
    if (favorisUnique) {
      return true;
    }
    return false;
  };

  const getImageFourn = (z) => {
    const result = vendeurs.find((y) => y?.id === z);
    return result;
  };

  const handleNavigation=(nom)=>{
    navigate("/produits/"+Slugify(nom))
  }

  // console.log("favoris",favoris)
  if (isLoading) {
    return <LoaderProduitCard />;
  }

  return (
    <div className="group border p-2 border-gray-200 overflow-hidden bg-white rounded-[5px]">
      <div className="relative h-[200px] md:h-[265px] overflow-hidden p-6 bg-primary/5">
        <img
          className="absolute group-hover:scale-[.75] duration-500 transition-all scale-[.65] rounded-t-[5px] overflow-hidden left-0 top-0 w-full h-full object-contain"
          src={BaseUrl + x?.profile}
          alt={x?.name + "-" + x?.idVendeur}
        />
        <div className="flex absolute right-2 top-2.5 text-error flex-col gap-2 transform transition-transform duration-300 translate-x-[120%] group-hover:translate-x-0">
          <div
            onClick={() => handleAddRemoveFavoris(x)}
            className="p-1 w-fit cursor-pointer rounded-full  hover:text-primary/65 bg-gray-100"
          >
            <FavouriteIcon
              strokeWidth={2}
              className={
                isFavoris(x?.idproduits) ? "text-error fill-error" : ""
              }
              size={20}
            />{" "}
          </div>
          <div className="p-1 w-fit cursor-pointer rounded-full  hover:text-primary/65 bg-gray-100">
            <EyeIcon strokeWidth={2} size={20} />{" "}
          </div>
        </div>
      </div>
      <div className="pb-1.5 pt-2.5 relative px-2 flex flex-col gap-1">
        <NavLink
          to={"/produits/" + Slugify(x?.nom)}
          className="flex items-center"
        >
          <h1 className="group-hover:text-blue-800 truncate-multi capitalize text-primary/80 text-ellipsis duration-300 transition-all text-[1rem] leading-[1.3] font-semibold">
            {x.nom}
          </h1>
        </NavLink>
        <div className="flex flex-col gap-1.5">
          <StarRating rating={x.rating} size={11} />
          <span className="text-secondary text-[.9rem] font-bold">
            {x?.hasVariation === 0
              ? "$" + x?.pu
              : getPrixVariantSock(x?.idproduits)}
          </span>
        </div>
        <div
          title={getImageFourn(x.idVendeur)?.shopname}
          className="absolute right-0.5 bottom-[42%] w-[60px] group-hover:opacity-100 opacity-40 h-[40px] p-0.5"
        >
          <img
            className="object-contain w-full h-full"
            src={BaseUrl + getImageFourn(x.idVendeur)?.profile}
            alt={getImageFourn(x.idVendeur)?.shopname}
          />
        </div>
        {/* <span className='text-[.85rem] text-gray-600 text-ellipsis font-medium flex items-center gap-1'><Building06Icon strokeWidth={2} size={13} /> Franchise IT</span> */}
        {x?.hasVariation === 0 ? (
          <button
            onClick={() => handleAddCart(x, null, 1)}
            title="Ajouter au panier"
            className="relative w-full mt-2.5 rounded-[6px] border text-primary/80 text-[.85rem] flex items-center justify-center gap-2.5 py-2 font-semibold px-1 overflow-hidden group"
          >
            <span
              className="absolute left-0 top-0 h-full w-0 bg-primary/10 
                                                transition-all duration-500 ease-out group-hover:w-full"
            ></span>

            <span
              className="relative z-10 flex items-center gap-2.5 
                                                transition-colors duration-500 group-hover:text-primary/90"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                <>
                  <ShoppingCart01Icon
                    strokeWidth={2}
                    size={19}
                    className="transition-colors duration-500 group-hover:text-primary/90"
                  />
                  Ajouter au panier
                </>
              )}
            </span>
          </button>
        ) : (
          <button
            title="Choisir une option"
            // to={"/produits/"+Slugify(x?.nom)}
            onClick={()=>handleNavigation(x?.nom)}
            className="relative w-full mt-2.5 rounded-[6px] border text-primary/80 text-[.85rem] flex items-center justify-center gap-2.5 py-2 font-semibold px-1 overflow-hidden group"
          >
            <span
              className="absolute left-0 top-0 h-full w-0 bg-primary/10 
                                                transition-all duration-500 ease-out group-hover:w-full"
            ></span>

            <span
              className="relative z-10 flex items-center gap-2.5 
                                                transition-colors duration-500 group-hover:text-primary/90"
            >
              <ShoppingCart01Icon
                strokeWidth={2}
                size={19}
                className="transition-colors duration-500 group-hover:text-primary/90"
              />
              Ajouter au panier
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
