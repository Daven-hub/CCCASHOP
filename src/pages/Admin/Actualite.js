// src/pages/Actualite.js
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import Breads from "../../components/Admin/Breads";
import { useDispatch, useSelector } from "react-redux";
import {
  createActualite,
  deleteActualite,
  getAllActualite
} from "../../store/slices/actualites.slice";
import Swal from "sweetalert2";
import moment from "moment";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import { BaseUrl } from "../../config";

function Actualite() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  // Toggle between table and card view
  const itemsPerPage = 8;

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
    images: null,
    video_url: "",
    description: ""
  });

  const dispatch = useDispatch();
  const { Actualites } = useSelector(
    (state) => state.actualites
  );

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };


  useEffect(() => {
    dispatch(getAllActualite());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Actualites?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Actualites?.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const fileInputRef = useRef(null);  
  const titleInput= useRef(null)
  const videoInput = useRef(null)

  const breadcrumbLinks = [
    { label: "Acceuil", path: "/" },
    { label: "Actualité", path: "/Admin/news" }
    // { label: "Product", path: "/product" },
  ];

  const quillModules = {
    clipboard: {
      matchVisual: false
    },
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"]
    ]
  };

  const handleReset = () => {
    setFormData({
      title: "",
      images: null,
      video_url: "",
      description: ""
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (titleInput.current) {
      titleInput.current.value = '';
    }
    if (videoInput.current) {
      videoInput.current.value = '';
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("video_url", formData.video_url);
    data.append("description", formData.description);
    for (let i = 0; i < formData.images?.length; i++) {
      data.append("images[]", formData.images[i]);
    }

    try {
      await dispatch(createActualite(data)).unwrap();
      
      Swal.fire({
        icon: "success",
        title: "Enregistrement éffectué avec success",
        showConfirmButton: false,
        timer: 1900,
        customClass: {
          title: "text-[1rem] text-primary"
        }
      });
      handleReset()
    } catch (error) {
      // console.log(error)
      Swal.fire({
        icon: "error",
        title: "Enregistrement echoués",
        showConfirmButton: false
      });
    }finally{
      setLoading(false);
    }
  };

  const handleDelete = async (x) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Êtes-vous sûr ?",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      html: `De vouloir vraiment supprimer l'actualité</br><strong className='text-primary'>${x.title}</strong>?`,
      customClass: {
        actions: "float-right",
        title: "text-[1rem] text-primary",
        confirmButton: "bg-green-600",
        cancelButton: "bg-secondary"
      }
    });
    if (result.isConfirmed) {
      dispatch(deleteActualite(x.id));
      Swal.fire({
        icon: "success",
        text: `Suppression rèussit`,
        showConfirmButton: false,
        timer: 1900,
        customClass: {
          title: "text-[1rem] text-primary"
        }
      });
    }
  };

  // const handleUpdate = async (x) => {
  //   await setFormData({
  //     ...formData,
  //     title: x.title,
  //     article: x.article,
  //     thumbnail: x.thumbnail,
  //     docrevue: x.doc,
  //     description: x.description
  //   });

  //   setShowForm(true);
  // };

  return (
    <>
      <Dialog
        open={showForm}
        onClose={setShowForm}
        className="relative z-[100]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 max-w-screen overflow-y-auto z-100">
          <div className="flex rounded-md  items-center justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in max-md:w-full sm:my-8 sm:w-full sm:max-w-[60%] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full mt-3 sm:mt-0">
                    <DialogTitle
                      as="h1"
                      className="text-[1.6rem]  max-md:text-[1.3rem] pb-5 mb-5 font-semibold text-center border-b-2 border-primary leading-6 text-gray-900"
                    >
                      Nouvelle Actualité
                    </DialogTitle>
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="w-full">
                        <div className="flex flex-col gap-4">
                          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                            <div>
                              <label className="flex gap-3 mb-1">
                                Titre
                                <span className="text-secondary text-lg">
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                name="title"
                                ref={titleInput}
                                value={formData.title}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    title: e.target.value
                                  })
                                }
                                required
                                className="w-full formulaire"
                              />
                            </div>
                            <div>
                              <label className="flex gap-3 mb-1">
                                Documents (vidéo et pdf uniquement)
                              </label>
                              <input
                                type="text"
                                name="video_url"
                                ref={videoInput}
                                value={formData.video_url}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    video_url: e.target.value
                                  })
                                }
                                required
                                className="w-full formulaire"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="flex gap-3">
                              images de l'actualité (max 5 images)
                              <span className="text-secondary text-lg">*</span>
                            </label>
                            <input
                              type="file"
                              multiple
                              name="images"
                              ref={fileInputRef}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  images: e.target.files
                                })
                              }
                              required
                              className="formulaire"
                            />
                          </div>
                          <div>
                            <label className="flex gap-3 mb-1">
                              Description
                              <span className="text-secondary text-lg">*</span>
                            </label>
                            <ReactQuill
                              // ref={quillRef}
                              value={formData.description}
                              onChange={handleDescriptionChange}
                              className="bg-white h-80 max-md:h-60 max-md:mb-[9rem] mb-16"
                              placeholder="Entrez la description..."
                              modules={quillModules}
                              formats={formats}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                {/* handleSave() */}
                <button
                  type="button"
                  onClick={() => handleSave()}
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {isLoading ? "Sauvegarde en cours..." : "Ajouter"}
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

      <div className="flex flex-col gap-4">
        <Breads breadcrumbLinks={breadcrumbLinks} title="Actualites" />
        <div className="flex flex-col p-[3%]  bg-white rounded-lg w-full">
          <div className="flex flex-col gap-3 w-full component">
            <div className="flex items-center max-md:flex-col gap-2 justify-between banerpp">
              <h3 className="text-nowrap text-[1.4rem] max-md:text-[1.1rem]">
                Liste des Actualités
              </h3>
              <div className="w-full flex max-md:grid max-md:grid-cols-3 text-center items-center gap-2 justify-end max-md:justify-center text-[.8rem]">
                <div className="bg-secondary cursor-pointer btn-filter text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
                  Filre
                </div>
                <div className="bg-secondary text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
                  pdf
                </div>
                <div className="bg-secondary text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
                  imprimer
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-secondary flex items-center gap-2 text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize"
                >
                  <FaPlus /> Ajouter
                </button>
              </div>
            </div>
            <div
              className="bg-white border border-[#3174ad] filter-component rounded-md overflow-hidden overflow-y-hidden transition-all duration-500"
              style={{ height: 0 }}
            >
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
          {/* Search Bar and Date Filter on the same line */}

          {/* Display Table or Card View based on Toggle State */}
          <div className="overflow-x-auto w-full mt-4">
            <table className="min-w-full bg-white border border-gray-200 text-center">
              <thead className="bg-[#3174ad] text-white border-white font-semibold capitalize whitespace-nowrap">
                <tr className="text-md">
                  <th className="py-3 px-2 border">ID</th>
                  <th className="py-3 px-2 border">Thumbnail</th>
                  <th className="py-3 px-2 border">Titre</th>
                  {/* <th className="py-3 px-2 border-b">Type de lien</th> */}
                  <th className="py-3 px-2 border">Description</th>
                  {/* <th className="py-3 px-2 border">Video url</th> */}
                  <th className="py-3 px-2 border">Créer le</th>
                  <th className="py-3 px-2 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-md whitespace-nowrap border-gray-200">
                {currentItems?.map((item, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="py-2 px-2 border">{index + 1}</td>
                    <td className="py-2 px-2 border flex items-center justify-center">
                      <img
                        src={` ${BaseUrl}/${item?.images?.[0]}`}
                        alt={item?.title}
                        className="w-[100px] h-[60px] object-cover rounded-md overflow-hidden"
                      />
                    </td>
                    <td className="py-2 px-2 border">
                      {item?.title.length > 80
                        ? item?.title?.slice(0, 80) + "..."
                        : item?.title}
                    </td>
                    <td
                      className="py-2 px-2 border truncate max-w-xs table-cell"
                      dangerouslySetInnerHTML={{
                        __html: `${item?.description.slice(0, 60)}...`
                      }}
                    ></td>
                    {/* <td className="py-2 px-2 border">{item?.video_url}</td> */}
                    <td className="py-2 px-2 border table-cell">
                      {moment(item?.created_at).format(
                        "ddd D MMM YYYY à HH:mm"
                      )}
                    </td>
                    <td className="py-2 px-2 border">
                      <div className="flex justify-center space-x-3">
                        <button className="text-green-500 hover:text-green-700">
                          <FaEye size={19} />
                        </button>
                        <button className="text-blue-500 hover:text-blue-700">
                          <FaEdit size={19} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination and Floating "Create" Button for Mobile */}
          <div className="flex items-center justify-center md:justify-end mt-4 mb-4 mr-2 space-x-1">
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              &larr; Précédent
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageClick(page + 1)}
                className={`px-4 py-1 rounded-md transition duration-200 ${
                  currentPage === page + 1
                    ? "bg-red-500 text-white font-semibold"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Suivant &rarr;
            </button>
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: formData.description }} /> */}
        </div>
      </div>
    </>
  );
}

export default Actualite;
