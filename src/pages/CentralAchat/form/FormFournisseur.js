// MultiStepForm.js
import React, { useState } from "react";
// import StepWizard from "react-step-wizard";
import { Controller, useForm } from "react-hook-form";
import { Loader2, MoveLeft, MoveRight, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { useDispatch } from "react-redux";
import { registerApp } from "../../../store/slices/auth.slice";
import { useToast } from "../../../hook/use-toast";

function Step1({ compte, nextStep, setFormData, formData }) {
      const { register, handleSubmit, control, formState: { errors },reset } = useForm({
            defaultValues: { ...formData, role: compte, username: formData?.nom },
      });

      const [loading, setLoading] = useState(false)

      const dispatch = useDispatch()
      const { toast } = useToast();

      const [image, setImage] = useState(null);

      const handleChange = (e) => {
            const file = e.target?.files[0];
            if (file) {
                  setImage(URL.createObjectURL(file));
            }
      };

      const onSubmit = async (data) => {
            setLoading(true)
            try {
                  const { status, ...safeData } = data;
                  const datas = { ...safeData, username: safeData?.nom }
                  const datamodel = new FormData();
                  for (const key in datas) {
                        if (key === 'profile') {
                              if (datas.profile && datas.profile.length > 0) {
                                    datamodel.append('profile', datas?.profile?.[0]);
                              }
                        } else if (datas[key] !== undefined && datas[key] !== null) {
                              datamodel.append(key, datas[key]);
                        }
                  }
                  await dispatch(registerApp(datamodel)).unwrap();
                  toast({
                        title: "Enregistrement éffectué",
                  });
                  reset()
            } catch (error) {
                  console.log("error", error)
                  toast({
                        title: "Enregistrement échoué",
                        description: error?.toString(),
                        variant: "destructive",
                  });
            } finally {
                  setLoading(false)
            }

            // await setFormData({ ...formData, ...data });
            // console.log("data", data)
            // nextStep();
      };

      return (
            <div className="flex form-f flex-col gap-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[1.28rem] p-0 rounded-[5px]">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex flex-col gap-3.5 md:gap-[1.35rem]'>
                                    <div className='flex relative flex-col gap-1'>
                                          <label>Type de compte</label>
                                          <input
                                                className='border rounded-[5px] p-2 bg-gray-100'
                                                readOnly
                                                type='text'
                                                {...register("role")}
                                          />
                                          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                                    </div>
                                    <div className='flex relative flex-col gap-1'>
                                          <label>Nom de l'entreprise</label>
                                          <input
                                                className='border rounded-[5px] p-2'
                                                type='text'
                                                {...register("nom", { required: "Nom obligatoire" })}
                                          />
                                          {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
                                    </div>

                                    <div className='flex relative flex-col gap-1'>
                                          <label>Statut</label>
                                          <Controller
                                                name="status"
                                                control={control}
                                                rules={{ required: "Le statut est obligatoire" }}
                                                render={({ field, fieldState }) => (
                                                      <div className="">
                                                            <Select value={field.value} onValueChange={field.onChange}>
                                                                  <SelectTrigger >
                                                                        <SelectValue placeholder="Choisir un statut" />
                                                                  </SelectTrigger>
                                                                  <SelectContent>
                                                                        <SelectItem value="société">société</SelectItem>
                                                                        <SelectItem value="Entreprise individuelle">Entreprise individuelle</SelectItem>
                                                                        <SelectItem value="partenariat">partenariat</SelectItem>
                                                                  </SelectContent>
                                                            </Select>
                                                            {/* Affichage erreur */}
                                                            {fieldState.error && (
                                                                  <p className="text-red-500 text-sm mt-1">
                                                                        {fieldState.error.message}
                                                                  </p>
                                                            )}
                                                      </div>
                                                )}
                                          />

                                    </div>
                              </div>

                              <div className="flex flex-col gap-1 h-full">
                                    <label>Logo de l'entreprise</label>
                                    <div className="relative flex-1">
                                          <input
                                                type="file"
                                                id="upload"
                                                accept="image/*"
                                                className="hidden"
                                                {...register("profile")}
                                                onChange={(e) => {
                                                      register("profile").onChange(e);
                                                      handleChange(e);
                                                }}
                                          />
                                          <label
                                                htmlFor="upload"
                                                className="w-full relative md:h-full border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50"
                                          >
                                                {image ? (
                                                      <img
                                                            src={image}
                                                            alt="Uploaded"
                                                            className="absolute w-full h-full object-contain rounded-xl"
                                                      />
                                                ) : (
                                                      <span className="absolute flex flex-col gap-1.5 items-center p-0 m-o top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400"><PlusCircle strokeWidth={.5} size={40} /> Cliquez pour ajouter</span>
                                                )}
                                          </label>
                                    </div>
                              </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex relative flex-col gap-1'>
                                    <label>Email</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='email'
                                          {...register("email", {
                                                required: "Email obligatoire",
                                                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: "Email invalide" }
                                          })}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                              </div>
                              <div className='flex relative flex-col gap-1'>
                                    <label>Adresse du siège social</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("adresse", { required: "Adresse requis" })}
                                    />
                              </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex relative flex-col gap-1'>
                                    <label>Pays / zone géographique</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("pays", { required: true })}
                                    />
                              </div>
                              <div className='flex relative flex-col gap-1'>
                                    <label>Téléphone</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("tel", {
                                                required: "Téléphone obligatoire", pattern: {
                                                      value: /^[0-9]+$/, message: "Le numéro doit contenir uniquement des chiffres",
                                                }
                                          })}
                                    />
                                    {errors.tel && <p className="text-red-500 text-sm">{errors.tel.message}</p>}
                              </div>
                        </div>

                        {/* <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex relative flex-col gap-1'>
                                    <label>Monnaie utilisée</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("currency")}
                                    />
                              </div>
                              <div className='flex relative flex-col gap-1'>
                                    <label>Site web</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("website")}
                                    />
                              </div>
                        </div> */}
                        <button
                              type="submit"
                              className="bg-primary flex items-center w-fit font-medium gap-2.5 text-white px-7 py-2.5 rounded text-[.9rem] mt-5"
                        >
                              {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                              ) : (
                                    "Enregistrer"
                              )}
                              {/* <MoveRight strokeWidth={1} /> */}
                        </button>
                  </form>
            </div>
      );
}

function Step2({ nextStep, previousStep, setFormData, formData }) {
      const { register, handleSubmit, formState: { errors } } = useForm({
            defaultValues: formData,
      });

      const [image, setImage] = useState(null);

      const handleChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setImage(URL.createObjectURL(file));
            }
      };

      const onSubmit = (data) => {
            setFormData({ ...formData, ...data });
            nextStep();
      };

      return (
            <div className="flex flex-col">
                  <h2 className="text-xl font-bold mb-4">Renseigner vos informations principale</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className=" p-6 rounded-[5px] border">
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex flex-col gap-3.5 md:gap-3.5'>
                                    <div className='flex flex-col gap-1'>
                                          <label>Nom de l'entreprise</label>
                                          <input
                                                className='border rounded-[5px] p-2'
                                                type='text'
                                                {...register("companyName", { required: "Nom obligatoire" })}
                                          />
                                          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                          <label>Forme juridique</label>
                                          <input
                                                className='border rounded-[5px] p-2'
                                                type='text'
                                                {...register("legalForm", { required: "Forme juridique obligatoire" })}
                                          />
                                          {errors.legalForm && <p className="text-red-500 text-sm">{errors.legalForm.message}</p>}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                          <label>Numéro d’immatriculation</label>
                                          <input
                                                className='border rounded-[5px] p-2'
                                                type='text'
                                                {...register("registrationNumber")}
                                          />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                          <label>Adresse du siège social</label>
                                          <input
                                                className='border rounded-[5px] p-2'
                                                type='text'
                                                {...register("headOffice")}
                                          />
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
                                                {...register("logo")}
                                                onChange={handleChange}
                                          />
                                          <label
                                                htmlFor="upload"
                                                className="w-full relative h-full min-h-[270px] border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-50"
                                          >
                                                {image ? (
                                                      <img
                                                            src={image}
                                                            alt="Uploaded"
                                                            className="absolute w-full h-full object-contain rounded-xl"
                                                      />
                                                ) : (
                                                      <p className="text-gray-400">Cliquez pour ajouter</p>
                                                )}
                                          </label>
                                    </div>
                              </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex flex-col gap-1'>
                                    <label>Pays / zone géographique</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("country")}
                                    />
                              </div>
                              <div className='flex flex-col gap-1'>
                                    <label>Téléphone</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("phone", { required: "Téléphone obligatoire" })}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                              </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex flex-col gap-1'>
                                    <label>Email</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='email'
                                          {...register("email", {
                                                required: "Email obligatoire",
                                                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/, message: "Email invalide" }
                                          })}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                              </div>
                              <div className='flex flex-col gap-1'>
                                    <label>Site web</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("website")}
                                    />
                              </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-6 items-center'>
                              <div className='flex flex-col gap-1'>
                                    <label>Monnaie utilisée</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("currency")}
                                    />
                              </div>
                              <div className='flex flex-col gap-1'>
                                    <label>Zone de livraison / couverture</label>
                                    <input
                                          className='border rounded-[5px] p-2'
                                          type='text'
                                          {...register("deliveryZone")}
                                    />
                              </div>
                        </div>
                        <div className="flex justify-between mt-3">
                              <button
                                    type="button"
                                    onClick={previousStep}
                                    className="bg-gray-400 flex items-center gap-2 text-white px-4 py-2 rounded"
                              >
                                    <MoveLeft />
                              </button>
                              <button
                                    type="submit"
                                    className="bg-primary text-white px-4 py-2 rounded"
                              >
                                    <MoveRight />
                              </button>
                        </div>
                  </form>
            </div>
      );
}

function Step3({ previousStep, formData }) {
      const handleFinish = () => {
            console.log("Données envoyées ✅", formData);
            alert("Formulaire soumis avec succès !");
      };

      return (
            <div className="p-6 border rounded-xl shadow-md">
                  <h2 className="text-xl font-bold mb-4">Étape 3 : Confirmation</h2>
                  <p><strong>Nom :</strong> {formData.name}</p>
                  <p><strong>Email :</strong> {formData.email}</p>

                  <div className="flex justify-between mt-4">
                        <button
                              onClick={previousStep}
                              className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                              Retour
                        </button>
                        <button
                              onClick={handleFinish}
                              className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                              Envoyer ✅
                        </button>
                  </div>
            </div>
      );
}

export default function FormFournisseur({ compte }) {
      const [formData, setFormData] = useState({});
      const [currentStep, setCurrentStep] = useState(1);

      // console.log(formData)
      return (
            <div className="w-full flex flex-col gap-8 py-5 z-0">
                  <div className="flex items-center justify-between gap-4">
                        <h2 className="text-4xl font-bold">Renseigner vos informations principales</h2>
                        <NavLink className={"text-[.85rem] text-gray-600 hover:underline transition-all duration-300 mt-1"} to={"/login"} >J'ai déja un compte</NavLink>
                  </div>
                  {/* <StepWizard onStepChange={(stats) => setCurrentStep(stats.activeStep)}>
                        <Step1 setFormData={setFormData} compte={compte} formData={formData} />
                        <Step2 setFormData={setFormData} formData={formData} />
                        <Step3 formData={formData} />
                  </StepWizard> */}
                  <Step1 setFormData={setFormData} compte={compte} formData={formData} />
            </div>
      );
}
