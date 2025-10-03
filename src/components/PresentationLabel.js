import React from 'react'

function PresentationLabel({ titre, Component }) {
      return (
            <div className='flex justify-end relative items-center h-[50px] px-8 bg-primary/20'>
                  <div className="absolute px-8 flex items-center bottom-0 left-0 w-[470px] h-[calc(100%+7px)] bg-primary/90 z-0
                                          after:content-[''] after:absolute after:right-[-7px] after:top-0
                                          after:w-0 after:h-0
                                          after:border-r-[7px] after:border-b-[7px] 
                                          after:border-r-transparent after:border-b-black/65">
                        <h2 className='text-[1.38rem] relative font-medium text-white'>{titre}</h2>
                  </div>

                  {/* <NavLink className="text-[.8rem] flex items-center gap-2 text-black/70 font-semibold underline" to={"#"}>Listes des produits <MoveRight size={15} /></NavLink> */}
                  {Component}
            </div>
      )
}

export default PresentationLabel