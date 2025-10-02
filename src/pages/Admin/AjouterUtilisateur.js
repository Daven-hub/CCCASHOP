import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaUser,  FaPlus, FaEdit,  FaTrash } from "react-icons/fa";
import Breads from "../Components/Breads";
import "react-quill/dist/quill.snow.css";
import img1 from "../../../assets/1x/image.png";
import img2 from "../../../assets/1x/karl.jpg"
// import ReactQuill from "react-quill";

export default function AjouterUtilisateur() {
  const [users, setUsers] = useState([
    { id: 1, nom: "Dupont", prenom: "Jean", email: "jean.dupont@example.com", telephone: "0612345678", image:img2 },
    { id: 2, nom: "Martin", prenom: "Claire", email: "claire.martin@example.com", telephone: "0712345678", image:img1 },
  ]);
  const [loading, setLoading] = useState(false);
  // const [showForm, setShowForm] = useState(false);
  const breadcrumbLinks = [
    { label: "Acceuil", path: "/" },
    { label: "Utilisateurs", path: "/Admin/AjouterUtilisateur" }
    
  ];

  // const [ setNewMember] = useState({
  //   nom: '',
  //   prenom: '',
  //   email:'',
  //   telephone:'',
  //   image: null,
  // });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // const quillModules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }], // Titres (H1-H6)
  //       ["bold", "italic", "underline", "strike"], // Gras, italique, souligné, barré
  //       ["blockquote", "code-block"], // Citation et bloc de code
  //       [{ list: "ordered" }, { list: "bullet" }], // Listes ordonnées et non ordonnées
  //       [{ script: "sub" }, { script: "super" }], // Indices et exposants
  //       [{ indent: "-1" }, { indent: "+1" }], // Indentation
  //       [{ direction: "rtl" }], // Texte de droite à gauche
  //       [{ size: ["small", false, "large", "huge"] }], // Taille du texte
  //       [{ color: [] }, { background: [] }], // Couleur et couleur de fond
  //       [{ font: [] }], // Famille de police
  //       [{ align: [] }], // Alignement du texte
  //       ["link", "image", "video"], // Liens, images, vidéos
  //       ["clean"], // Effacer la mise en forme
  //   ],
  // };
  
  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "code-block",
  //   "list",
  //   "bullet",
  //   "script",
  //   "indent",
  //   "direction",
  //   "size",
  //   "color",
  //   "background",
  //   "font",
  //   "align",
  //   "link",
  //   "image",
  //   "video",
  // ];

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // const handleAddUser = () => {
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Les mots de passe ne correspondent pas !");
  //     return;
  //   }
  //   const newUser = { id: users.length + 1, ...formData };
  //   setUsers([...users, newUser]);
  //   setFormData({ nom: "", prenom: "", email: "", telephone: "", password: "", confirmPassword: "" });
  //   setShowDialog(false);
  // };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="flex flex-col gap-5">
    <Breads breadcrumbLinks={breadcrumbLinks} title="Utilisateurs"/>
    <div className="flex flex-col gap-3 items-center p-[3%] bg-white rounded-lg w-full">
      <div className="flex flex-col gap-3 w-full component">
        <div className="flex items-center max-md:flex-col gap-2 justify-between banerpp">
          <h3 className="text-nowrap text-[1.4rem] max-md:text-[1.1rem]">
          Liste des Utilisateurs
          </h3>
          <div className="w-full flex max-md:grid max-md:grid-cols-3 text-center items-center gap-2 justify-end max-md:justify-center text-[.8rem]">
            <div className="bg-secondary cursor-pointer btn-filter text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
              Filre
            </div>
            <div className="bg-secondary text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize">
              pdf
            </div>
            <button
       onClick={() => setShowDialog(true)}
       className="bg-secondary text-white px-6 py-2 max-md:py-1.5 bg-opacity-90 rounded-[5px] font-medium capitalize"
      >
        <FaPlus className="inline mr-2" /> Ajouter un utilisateur
      </button>
          </div>
        </div>
        <div className="bg-white border border-[#3174ad] filter-component rounded-md overflow-hidden overflow-y-hidden transition-all duration-500">
          <div className="flex flex-col">
            <div className="flex items-center justify-center bg-[#3174ad] text-white p-2">
              <span className="text-center text-[1.1rem] max-md:text-[.9rem] font-medium capitalize">
                Filtre
              </span>
            </div>
            <div className="p-4 filter-component py-5 grid grid-cols-2 max-md:grid-cols-1 gap-4">
              <input
                type="text"
                className="formulaire"
                placeholder="Nom de l'utilisateur"
              ></input>

<input
                type="text"
                className="formulaire"
                placeholder="Adresse mail de l'utilisateur"
              ></input>
              
             
            </div>
          </div>
        </div>
      </div>

     {/* Tableau des utilisateurs */}
     <div className="overflow-x-auto w-full mt-4">
            <table className="min-w-full bg-white border border-gray-200 text-center">
              <thead className="bg-[#3174ad] text-white font-semibold capitalize whitespace-nowrap">
              <tr className="text-md">
              <th className="py-3 px-2 border-b">image</th>
              <th className="py-3 px-2 border-b">Nom</th>
              <th className="py-3 px-2 border-b">Prénom</th>
              <th className="py-3 px-2 border-b">E-mail</th>
              <th className="py-3 px-2 border-b">Téléphone</th>
              <th className="py-3 px-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-md whitespace-nowrap">
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                 <td className="py-2 px-2 flex items-center justify-center">
                {user.image ? (
                <img src={user.image} alt={user.nom} className="w-[100px] h-[60px] rounded-md overflow-hidden" />
                ) : (
                <FaUser className="text-2xl text-gray-400 mx-auto mb-2" />
                )}
                </td>
                <td className="py-2 px-2 truncate table-cell">{user.nom}</td>
                <td className="py-2 px-2 truncate table-cell">{user.prenom}</td>
                <td className="py-2 px-2 truncate table-cell">{user.email}</td>
                <td className="py-2 px-2 truncate table-cell">{user.telephone}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                      <div className="flex justify-center space-x-3">
                        <button
                         
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit  size={21}/>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={21}/>
                        </button>
                      </div>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Ajouter utilisateur */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} className="relative z-[100]">
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
                {loading && (
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
                )}
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 text-center sm:mt-0">
                      <DialogTitle
                        as="h1"
                        className="text-[1.6rem] mb-8 font-semibold leading-6 text-gray-900"
                      >
                        AJouter un utilisateur
                      </DialogTitle>
                      <div className="flex flex-col gap-4 mt-2">
                        {/* <div className='flex items-center gap-2'>Formation:
                                                  <span className='text-secondary font-semibold text-center leading-5 text-[.85rem]'>{choix}</span></div> */}
  
                        <form className="w-full flex flex-col gap-4">
                        <div className="mb-4">
                <label className="block text-gray-700 mb-2">Photo</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition duration-200 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  {formData.image ? (
                    <img src={formData.image} alt={formData.nom} className="object-cover w-full h-48 rounded-md" />
                  ) : (
                    <>
                      <div className="text-blue-600">
                        <FaUser className="text-6xl" />
                      </div>
                      <p className="text-gray-600">Déposez ou <span className="text-blue-600">sélectionnez</span></p>
                    </>
                  )}
                </label>
              </div>
         <div className="grid grid-cols-2 gap-4">
             <input
              type="text"
              className="formulaire"
              placeholder="Nom de l'utilisateur"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              required
              />

            <input
              type="text"
              className="formulaire"
              placeholder="Prénom de l'utilisateur"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              required
              />
                             
         </div>
         <div className="grid grid-cols-2 gap-4">
             <input
              type="email"
              className="formulaire"
              placeholder="email de l'utilisateur"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              />

            <input
              type="number"
              className="formulaire"
              placeholder="téléphone de l'utilisateur"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              required
              />
                             
         </div>
         
                                  
   </form>
    </div>
     </div>
     </div>
     </div>
      <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Sauvegarder
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setShowDialog(false)}
                    className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Annuler
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
      </Dialog>
    </div>
    </div>
  );
}
