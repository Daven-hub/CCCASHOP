import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { FaImage, FaFilePdf } from "react-icons/fa";
import Breads from "../../components/Admin/Breads";

function PresentationAdmin() {
  const [imageURL, setImageURL] = useState("");
  const [content, setContent] = useState("Texte initial de la présentation...");
  const [buttonText, setButtonText] = useState("Télécharger le document");
  const [pdfURL, setPdfURL] = useState("");

  // Gestion de l'image
  const handleImageChange = (e) => {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setImageURL(URL.createObjectURL(uploadedImage));
    }
  };

  const breadcrumbLinks = [
    { label: "Acceuil", path: "/" },
    { label: "À propos", path: "/" },
    { label: "Presentation", path: "/Admin/à-propos/Presentation" }
    
  ];

  // Gestion du document PDF
  const handleDocumentChange = (e) => {
    const uploadedDocument = e.target.files[0];
    if (uploadedDocument && uploadedDocument.type === "application/pdf") {
      setPdfURL(URL.createObjectURL(uploadedDocument));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Breads breadcrumbLinks={breadcrumbLinks} title="Présentation"/>
      <div className="flex flex-col gap-3 items-center p-[3%] bg-white rounded-lg w-full">
        <div className="flex flex-col gap-3 w-full component">
          <div className=" items-center max-md:flex-col gap-2 justify-between banerpp">
            <h3 className="text-nowrap text-[1.4rem] max-md:text-[1.1rem]">
            Modifier la Présentation
            </h3>
            <hr className='w-full border border-[#3174ad] my-2'/>
        <div className="space-y-6 pt-4">
          {/* Boutons Image et Cadre Document */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sélection de l'image */}
            <div>
              <label className="block font-semibold mb-2">Changer l'image :</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm formulaire text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div >
            <label className="block  font-semibold mb-2">Changer le document PDF :</label>   
            <input
            
            type="file"
            id="pdfUpload"
            accept="application/pdf"
            onChange={handleDocumentChange}
            className="block w-full text-sm formulaire text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            </div>

          </div>

          {/* Aperçu Image et PDF */}
        

          {/* Modification du texte avec ReactQuill */}
          <div>
            <label className="block font-semibold mb-2">Modifier le contenu :</label>
            <ReactQuill value={content} onChange={(value) => setContent(value)} className="h-56 mb-20" />
          </div>

         
         
        
        </div>
      </div>
      </div>
      </div>
      
    </div>
  );
}

export default PresentationAdmin;
