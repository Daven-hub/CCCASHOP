import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";
import ReactQuill from "react-quill";

const localizer = momentLocalizer(moment);
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Titres (H1-H6)
    ["bold", "italic", "underline", "strike"], // Gras, italique, souligné, barré
    ["blockquote", "code-block"], // Citation et bloc de code
    [{ list: "ordered" }, { list: "bullet" }], // Listes ordonnées et non ordonnées
    [{ script: "sub" }, { script: "super" }], // Indices et exposants
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ direction: "rtl" }], // Texte de droite à gauche
    [{ size: ["small", false, "large", "huge"] }], // Taille du texte
    [{ color: [] }, { background: [] }], // Couleur et couleur de fond
    [{ font: [] }], // Famille de police
    [{ align: [] }], // Alignement du texte
    ["link", "image", "video"], // Liens, images, vidéos
    ["clean"] // Effacer la mise en forme
  ]
};

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
// const handleImageInsert = (url) => {
//   const quill = this.quillRef.getEditor();
//   const range = quill.getSelection();
//   const image = `<img src="${url}" style="width: 100px; height: auto; display: inline; float: left; margin-right: 10px;" />`;
//   quill.clipboard.dangerouslyPasteHTML(range.index, image);
// };

export default function EventList({ h = 380, event }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  // const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    lieux: "",
    description: "",
    thumbnail:null,
    document:null,
    startdate: null,
    enddate: null
  });

  const handleSelectSlot = (slotInfo) => {
    // setSelectedSlot(slotInfo);
    setFormData({
      ...formData,
      title: slotInfo.title,
      lieux: slotInfo.lieux,
      description: "",
      thumbnail:slotInfo.thumbnail,
      document:slotInfo.document,
      startdate: slotInfo.start,
      enddate: slotInfo.end
    });
    setShowForm(true);
  };
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      lieux: event.lieux,
      description: event.description,
      thumbnail:event.thumbnail,
      document:event.document,
      startdate: event.startdate,
      enddate: event.enddate
    });
    setShowForm(true);
  };

  // Gérer la soumission du formulaire
  //   const handleFormSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post("http://localhost:4000/api/events", formData);
  //       setEvents([...events, response.data]); // Mettre à jour localement
  //       setShowForm(false);
  //       setFormData({ title: "", start: null, end: null });
  //     } catch (error) {
  //       console.error("Erreur lors de l'enregistrement :", error);
  //     }
  //   };
  // console.log(formData.start)
  // const [eventDetails, setEventDetails] = useState({
  //   title: '',
  //   start: moment(new Date()).format('yyyy-MM-dd'),
  //   end: '',
  //   location: '',
  //   descriptionTitle: '',
  //   descriptionText: '',
  //   imagePreview: null,
  //   descriptionImagePreview: null,
  // });
  // const handleDescriptionChange = (value) => {
  //   setEventDetails({
  //     ...eventDetails,
  //     descriptionText: value,
  //   });
  // };
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
                      Evenements
                    </DialogTitle>
                    <div className="flex flex-col gap-4 mt-2">
                      {/* <div className='flex items-center gap-2'>Formation:
                                                <span className='text-secondary font-semibold text-center leading-5 text-[.85rem]'>{choix}</span></div> */}

                      <form className="w-full flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            className="formulaire"
                            value={formData.title}
                            placeholder="Titre de l'évenement"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value
                              })
                            }
                            required
                          />
                          <input
                            type="text"
                            className="formulaire"
                            value={formData.lieux}
                            placeholder="Lieux de l'évenement"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lieux: e.target.value
                              })
                            }
                            required
                          />
                          <input
                            className="formulaire"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                startdate: e.target.value
                              })
                            }
                            type="datetime-local"
                            value={moment(formData.startdate).format(
                              "YYYY-MM-DDTHH:mm"
                            )}
                          ></input>
                          <input
                            className="formulaire"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                enddate: e.target.value
                              })
                            }
                            type="datetime-local"
                            value={moment(formData.enddate).format(
                              "YYYY-MM-DDTHH:mm"
                            )}
                          ></input>
                          <input
                            type="file"
                            className="formulaire"
                            placeholder="Lieux de l'évenement"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lieux: e.target.value
                              })
                            }
                            required
                          />
                          <input
                            type="file"
                            className="formulaire"
                            placeholder="Lieux de l'évenement"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lieux: e.target.value
                              })
                            }
                          />
                        </div>
                        <div className="mb-16 max-md:mb-1 w-full">
                          <ReactQuill
                            value={formData.description}
                            // onChange={handleDescriptionChange}
                            modules={quillModules}
                            formats={formats}
                            style={{ height: 350 }}
                            theme="snow"
                            placeholder="Entrez la description de l'événement..."
                            className="bg-white w-full h-[500px] md:h-40"
                          />
                          {/* <Editor /> */}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md shadow-sm sm:ml-3 sm:w-auto"
                >
                  Sauvegarder
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-secondary rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Supprimer cet evenement
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
      <div>
        <Calendar
          localizer={localizer}
          events={event}
          startAccessor="startdate"
          endAccessor="enddate"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{ height: h }}
          // date={event[0].startdate}
          onNavigate={(date) => setCurrentDate(date)}
          poppup
          views={["month", "week", "day", "agenda"]}
        />
      </div>
    </>
  );
}

// localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{width:'100%',height:380}}
//             onSelectEvent={handleEventClick}
