import React, { useEffect, useMemo, useState } from "react";
import {
  StarIcon,
  TruckIcon,
  ChevronRightIcon,
  Plus,
  Minus,
  RefreshCcw,
  MoveRight,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Button } from "../../../components/ui/Button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Card, CardContent } from "../../../components/ui/card";
import { paddingH } from "../../../components/Navbar/CentraleAchat/Headers";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../components/Breadcumb";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduits } from "../../../store/slices/produits.slice";
import { getAllCateg } from "../../../store/slices/categories.slice";
import { getAllProduitVariants } from "../../../store/slices/produitVariant.slice";
import { getAllVendor } from "../../../store/slices/vendeur.slice";
import { getAllSubCateg } from "../../../store/slices/sousCategorie.slice";
import { getAllAttrs } from "../../../store/slices/attribute.slice.js";
import { getAllAttrValues } from "../../../store/slices/attributeValue.slice";
import LoaderUltra from "../../../components/ui/LoaderUltra";
import { useToast } from "../../../hook/use-toast.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Slugify from "../../../utils/Slugify.js";
import { BaseUrl } from "../../../config.js";
import { getAllOtherImages } from "../../../store/slices/otherImage.slice.js";
import StarRating from "../../../components/ui/StarRating.js";
import { Input } from "../../../components/ui/input.js";
import { MdFavorite } from "react-icons/md";
import { FavouriteIcon, ShoppingCart02Icon } from "hugeicons-react";
import { useAuth } from "../../../context/authContext.js";
import {
  createFavoris,
  getAllFavoris,
  removeFavoris,
} from "../../../store/slices/favoris.slice.js";
import useAttributsDisponibles from "../../../hook/useAttributeDisponible.js";
import { getAllVariantValues } from "../../../store/slices/variantValue.slice.js";
import { createCarts, getAllCarts, updateCarts } from "../../../store/slices/cart.slice.js";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GridePriceWithVariation = ({
  detailProduit,
  variation,
  productAttributes,
  selectedVariant,
  selected,
  handleSelect,
}) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        {variation?.min !== variation?.max ? (
          <div className="flex text-xl items-center gap-2 text-accent">
            <span className="font-bold">
              {variation?.min?.toLocaleString()} FCFA
            </span>
            -
            <span className="font-bold">
              {variation?.max?.toLocaleString()} FCFA
            </span>
          </div>
        ) : (
          <span className="text-2xl font-bold">
            {variation?.min?.toLocaleString()} FCFA
          </span>
        )}
        <p className="text-gray-700 leading-relaxed">
          {detailProduit?.description}
        </p>
        <div className="space-y-2.5">
          {productAttributes.map((attr) => {
            const valuess=attr.values?.find((x)=>x?.idValue===selected[attr.idAttribute])?.value
            return (
            <div key={attr.idAttribute}>
              <p className="font-semibold text-sm mb-0.5">{attr.name} : <mark className="bg-transparent capitalize">{valuess}</mark></p>
              <div className="flex gap-2 flex-wrap">
                {attr.values.map((v) => (
                  <button
                    key={v.idValue}
                    style={{backgroundColor:attr?.type==='color'?v.value:''}}
                    onClick={() => handleSelect(attr.idAttribute, v.idValue)}
                    className={`${attr?.type!=='color'?'py-1 border-2 px-3':'py-4 px-4 border-2'} capitalize text-sm rounded-lg transition
                  ${
                    selected[attr.idAttribute] === v.idValue
                      ? "border-blue-600"
                      : "bg-transparent text-gray-700 border-gray-400"
                  }`}
                  >
                    {attr?.type!=='color'?v.value:''}
                  </button>
                ))}
              </div>
            </div>
          )})}

          {/* {selectedVariant ? (
            <div className="mt-4 p-3 border rounded-xl bg-gray-50">
              <p>
                <strong>SKU :</strong> {selectedVariant.sku}
              </p>
              <p>
                <strong>Quantité :</strong> {selectedVariant.qte}
              </p>
              <p>
                <strong>Prix :</strong> {selectedVariant.pu} €
              </p>
            </div>
          ) : (
            Object.keys(selected).length === productAttributes.length && (
              <p className="mt-4 text-red-500">❌ Aucune combinaison trouvée</p>
            )
          )} */}
        </div>
      </div>
      
      <div className='flex flex-col gap-2'>
        <span className='text-2xl font-bold text-accent'>
          {selectedVariant?.pu? selectedVariant?.pu?.toLocaleString():'00'} FCFA
        </span>
        <span className='text-sm font-semibld text-gray-500'>
          En stock : {`${selectedVariant?.qte?selectedVariant?.qte+' unités':'indisponible'}`}
        </span>
      </div>
    </>
  );
};

const GridePriceWithOutVariation = ({ detailProduit }) => {
  return (
    <>
      <span className="text-2xl font-bold text-accent">
        {detailProduit?.pu?.toLocaleString()} FCFA
      </span>

      <p className="text-gray-700 leading-relaxed">
        {detailProduit?.description}
      </p>

      <span className="text-sm font-semibold text-gray-600">
        Disponibilité :{" "}
        <mark className="bg-transparent font-bold text-green-500">
          {detailProduit?.qte}
        </mark>{" "}
        en stock
      </span>
    </>
  );
};

const DetailsProduct = ({ product }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFavoris, setLoadingFavoris] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadTime, setLoadTime] = useState(0);
  const dispatch = useDispatch();
  const { userConnected } = useAuth();
  const idConnected =
    userConnected?.role === "fournisseur"
      ? userConnected?.id
      : userConnected?.idUsershop;
  const { toast } = useToast();
  const { subcategories } = useSelector((state) => state.souscategorie);
  const { attributeValues } = useSelector((state) => state.attributeValue);
  const { attributes } = useSelector((state) => state.attribute);
  const { categories } = useSelector((state) => state.categorie);
  const { produits } = useSelector((state) => state.produit);
  const { vendeurs } = useSelector((state) => state.vendeur);
  const { favoris } = useSelector((state) => state.favori);
  const { carts } = useSelector((state) => state.cart);
  const { variantValues } = useSelector((state) => state.variantValue);
  const { ortherImages } = useSelector((state) => state.otherImage);
  const { produitVariants } = useSelector((state) => state.produitVariant);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();
      try {
        await Promise.all([
          dispatch(getAllProduits()).unwrap(),
          dispatch(getAllCateg()).unwrap(),
          dispatch(getAllSubCateg()).unwrap(),
          dispatch(getAllProduitVariants()).unwrap(),
          dispatch(getAllVendor()).unwrap(),
          dispatch(getAllAttrs()).unwrap(),
          dispatch(getAllFavoris()).unwrap(),
          dispatch(getAllCarts()).unwrap(),
          dispatch(getAllAttrValues()).unwrap(),
          dispatch(getAllOtherImages()).unwrap(),
          dispatch(getAllVariantValues()).unwrap(),
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

  const isFavoris = (y) => {
    const favorisUnique = favoris?.find(
      (x) => x?.idProduits === y && x?.idUser === idConnected
    );
    if (favorisUnique) {
      return true;
    }
    return false;
  };
  //produit unique
  const detailProduit = useMemo(() => {
    const result = produits?.find((x) => Slugify(x?.nom) === id);
    return result || [];
  }, [produits, id]);

  //vendeur correspondant
  const detailVendeur = useMemo(() => {
    const result = vendeurs?.find((x) => x?.id === detailProduit?.idVendeur);
    return result || [];
  }, [vendeurs, detailProduit?.idVendeur]);

  //Initialitisaton de la première image
  const [mainImage, setMainImage] = useState(detailProduit?.profile);

  //Toujours garder l'image du produit comme première image
  useEffect(() => {
    setMainImage(detailProduit?.profile);
  }, [detailProduit?.profile]);

  //recupère les autres images associées au produit
  const autreImages = useMemo(() => {
    const result = ortherImages
      ?.filter((x) => x?.idProducts === detailProduit?.idproduits)
      ?.map((y) => y?.nom);
    result?.unshift(detailProduit?.profile);
    return result || [];
  }, [ortherImages, detailProduit?.idproduits, detailProduit?.profile]);

  //route de cette page
  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: "Produits", path: "/produits" },
    { label: detailProduit?.nom, path: "/fournisseurs/produits/" + id },
  ];

  //recupere le nom de la categorie et sous-categorie
  const getNameCategAndSubcateg = (y, z) => {
    const result1 = categories?.find((x) => x?.idcategorie === y);
    const result2 = subcategories?.find((x) => x?.idsubcateg === z);
    return result1?.nom + ", " + result2?.nom;
  };

  //ajoute et retire le produit des favoris
  const handleAddRemoveFavoris = async (produits) => {
    setLoadingFavoris(true);
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
      setLoadingFavoris(false);
    }
  };

  //detail supplémentaire du produit
  const infoDetail = [
    {
      label: "SKU",
      value: detailProduit?.skuProduit ? detailProduit?.skuProduit : "#3245",
    },
    {
      label: "Catégories",
      value: getNameCategAndSubcateg(
        detailProduit?.idCategorie,
        detailProduit?.idsubcateg
      ),
    },
    {
      label: "Tags",
      value: detailProduit?.tag,
    },
  ];

  const [productAttributes, setProductAttributes] = useState([]);
  const [selected, setSelected] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantite,setQuantite]=useState(1)
  const handleQuantityChange=(x)=>{
    setQuantite(x)
  }
  const Incremente=()=>{
    setQuantite(quantite+1)
  }
  const Decremente=()=>{
    if(quantite<=1){
      setQuantite(1)
    }else{
      setQuantite(quantite-1)
    }
  }
  useEffect(() => {
    const variantsForProduct = produitVariants.filter(
      (v) => v.idProduit === detailProduit?.idproduits
    );

    // récupérer tous les idVariant concernés
    const variantIds = variantsForProduct.map((v) => v.idVariant);

    // récupérer toutes les liaisons variantValue correspondantes
    const relatedVariantValues = variantValues.filter((vv) =>
      variantIds.includes(vv.idVariant)
    );

    // récupérer les valeurs d’attributs associées
    const valueIds = [
      ...new Set(relatedVariantValues.map((vv) => vv.idValues)),
    ];
    const relatedAttributeValues = attributeValues.filter((av) =>
      valueIds.includes(av.idValue)
    );

    // Regrouper par attribut
    const grouped = attributes
      .filter((attr) =>
        relatedAttributeValues.some((av) => av.idAttribute === attr.idAttribute)
      )
      .map((attr) => ({
        ...attr,
        values: relatedAttributeValues.filter(
          (av) => av.idAttribute === attr.idAttribute
        ),
      }));

    setProductAttributes(grouped);
  }, [
    detailProduit?.idproduits,
    attributes,
    attributeValues,
    variantValues,
    produitVariants,
  ]);

  const handleSelect = (idAttribute, idValue) => {
    const newSelection = { ...selected, [idAttribute]: idValue };
    setSelected(newSelection);
    const allSelectedValues = Object.values(newSelection);
    const totalAttributes = productAttributes.length;
    if (allSelectedValues.length < totalAttributes) {
      setSelectedVariant(null);
      return;
    }
    const variantsForProduct = produitVariants.filter(
      (v) => v.idProduit === detailProduit?.idproduits
    );

    const matchingVariant = variantsForProduct.find((variant) => {
      const variantValueIds = variantValues
        .filter((vv) => vv.idVariant === variant.idVariant)
        .map((vv) => vv.idValues);
      return (
        allSelectedValues.length === variantValueIds.length &&
        allSelectedValues.every((v) => variantValueIds.includes(v))
      );
    });

    setSelectedVariant(matchingVariant || null);
  };

  const getPrixVariantSock = (id) => {
    const variants = produitVariants
      ?.filter((x) => x.idProduit === id)
      .map((y) => y?.pu);
    // console?.log("variant",variants)
    const min = Math.min(...variants);
    const max = Math.max(...variants);
    return { min, max };
  };

  const handleAddCart = async (produits, idVariant, qte) => {
      setLoadingCart(true);
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
        setLoadingCart(false);
      }
    };

  if (isLoading) {
    return <LoaderUltra loading={isLoading} duration={loadTime} />;
  }
  return (
    <div className="flex flex-col gap-10">
      <div className={`py-[1rem] px-[${paddingH}] bg-gray-50 border-b`}>
        <Breadcrumb data={bread} />
      </div>

      <div className={`px-[${paddingH}] pb-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col h-fit gap-4">
            <Card className="p-7 flex justify-center items-center bg-gray-50">
              <img
                src={BaseUrl + mainImage}
                alt={mainImage}
                className="object-contain h-[450px] w-full"
              />
            </Card>
            <div className="flex gap-3">
              {autreImages?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 p-2 rounded-[6px] overflow-hidden border-2 transition ${
                    mainImage === img ? "border-primary" : "border-gray-200"
                  }`}
                >
                  <img
                    src={BaseUrl + img}
                    alt={img}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 pb-4 border-b">
              <h1 className="text-lg md:text-2xl font-semibold text-text-primary">
                {detailProduit?.nom}
              </h1>
              <div className="flex items-center gap-2">
                <StarRating rating={detailProduit?.rating} size={12} />
                <span className="text-gray-600 text-xs">(25 avis)</span>
              </div>
            </div>
            {detailProduit?.hasVariation === 0 ? (
              <GridePriceWithOutVariation detailProduit={detailProduit} />
            ) : (
              <GridePriceWithVariation
                variation={getPrixVariantSock(detailProduit?.idproduits)}
                selected={selected}
                selectedVariant={selectedVariant}
                handleSelect={handleSelect}
                productAttributes={productAttributes}
                detailProduit={detailProduit}
              />
            )}

            <div className="flex items-center gap-3 pb-7 border-b mt-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => Decremente()}
                  className="!rounded-none !rounded-l-[6px] flex-shrink-0 border hover:bg-gray-100"
                >
                  <Minus className="w-2 h-2" />
                </Button>
                <Input
                  type="number"
                  value={quantite}
                  min={1}
                  onChange={e =>
                    handleQuantityChange(parseInt(e.target.value) || 1)
                  }
                  className="w-full !outline-none outline-0 !rounded-none text-center border-y"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => Incremente()}
                  className="!rounded-none !rounded-r-[6px] flex-shrink-0 border hover:bg-gray-100"
                >
                  <Plus className="w-2 h-2" />
                </Button>
              </div>
              <Button onClick={()=>handleAddCart(detailProduit,selectedVariant?selectedVariant?.idVariant:null,quantite)} disabled={(detailProduit?.hasVariation===1 && !selectedVariant)?true:false} className="flex-1 min-w-[180px] text-white">
                {loadingCart ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <>
                    <ShoppingCart02Icon strokeWidth={2} size={24} /> Ajouter au
                panier
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-text-primary px-4"
              >
                <CreditCard size={13} /> Acheter maintenant
              </Button>
              <Button
                onClick={() => handleAddRemoveFavoris(detailProduit)}
                className={`flex-1 text-white`}
              >
                {loadingFavoris ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <FavouriteIcon
                    className={`${
                      isFavoris(detailProduit?.idproduits)
                        ? "text-white fill-white"
                        : ""
                    }`}
                    strokeWidth={2}
                    size={24}
                  />
                )}
              </Button>
              <Button className="flex-1 text-white">
                <RefreshCcw size={24} />
              </Button>
            </div>

            <div className="bg-gray-100 rounded-[5px] py-7 px-6 flex justify-between gap-4 items-center">
              <div className="flex items-center gap-3">
                <img
                  className="w-[60px] h-[60px] rounded-full flex-shrink-0 object-cover"
                  src={BaseUrl + detailVendeur?.profile}
                  alt={detailVendeur?.shopname}
                />
                <div className="flex flex-col gap-1.5">
                  <span className="text-[.8rem] leading-[1] text-gray-500">
                    Vendeur :
                  </span>
                  <h3 className="text-secondary font-semibold text-[1.12rem] leading-[1.2]">
                    {detailVendeur?.shopname}
                  </h3>
                  <StarRating rating={detailVendeur?.rating} size={12} />
                </div>
              </div>
              <NavLink
                className="flex items-center text-sm font-semibold gap-3 py-2.5 px-7 rounded-full text-white bg-secondary"
                to={"/fournisseurs/" + detailVendeur?.id}
              >
                Visiter la boutique <MoveRight size={14} />{" "}
              </NavLink>
            </div>

            <div className="flex flex-col gap-1">
              {infoDetail?.map((x, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm font-semibold">
                    {x?.label} :&nbsp;
                  </span>
                  <span className="text-text-secondary">{x?.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*<Tabs defaultValue='desc' className='w-full mt-10'>
          <TabsList className='flex gap-3 border-b'>
            <TabsTrigger value='desc'>Description</TabsTrigger>
            <TabsTrigger value='specs'>Spécifications</TabsTrigger>
            <TabsTrigger value='reviews'>Avis</TabsTrigger>
          </TabsList>
          <TabsContent value='desc' className='mt-6'>
            <Card>
              <CardContent className='p-6'>
                <p className='text-gray-700'>{product?.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='specs' className='mt-6'>
            <Card>
              <CardContent className='p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700'>
                <div>
                  <strong>SKU:</strong> {product?.skuProduit}
                </div>
                <div>
                  <strong>Catégorie:</strong> {product?.categories?.nom}
                </div>
                <div>
                  <strong>Stock minimum:</strong> {product?.minStock}
                </div>
                <div>
                  <strong>État:</strong> {product?.status ? 'Actif' : 'Inactif'}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='reviews' className='mt-6'>
            <Card>
              <CardContent className='p-6'>
                <p className='text-gray-500 italic'>
                  Aucun avis pour le moment.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs> */
      }
    </div>
  );
};

export default DetailsProduct;

