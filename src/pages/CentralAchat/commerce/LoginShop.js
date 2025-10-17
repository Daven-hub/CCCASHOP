import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcumb";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Circle, CircleCheck, Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  login,
  registerApp,
  registerAppShop,
} from "../../../store/slices/auth.slice";
import { useToast } from "../../../hook/use-toast";
import { useAuth } from "../../../context/authContext";
import FormLogin from "../form/FormLogin";
import FormRegister from "../form/FormRegister";

export const BreadShop = ({ data }) => {
  return (
    <div className="bg-gray-100 flex justify-center py-7">
      <Breadcrumb data={data} />
    </div>
  );
};

function LoginShop() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { userConnected,refreshUser } = useAuth();
  const { toast } = useToast();
  const roles = [
    {
      label: "je suis acheteur",
      lien: "acheteur",
    },
    {
      label: "je suis fournisseur",
      lien: "fournisseur",
    },
  ];
  // const bread = [
  //       { label: t("accueille"), path: "/a" },
  //       { label: "Login Shop", path: "/login" }
  // ];

  useEffect(() => {
    if (userConnected) {
      navigate("/");
    }
  }, [userConnected, navigate]);

  const {
    register: connexion,
    control: controle,
    handleSubmit: handleSubmite,
    watch: watchs,
    formState: { errors: errorLog },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    register: Enregistrement,
    control: controlE,
    handleSubmit: handleEnregistrement,
    setValue,
    watch: watchE,
    formState: { errors: errorLogE },
  } = useForm({
    defaultValues: {
      role: roles[0]?.lien ?? "",
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleLogin = async () => {
    setIsLoading(true);
    const body = watchs();
    try {
      await dispatch(login(body)).unwrap();
      toast({
        title: "Connexion reussie",
        description: "Bienvenue",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Connexion echouée",
        description: error?.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const body = watchE();
    const { confimPass, ...datas } = body;
    const datamodel = new FormData();
    datamodel.append("status", datas?.role === "fournisseur" ? false : true);
    for (const key in datas) {
      if (key === "profile") {
        if (datas.profile && datas.profile.length > 0) {
          datamodel.append("profile", datas?.profile?.[0]);
        }
      } else if (datas[key] !== undefined && datas[key] !== null) {
        datamodel.append(key, datas[key]);
      }
    }
    try {
      if (datas?.role !== "fournisseur") {
        await dispatch(registerApp(datamodel)).unwrap();
      } else {
        await dispatch(registerAppShop(datamodel)).unwrap();
      }
      toast({
        title: "Enregistrement reussie",
      });
      refreshUser()
      navigate("/mon-compte/connexion");
    } catch (error) {
      toast({
        title: "Enregistrement échouée",
        description: error?.toString(),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const liensNav = [
    {
      label: "Connexion",
      lien: "connexion",
    },
    {
      label: "Enregistrement",
      lien: "enregistrement",
    },
  ];

  const nom = watchE("nom", "");
  const prenom = watchE("prenom", "");
  const [userEditedUsername, setUserEditedUsername] = useState(false);
  useEffect(() => {
    if (!userEditedUsername && nom && prenom) {
      const clean = (str) =>
        str
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9 ]/g, " ")
          .trim()
          .replace(/\s+/g, " ");

      const cleanPrenom = clean(prenom);
      const cleanNom = clean(nom);

      const prenomParts = cleanPrenom.split(" ");
      const nomParts = cleanNom.split(" ");

      const prenomFinal = prenomParts[0];
      const nomFinal = nomParts[nomParts.length - 1];

      const baseUsername = `${prenomFinal}.${nomFinal}`;
      const randomNum = Math.floor(Math.random() * 1000);
      const username = `${baseUsername}${randomNum}`;
      setValue("username", username);
    }
  }, [nom, prenom, userEditedUsername, setValue]);

  return (
    <div className="flex flex-col">
      {/* <BreadShop data={bread} /> */}
      <div className="px-[32%] bg-gray-200 py-12 md:py-14">
        <div className="bg-white shadow flex flex-col gap-10 px-12 py-12 rounded-[6px] border">
          <ul className="grid nav-login grid-cols-2 gap-4 text-[1.4rem] font-semibold">
            {liensNav?.map((x, ind) => (
              <li key={ind}>
                <NavLink
                  className="w-full border-2 rounded-[6px] py-2 capitalize flex items-center justify-center"
                  to={"/mon-compte/" + x.lien}
                >
                  {x.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {id === "connexion" ? (
            <FormLogin
              onSubmit={handleSubmite(handleLogin)}
              loading={loading}
              connexion={connexion}
              errorLog={errorLog}
            />
          ) : (
            <FormRegister
              setUserEditedUsername={setUserEditedUsername}
              watchE={watchE}
              roles={roles}
              controle={controlE}
              onSubmit={handleEnregistrement(handleSave)}
              loading={isLoading}
              connexion={Enregistrement}
              errorLog={errorLogE}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginShop;
