import React from 'react'
import Breadcrumb from '../../components/Breadcumb'
import { useTranslation } from 'react-i18next';
import Annimated from '../../components/Annimated';
import data from "../../datas/produits.json"
import { CardProduit } from '.';
import { FilterIcon, Search01Icon } from 'hugeicons-react';
import $ from "jquery"

function Products() {
  const { t } = useTranslation()
  const bread = [
    { label: t("accueille"), path: "/a" },
    { label: " Centrale d'achat", path: "/a/centrale_d_achat" },
    { label: "Liste des produits", path: "/a/centrale_d_achat/produits" },
  ];

  $(function () {
    let toggleValue = false;
  
    $(document).on("click", ".settings-btn", function () {
      toggleValue = !toggleValue;
  
      // on remonte au parent commun, puis on trouve le .corps
      const $corps = $(".corps");
      const pixel = $corps.prop("scrollHeight");
  
      if (toggleValue) {
        $corps.css("height", `${pixel}px`);
        // $(this).children().last().addClass("rotate-[90deg]");
      } else {
        $corps.css("height", `0px`);
        // $(this).children().last().removeClass("rotate-[90deg]");
      }
    });
  });
  return (
    <Annimated>
      <div className="px-[5%] py-3 bg-gray-100">
        <Breadcrumb data={bread} />
      </div>
      <div className='px-[5%] flex overflow-hidden flex-col gap-8 py-12 md:py-12'>
        <div className='flex flex-col px-4 md:px-5 overflow-hidden border rounded-[7px] py-3.5'>
          <div className='flex gap-5 items-center'>
            <div className='w-[94%] flex border rounded-[7px] overflow-hidden items-center'>
              <label htmlFor='search' className='w-[4.3%] px-5 flex justify-center items-center py-2.5'><Search01Icon size={18} strokeWidth={3} aria-label='name' className='flex-shrink-0 text-gray-600' /></label>
              <input id="search" name="search" className='w-[95.7%] px-4 outline-0 text-[.9rem] py-2.5' type='text' placeholder='Enter text' />
            </div>
            <div className='w-[6%] cursor-pointer settings-btn text-[1.1rem] flex items-center gap-2 text-black/70 font-semibold'>
              <FilterIcon strokeWidth={1} className='text-gray-600 fill-gray-600' size={20}/>
              <span className='max-md:hidden'>Filter</span>
            </div>
          </div>
          <div className='corps overflow-hidden transition-all duration-300' style={{ height: 0 }}>
            <div className='flex mt-3.5 pt-2 border-t flex-col'>
            Filter catégorie<br></br>
            comment tu vas
            </div>
          </div>
        </div>
        <div className='grid gap-8 grid-cols-1 md:grid-cols-4'>
          {data?.map((x, index) => (
            <CardProduit key={index} x={x} />
          ))}
        </div>
      </div>
    </Annimated>
  )
}

export default Products
