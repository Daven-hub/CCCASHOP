import React, { useEffect, useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../components/ui/Table'
import { FaFilePdf } from 'react-icons/fa'
import { FiArchive } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAttrs } from '../../store/slices/attribute.slice.js'
import { getAllAttrValues } from '../../store/slices/attributeValue.slice'
import { getAllProduits } from '../../store/slices/produits.slice'
import { getAllProduitVariants } from '../../store/slices/produitVariant.slice'
import { useAuth } from '../../context/authContext.js'
import LoaderUltra from '../../components/ui/LoaderUltra.js'
import { BaseUrl } from '../../config.js'
import { getAllVariantValues } from '../../store/slices/variantValue.slice.js'
import { AlertTriangle, Layers, Package, ShoppingBag } from 'lucide-react'
import { useToast } from '../../hook/use-toast.js'

function StockProduits () {
  const [isLoading, setIsLoading] = useState(true)
  const [loadTime, setLoadTime] = useState(0)
  const dispatch = useDispatch()
  const { userConnected } = useAuth()
  const {toast} =useToast()
  const { attributeValues } = useSelector(state => state.attributeValue)
  const { attributes } = useSelector(state => state.attribute)
  const { variantValues } = useSelector(state => state.variantValue)
  const { produits } = useSelector(state => state.produit)
  const { produitVariants } = useSelector(state => state.produitVariant)
  const [combined, setCombined] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // setIsLoading(true)
      const start = performance.now()
      try {
        await Promise.all([
          dispatch(getAllAttrs()).unwrap(),
          dispatch(getAllAttrValues()).unwrap(),
          dispatch(getAllProduits()).unwrap(),
          dispatch(getAllProduitVariants()).unwrap(),
          dispatch(getAllVariantValues()).unwrap()
        ])

        const end = performance.now()
        const duration = end - start
        setLoadTime(duration.toFixed(0))
      } catch (error) {
        toast({
          title: error?.toString(),
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    if (!produits?.length || !produitVariants?.length || !userConnected?.id)
      return

    const mesProduits = produits.filter(x => x?.idVendeur === userConnected.id)
    const combinedList = mesProduits.flatMap(prod => {
      if (!prod?.hasVariation) {
        return [
          {
            ...prod,
            sku: prod.skuProduit || '---',
            idVariant: ''
          }
        ]
      }
      const relatedVariants = produitVariants.filter(
        v => v.idProduit === prod.idproduits
      )
      return relatedVariants.map(variant => ({
        ...prod,
        sku: variant.sku || '-',
        pu: variant.pu,
        qte: variant.qte,
        idVariant: variant.idVariant
      }))
    })

    setCombined(combinedList)
  }, [produits, produitVariants, userConnected?.id])

  // function VariantAttributes ({
  //   idVariant,
  //   variantvalues,
  //   attributevalues,
  //   attributes
  // }) {
  //   const attributs = useMemo(() => {
  //     const variantLinks = variantvalues.filter(
  //       vv => vv.idVariant === idVariant
  //     )

  //     return variantLinks
  //       .map(vv => {
  //         const attrValue = attributevalues.find(
  //           av => av.idValue === vv.idValues
  //         )
  //         if (!attrValue) return null
  //         const attr = attributes.find(
  //           a => a.idAttribute === attrValue.idAttribute
  //         )
  //         if (!attr) return null
  //         return {
  //           name: attr.name,
  //           value: attrValue.value
  //         }
  //       })
  //       .filter(Boolean)
  //   }, [idVariant, variantvalues, attributevalues, attributes])

  //   const formatted = attributs.map(a => `${a.name} : ${a.value}`).join(' | ')

  //   return <span className='text-sm text-gray-700'>{formatted || '—'}</span>
  // }
function VariantAttributes({
  idVariant,
  variantvalues,
  attributevalues,
  attributes,
}) {
  const attributs = useMemo(() => {
    const variantLinks = variantvalues.filter(
      (vv) => vv.idVariant === idVariant
    );

    return variantLinks
      .map((vv) => {
        const attrValue = attributevalues.find(
          (av) => av.idValue === vv.idValues
        );
        if (!attrValue) return null;

        const attr = attributes.find(
          (a) => a.idAttribute === attrValue.idAttribute
        );
        if (!attr) return null;

        return {
          name: attr.name,
          value: attrValue.value,
          type: attr.type,
        };
      })
      .filter(Boolean);
  }, [idVariant, variantvalues, attributevalues, attributes]);

  if (!attributs.length) {
    return <span className="text-sm text-gray-400">—</span>;
  }

  return (
    <div className="flex gap-1 items-center">
      {attributs.map((a, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-700">
            {a.name} :
          </span>
          {a.type === "color" ? (
            <div
              className="w-4 h-4 rounded border border-gray-300 shadow-sm"
              style={{ backgroundColor: a.value }}
              title={a.value}
            />
          ) : (
            <span className="text-sm text-gray-600">{a.value}</span>
          )}
          {i < attributs.length - 1 && (
            <span className="text-gray-400">|</span>
          )}
        </div>
      ))}
    </div>
  );
}

const totalOutVariant=combined?.filter((x)=>x.hasVariation===0)?.reduce((sum, item) => sum + item.qte, 0);
const totalWithVariant=combined?.filter((x)=>x.hasVariation===1)?.reduce((sum, item) => sum + item.qte, 0);
const totalStock=totalWithVariant+totalOutVariant;
const produitsRupture = combined?.filter((x)=>x.qte===0)?.reduce((sum, item) => sum + item.qte, 0);

const cards = [
    {
      title: "Quantité totale en stock",
      value: totalStock,
      icon: <ShoppingBag className="w-6 h-6 text-emerald-500" />,
      color: "from-emerald-500/15 to-emerald-500/10",
    },
    {
      title: "Produits simples",
      value: totalOutVariant,
      icon: <Package className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-500/15 to-indigo-500/10",
    },
    {
      title: "Produits avec variations",
      value: totalWithVariant,
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      color: "from-blue-500/15 to-blue-500/10",
    },
    {
      title: "Produits en rupture",
      value: produitsRupture,
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      color: "from-red-500/10 to-red-500/10",
    },
  ];

  if (isLoading) {
    return <LoaderUltra loading={isLoading} duration={loadTime} />
  }
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='flex items-center text-primary md:text-[1.7rem] font-bold gap-2.5'>
          <FiArchive /> Stock{' '}
        </h1>
        <div className='flex gap-42 items-center'>
          <button className='py-2.5 shadow shadow-primary-light/20 px-6 mr-3 flex items-center gap-1.5 text-[.85rem] rounded-[7px] border bg-white font-semibold text-primary'>
            <FaFilePdf /> Télécharger en pdf
          </button>
          {/* <button className='py-2.5 px-6 flex items-center gap-1.5 text-[.85rem] rounded-[7px] bg-primary font-semibold text-white'><FaPlus stroke={.5} /> Nouveau produit</button> */}
        </div>
      </div>
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-xl border bg-gradient-to-b ${card.color} p-6 shadow-sm transition-transform hover:scale-[1.02]`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <p className="mt-2 text-3xl font-semibold text-primary">
                {card.value}
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
      <div className='bg-white flex flex-col gap-6 border rounded-[6px] p-7'>
        <div className='flex justify-between items-center gap-4'>
          <h1 className='text-[1.6rem] font-bold text-primary'>
            Stock des produits
          </h1>
          <div className='flex w-[50%] items-center gap-3'>
            <input
              className='border text-[.87rem] py-2.5 rounded-[7px] outline-0 px-5 w-full md:w-[100%]'
              type='text'
              placeholder='Recherchez ...'
            />
          </div>
        </div>
        <div className='rounded-[7px] overflow-hidden bg-white'>
          <Table>
            <TableHeader className='bg-gray-200'>
              <TableRow>
                {/* <TableHead>UUID</TableHead> */}
                <TableHead>Image</TableHead>
                <TableHead>Noms</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Variation</TableHead>
                <TableHead>Qte</TableHead>
                <TableHead>PU</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combined.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='text-center py-8'>
                    Pas de resultat
                  </TableCell>
                </TableRow>
              ) : (
                combined.map((species, index) => (
                  <TableRow
                    className='hover:bg-primary/5 cursor-pointer'
                    key={index}
                  >
                    {/* <TableCell className='font-medium'>{index + 1}</TableCell> */}
                    <TableCell>
                      <img
                        className='w-10 h-10 object-contain rounded-[6px]'
                        src={BaseUrl + species?.profile}
                        alt={species?.idProduits}
                      />
                    </TableCell>
                    <TableCell className='hidden sm:table-cell capitalize'>
                      {species?.nom}
                    </TableCell>
                    <TableCell className=''>
                      {species?.sku}
                    </TableCell>
                    <TableCell >
                      {species?.hasVariation === 0 ? (
                        'N/A'
                      ) : (
                        <VariantAttributes
                          idVariant={species?.idVariant}
                          variantvalues={variantValues}
                          attributevalues={attributeValues}
                          attributes={attributes}
                        />
                      )}
                    </TableCell>
                    <TableCell className=''>
                      {species?.qte}
                    </TableCell>
                    <TableCell className=''>
                      $ {species?.pu}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default StockProduits
