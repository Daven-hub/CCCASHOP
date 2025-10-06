import React, { useState } from 'react'
import Breadcrumb from '../../../components/Breadcumb'
import { useTranslation } from 'react-i18next';
import Annimated from '../../../components/Annimated';
import data from "../../../datas/produits.json"
import { CardProduit } from '../';
import { paddingH } from '../../../components/Navbar/CentraleAchat/Headers'
import $ from "jquery"
import SideShop from '../../../components/SideShop';
// import Pagination from '../../../components/Pagination';

function ProductShop() {
  const { t } = useTranslation()
  const bread = [
    { label: t("accueille"), path: "/" },
    { label: "Liste des produits", path: "/produits" },
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
      <div className={`flex px-[${paddingH}] gap-8 py-12 md:py-12`}>
        <div className='w-[18%] rounded-[7px] sticky top-[15px] h-[650px]'>
          <SideShop />
        </div>
        <div className='w-[82%] flex overflow-hidden flex-col gap-6'>
          <div className='flex text-[.7rem] items-center justify-between'>
            <div className='flex items-center gap-1.5'>
              <span className='font-semibold'>Filtré par :</span>
              <select className='text-[.8rem] outline-0 border p-2.5'>
                <option>Fitré par le plus populaire</option>
                <option>Fitré par l'ancien</option>
                <option>Fitré par le prix : plus pétit</option>
              </select>
            </div>
            <div className=''>
              <select className='text-[.8rem] outline-0 border p-2.5'>
                <option>Show 15</option>
                <option>Show 25</option>
                <option>Show 30</option>
              </select>
            </div>
          </div>
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
