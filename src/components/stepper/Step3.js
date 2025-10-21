import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Check, Loader2, MoveLeft, MoveRight } from 'lucide-react'
import { ScrollArea } from '../ui/scroll_area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/Table'
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
    desc,
    hasVariation,
    idCategorie,
    idsubcateg,
    tag,
    pu,
    qte,
    prix,
    stock,
    profile,
    variations
  } = formData || {}

  const imageUrl = profile?.length > 0 ? URL.createObjectURL(profile[0]) : null
  const handleFinish = () => {
    console.log('Données envoyées ✅', formData)
    alert('Formulaire soumis avec succès !')
  }

  const getNameValue = y => {
    return attributeValues?.find(z => z?.idValue === y).value
  }
  const getNameCategorie = y => {
    return categories?.find(z => z?.idcategorie === y)?.nom
  }
  const getNameSub = y => {
    return subcategories?.find(z => z?.idsubcateg === y)?.nom
  }

  const formatAttributes = attrs =>
    attrs.map(attr => `${attr.name}: ${getNameValue(attr.value)}`).join(' | ')

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
              //   <div className='flex justify-center'>
              <img
                src={imageUrl}
                alt='Image du produit'
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
              value={desc}
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
                      <TableCell>{formatAttributes(v.attributes)}</TableCell>
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
