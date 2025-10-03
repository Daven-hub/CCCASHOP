import React, { useState } from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import { useTranslation } from 'react-i18next';
import Annimated from '../../../components/Annimated';
import data from "../../../datas/produits.json"
import { CardProduit } from '../';
import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers'
import $ from "jquery"
// import Pagination from '../../../components/Pagination';

function ProductShop() {
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
      const $corps = $(".corps");
      const pixel = $corps.prop("scrollHeight");

      if (toggleValue) {
        $corps.css("height", `${pixel}px`);
      } else {
        $corps.css("height", `0px`);
      }
    });
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Découper la liste en pages
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = data.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  
  return (
    <Annimated className="bg-white">
      <div className="px-[5%] py-[1.5rem] bg-gray-100">
        <Breadcrumb data={bread} />
      </div>
      <div className={`flex px-[${paddingH}] gap-6 py-12 md:py-12`}>
        <div className='w-[22%] rounded-[7px] bg-green-600 sticky top-[15px] h-[650px]'></div>
        <div className='w-[78%] flex overflow-hidden flex-col gap-8'>
          {/* <div className='flex flex-col px-4 md:px-5 overflow-hidden border rounded-[7px] py-3.5'>
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
        </div> */}
          <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
            {currentProducts?.map((x, index) => (
              <CardProduit key={index} x={x} />
            ))}
          </div>
          {/* <Pagination
            currentPage={currentPage}
            totalItems={data?.lenght}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          /> */}
        </div>
      </div>
    </Annimated>
  )
}

export default ProductShop
