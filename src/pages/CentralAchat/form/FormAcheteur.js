const FormAcheteur = ({handleChange,image}) => {
      return (
        <form className='w-full flex flex-col gap-3 md:gap-6 px-0 py-3'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 items-center'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-1'>
                <label>Nom</label>
                <input className='border rounded-[5px] p-2' type='text'></input>
              </div>
              <div className='flex flex-col gap-1'>
                <label>Forme juridique</label>
                <input className='border rounded-[5px] p-2' type='text'></input>
              </div>
              <div className='flex flex-col gap-1'>
                <label>Numéro d’immatriculation</label>
                <input className='border rounded-[5px] p-2' type='text'></input>
              </div>
              <div className='flex flex-col gap-1'>
                <label>Adresse du siège social</label>
                <input className='border rounded-[5px] p-2' type='text'></input>
              </div>
            </div>
            <div className="flex flex-col gap-1 h-full">
              <label>Logo</label>
              <div className="relative flex-1">
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
    
                <label
                  htmlFor="upload"
                  className="w-full relative h-full min-h-[324px] border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Uploaded"
                      className="absolute w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <span className="text-gray-400">Cliquez pour ajouter</span>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
            <div className='flex flex-col gap-1'>
              <label>Pays / zone géographique</label>
              <input className='border rounded-[5px] p-2' type='text'></input>
            </div>
            <div className='flex flex-col gap-1'>
              <label>Téléphone</label>
              <input className='border rounded-[5px] p-2' type='text'></input>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
            <div className='flex flex-col gap-1'>
              <label>Email</label>
              <input className='border rounded-[5px] p-2' type='text'></input>
            </div>
            <div className='flex flex-col gap-1'>
              <label>Site web</label>
              <input className='border rounded-[5px] p-2' type='text'></input>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 items-center'>
            <div className='flex flex-col gap-1'>
              <label>Monnaie utilisée</label>
              <input className='border rounded-[5px] p-2' type='text'></input>
            </div>
            <div className='flex flex-col gap-1'>
              <label>Zone de livraison / couverture</label>
              <input className='border rounded-[5px] p-2' type='text'></input>
            </div>
          </div>
    
          <div className='flex items-center cursor-pointer bg-secondary rounded-[5px] font-bold text-[1.1rem] text-white justify-center p-4 mt-3'>
            S'enregistrer
          </div>
        </form>
      )
    }

    export default FormAcheteur