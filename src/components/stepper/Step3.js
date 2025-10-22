import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Check, Loader2, MoveLeft } from 'lucide-react'
import { ScrollArea } from '../ui/scroll_area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/Table'
import useAttributsDisponibles from '../../hook/useAttributeDisponible'
export default function Step3 ({
  previousStep,
  formData,
  subcategories,
  categories,
  attributeValues,
  onSave,
  loading,
  attributes
}) {
  const {
    nom,
    description,
    hasVariation,
    idCategorie,
    idsubcateg,
    tag,
    pu,
    qte,
    profile,
    variations
  } = formData || {}

  const imageUrl = profile?.length > 0 ? URL.createObjectURL(profile[0]) : null

  const sousCategorie = subcategories?.find(
    x => x.idsubcateg === idsubcateg
  )?.nom
  const attributsDisponibles = useAttributsDisponibles(
    subcategories,
    attributes,
    attributeValues
  )
  const attributsSousCategorie = attributsDisponibles[sousCategorie] || []

  const getNameValue = y => {
    const attributess = attributsSousCategorie[y.name]?.find(
      x => x.value === y.value
    )
    console.log('attributess', attributess)
    if (attributess?.type === 'color') {
      return (
        <div
          className='w-4 h-4 rounded-full'
          style={{ backgroundColor: attributess.label }}
        />
      )
    }
    return attributess.label
  }
  const getNameCategorie = y => {
    return categories?.find(z => z?.idcategorie === y)?.nom
  }
  const getNameSub = y => {
    return subcategories?.find(z => z?.idsubcateg === y)?.nom
  }

  // const formatAttributes = attrs =>
  //   attrs.map(attr => `${attr.name}: ${getNameValue(attr)}`).join(' | ')

  const formatAttributes = attrs => {
    return attrs.map((attr, i) => (
      <div key={i} className='flex whitespace-nowrap items-center gap-1'>
        <strong>{attr.name}:</strong> {getNameValue(attr)}
        {i < attrs.length - 1 && <span className='text-gray-400 mx-1'>|</span>}
      </div>
    ))
  }

  return (
    <div className='space-y-2'>
      <ScrollArea className='h-[500px] flex flex-col gap-2.5 border-0 w-full'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              🧾 Détails du produit
            </CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={nom}
                className='w-full aspect-video border-black rounded-xl shadow'
              />
            )}
            <div className='col-span-2 grid grid-cols-2 gap-2'>
              <p>
                <strong>Nom :</strong> {nom}
              </p>
              <p>
                <strong>Catégorie:</strong> {getNameCategorie(idCategorie)}
              </p>
              <p>
                <strong>Sous-catégorie:</strong> {getNameSub(idsubcateg)}
              </p>
              <p>
                <strong>Tag :</strong> {tag}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className='my-3'>
          <CardHeader>
            <CardTitle className='text-lg font-semibold'>
              🧾 Description
            </CardTitle>
          </CardHeader>
          <CardContent className='w-full gap-4'>
            <textarea
              value={description}
              disabled
              rows={3}
              className='p-4 w-full border rounded-[6px]'
            ></textarea>
          </CardContent>
        </Card>

        {!hasVariation ? (
          <Card>
            <CardHeader>
              <CardTitle>💰 Informations de base</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2'>
              <p>
                <strong>Prix unitaire :</strong> {pu} $
              </p>
              <p>
                <strong>Stock :</strong> {qte}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>🧩 Variations</CardTitle>
            </CardHeader>
            <CardContent className=''>
              <Table>
                <TableHeader className='bg-gray-200'>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Attributs</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {variations.map((v, i) => (
                    <TableRow key={i} className='hover:bg-gray-50'>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{v.sku}</TableCell>
                      <TableCell>
                        <div className='flex items-center flex-nowrap gap-1'>
                          {formatAttributes(v.attributes)}
                        </div>
                      </TableCell>
                      <TableCell>{v.prix ? `${v.prix}$` : '-'}</TableCell>
                      <TableCell>{v.stock}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* <Card>
          <CardHeader>
            <CardTitle>📝 Informations supplémentaires</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            <textarea
              className='w-full border rounded-lg p-2'
              placeholder='Notes ou remarques...'
            />
            <input
              type='file'
              multiple
              className='block border p-2 rounded-lg w-full'
            />
          </CardContent>
        </Card> */}
      </ScrollArea>

      <div className='flex justify-between mt-3'>
        <button
          type='button'
          onClick={previousStep}
          className='bg-gray-400 flex items-center gap-2 text-white px-4 py-2 rounded'
        >
          <MoveLeft />
          Précédent
        </button>
        <button
          onClick={onSave}
          className='bg-green-800 text-white flex items-center justify-center gap-2 px-4 py-2 rounded'
        >
          {loading ? (
            <Loader2 className='animate-spin h-5 w-5 text-white' />
          ) : (
            <>
              Enregistrer
              <Check />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
