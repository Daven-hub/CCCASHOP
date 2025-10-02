// src/pages/CccaRevue.js
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
// import Breadcrumbs from "../Components/Breadcumbs";
// import photo from "../../../assets/2149304766.jpg";
import Breads from "../../components/Admin/Breads";
import { useDispatch, useSelector } from "react-redux";
import { getAllRevue,createRevue,deleteRevue } from "../../store/slices/revue.slice";
import moment from "moment/moment";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import Swal from "sweetalert2";

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }, { direction: "rtl" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"]
  ]
};

export default function CccaRevue() {

  const [showForm, setShowForm] = useState(false);
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "size",
    "color",
    "background",
    "font",
    "align",
    "link",
    "image",
    "video"
  ];
  const [formData, setFormData] = useState({
    title: "",
    article: 0,
    thumbnail: null,
    docrevue:null,
    description:''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const { Revues, RevueId, isSuccess,isLoading } = useSelector((state) => state.revue);

  // const [revueData, setRevueData] = useState([]);


  const handleDescriptionChange = (value) => {
    setFormData({...formData,description:value});
  };
  
  const handleSave=async()=>{
    const data = new FormData();
    data.append("title",formData.title)
    data.append("article",formData.article)
    data.append("thumbnail",formData.thumbnail)
    data.append("docrevue",formData.docrevue)
    data.append("description",formData.description)
    data.append("userid","7588cace-1c92-4247-82ce-a72a4dc25b36")
    // const payload = Object.fromEntries(data.entries());
    // console.log(payload)
    await dispatch(createRevue(data))
    if(isSuccess){
      await Swal.fire({
        icon: 'success',
        title: 'Enregistrement éffectué avec success',
        showConfirmButton: false,
        timer: 1900,
        customClass: {
          title: 'text-[1rem] text-primary'
        }
      });
    }
    setFormData({
      ...formData,
      title:'',
      article:0,
      thumbnail:null,
      docrevue:null,
      description:""
    })
  }

  const handleDelete=async(x)=>{
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Êtes-vous sûr ?',
      showCancelButton: true,
      confirmButtonText:"Oui",
      cancelButtonText:"Non",
      html:`De vouloir vraiment supprimer la revue</br><strong className='text-primary'>${x.title}</strong>`,
      customClass: {
        actions:"float-right",
        title: 'text-[1rem] text-primary',
        confirmButton:'bg-green-600',
        cancelButton:"bg-secondary"
      }
    });
    if(result.isConfirmed){
      dispatch(deleteRevue(x.id))
      Swal.fire({
        icon: 'success',
        text:`Suppression rèussit`,
        showConfirmButton: false,
        timer: 1900,
        customClass: {
          title: 'text-[1rem] text-primary'
        }
      })
    }
  }

  const handleUpdate=async (x)=>{
    await setFormData({
      ...formData,
      title:x.title,
      article:x.article,
      thumbnail:x.thumbnail,
      docrevue:x.doc,
      description:x.description
    })

    setShowForm(true)
  }

  useEffect(() => {
    dispatch(getAllRevue());
  }, [dispatch,formData,isSuccess]);

  const breadcrumbLinks = [
    { label: "Acceuil", path: "/" },
    { label: "CCCA Revue", path: "/Admin/ccca-revue" }
    // { label: "Product", path: "/product" },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Revues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Revues.length / itemsPerPage);

  return (
    <>
      <Dialog
        Dialog
        open={showForm}
        onClose={setShowForm}
        className="relative z-[100]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 max-w-screen overflow-y-auto z-100">
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-md:w-full sm:my-8 sm:w-full sm:max-w-[60%] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              {isLoading && (
              <div className="absolute bg-white bg-opacity-60 z-20 w-full h-full top-o left-0">
                <div
                  role="status"
                  className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                </div>
              )}
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full mt-3 sm:mt-0">
                    <DialogTitle
                      as="h1"
                      className="text-[1.6rem]  max-md:text-[1.3rem] pb-5 mb-5 font-semibold text-center border-b-2 border-primary leading-6 text-gray-900"
                    >
                      CCCA révue
                    </DialogTitle>
                    <div className="flex flex-col gap-4 mt-2">
                        <div
                          className="w-full"
                        >
                          <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                              <div>
                                <label className="flex gap-3 mb-1">
                                  Titre de la révue<span className="text-secondary text-lg">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  value={formData.title}
                                  onChange={(e)=>setFormData({...formData,title:e.target.value})}
                                  required
                                  className="w-full formulaire"
                                />
                              </div>
                              <div>
                                <label className="flex gap-3 mb-1">
                                  Numéro de l'Article<span className="text-secondary text-lg">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="articleNumber"
                                  value={formData.article}
                                  onChange={(e)=>setFormData({...formData,article:e.target.value})}
                                  required
                                  className="w-full formulaire"
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <label className="flex gap-3">
                                  Thumbnail<span className="text-secondary text-lg">*</span>
                                </label>
                                <input
                                  type="file"
                                  name="thumbnail"
                                  onChange={(e)=>setFormData({...formData,thumbnail:e.target.files[0]})}
                                  required
                                  className="formulaire"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="">
                                  Document associé (.pdf)
                                </label>
                                <input
                                  type="file"
                                  name="docrevue"
                                  onChange={(e)=>setFormData({...formData,docrevue:e.target.files[0]})}
                                  required
                                  className="formulaire"
                                />
                              </div>
                            </div>
                            <div>
                                <label className="flex gap-3 mb-1">
                                  Description<span className="text-secondary text-lg">*</span>
                                </label>
                                <ReactQuill
                                  value={formData.description}
                                  onChange={handleDescriptionChange}
                                  className="bg-white h-80 max-md:h-60 max-md:mb-[9rem] mb-16"
                                  placeholder="Entrez la description..."
                                  modules={quillModules}
                                />
                              </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Sauvegarder
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setShowForm(false)}
                  className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Annuler
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="flex flex-col gap-5">
        <Breads breadcrumbLinks={breadcrumbLinks} title="CCCA Revue" />
        <div className="flex flex-col gap-3 items-center p-[3%] bg-white rounded-lg w-full">
          <div className="flex flex-col gap-3 w-full component">
            <div className="flex items-center max-md:flex-col gap-2 justify-between banerpp">
              <h3 className="text-nowrap text-[1.4rem] max-md:text-[1.1rem]">
                Liste des Revues
              </h3>
              <div className="w-full uppercase flex max-md:grid max-md:grid-cols-3 text-center items-center gap-2 justify-end max-md:justify-center text-[.8rem]">
                <div className="bg-secondary cursor-pointer btn-filter text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
                  Filre
                </div>
                <div className="bg-secondary text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
                  pdf
                </div>
                <div className="bg-secondary text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
                  CSV
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-secondary flex items-center gap-2 text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize"
                >
                  <FaPlus /> Ajouter
                </button>
              </div>
            </div>
            <div className="bg-white border border-[#3174ad] filter-component rounded-md overflow-hidden overflow-y-hidden transition-all duration-500" style={{height:0}}>
              <div className="flex flex-col">
                <div className="flex items-center justify-center bg-[#3174ad] text-white p-2">
                  <span className="text-center text-[1.1rem] max-md:text-[.9rem] font-medium capitalize">
                    Filtre
                  </span>
                </div>
                <div className="p-4 filter-component">
                <form className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
                  <input
                    type="text"
                    className="formulaire"
                    placeholder="Titre de l'evenement"
                  ></input>
                  <input
                    type="text"
                    className="formulaire"
                    placeholder="Lieux de l'evenement"
                  ></input>
                  <input
                    type="date"
                    className="formulaire"
                    placeholder="lieux"
                  ></input>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Toggle Views */}

          <div className="overflow-x-auto w-full mt-4">
            <table className="min-w-full bg-white border border-gray-200 text-center">
              <thead className="bg-[#3174ad] text-white font-semibold capitalize whitespace-nowrap">
                <tr className="text-md">
                  <th className="py-3 px-2 border-b">ID</th>
                  <th className="py-3 px-2 border-b">Thumbnail</th>
                  <th className="py-3 px-2 border-b">Titre</th>
                  <th className="py-3 px-2 border-b">Description</th>
                  <th className="py-3 px-2 border-b">Aricle No</th>
                  <th className="py-3 px-2 border-b">Publier le</th>
                  <th className="py-3 px-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-md whitespace-nowrap">
                {currentItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50 border-b">
                    <td className="py-2 px-2">{index + 1}</td>
                    <td className="py-2 px-2 flex items-center justify-center">
                      <img
                        src={item.thumbnail}
                        alt="#"
                        className="w-[100px] h-[60px] rounded-md overflow-hidden"
                      />
                    </td>
                    <td className="py-2 px-2 lowercase">{item.title.slice(0,20)}...</td>
                    <td className="py-2 px-2" dangerouslySetInnerHTML={{__html:`${item.description.slice(0, 60)}...`}}>
                    
                    </td>
                    <td className="py-2 px-2 ">{item.article}</td>
                    <td className="py-2 px-2 table-cell">
                      {moment(item.created_at).format("ddd D MMM YYYY à HH:mm")}
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={()=>handleUpdate(item)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={21} />
                        </button>
                        <button
                          onClick={()=>handleDelete(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={21} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center md:justify-end items-center w-full max-w-6xl mt-4 space-x-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-l-md hover:bg-gray-300"
            >
              ← Précédent
            </button>
            {[...Array(totalPages).keys()].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 ${
                  currentPage === index + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } hover:bg-gray-300`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 text-gray-600 rounded-r-md hover:bg-gray-300"
            >
              Suivant →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
