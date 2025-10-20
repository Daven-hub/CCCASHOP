import { useEffect, useState } from "react";

export default function useAttributsDisponibles(resSubcat,resAttr,resValues) {
  const [attributsDisponibles, setAttributsDisponibles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {

        const sousCategories = resSubcat;
        const attributs = resAttr;
        const valeurs = resValues;

        const attributsAvecValeurs = attributs.map((attr) => ({
          ...attr,
          attributevalue: valeurs.filter((val) => val.idAttribute === attr.idAttribute).map((y)=>{
            return {
            label:y.value,
            value:y.idValue
          }}),
        }));

        const sousCatAvecAttributs = sousCategories.map((subcat) => ({
          ...subcat,
          attribute: attributsAvecValeurs.filter(
            (attr) => attr.idSubcategorie === subcat.idsubcateg
          ),
        }));

        const mapFinal = sousCatAvecAttributs.reduce((acc, subcat) => {
          acc[subcat.nom] = subcat.attribute.reduce((obj, attr) => {
            obj[attr.name] = attr.attributevalue.map((val) =>{ return {value:val.value,label:val.label}});
            return obj;
          }, {});
          return acc;
        }, {});

        setAttributsDisponibles(mapFinal);
      } catch (error) {
        console.error("Erreur de chargement des données :", error);
      }
    };

    fetchData();
  }, []);

  return attributsDisponibles;
}
