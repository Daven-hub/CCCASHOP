import React, { useState, useEffect } from "react";
import {
  UserRound,
  Mail,
  Calendar,
  PhoneIcon,
  LocateIcon,
  User2Icon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/Avatar";
import { Separator } from "../../components/ui/separator";
import { useForm } from "react-hook-form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
// import { getAllUsers, updateUser } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../hook/use-toast";
import { Button } from "../../components/ui/Button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { getAllUsers, updateUser } from "../../store/slices/user.slice";
import { BaseUrl } from "../../config";
import moment from "moment";

const Profile = () => {
  const { toast } = useToast();
  const { userConnected } = useAuth();
  const { users } = useSelector((state) => state.users);
  const [activeTab, setActiveTab] = useState("schedules");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const detail = users?.find((x) => x.idUsershop === userConnected.idUsershop);

  const {
    register: register,
    handleSubmit: handleSubmit,
    setValue: setValue,
    watch: watch,
    formState: { errors: errors },
  } = useForm({
    defaultValues: {
      nom: userConnected?.nom || "",
      email: userConnected?.email || "",
      adresse: userConnected?.adresse || "",
    },
  });

  const {
    register: registerPass,
    handleSubmit: handlePassword,
    setValue: setValuePass,
    watch: watchPass,
    formState: { errors: errorsPass },
  } = useForm({
    defaultValues: {
      password: userConnected?.adresse || "",
      newpass: userConnected?.email || "",
      confirmpass: userConnected?.nom || "",
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (detail) {
      setValue("nom", userConnected.nom);
       setValue("prenom", userConnected.prenom);
      setValue("email", userConnected.email);
      setValue("adresse", userConnected.adresse || "");
    }
  }, [detail, setValue]);

  const onSubmit = async () => {
    const data = watch();
    setLoading(true);
    try {
      dispatch(updateUser({ id: userConnected.id, Usershopdata: data }));
      toast({
        title: "Profile Updated",
        description: "Profile Updated successfuly",
      });
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Profile Updated",
        description: "Profile Updated fail",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const onSubmitPassword = async () => {
    const data = watchPass();
    setLoading(true);
    try {
      dispatch(updateUser({ id: userConnected.id, data: data }));
      toast({
        title: "Password Updated",
        description: "Profile Updated successfuly",
      });
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Password Updated",
        description: "Last password is not correct",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const newpass = watchPass("newpass");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserRound className="h-6 w-6" /> Profile
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card className="md:col-span-1 px-3 bg-white">
          <CardHeader className="pb-2">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage className='object-cover' alt={userConnected?.idUsershop} src={BaseUrl+''+userConnected?.profile}/>
                <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                  {userConnected?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {userConnected?.role!=='fournisseur'?<CardTitle>{userConnected?.prenom+' '+userConnected?.nom}</CardTitle>:<CardTitle>{userConnected?.shopname}</CardTitle> }
              <CardDescription className="text-center mt-2">
                {userConnected?.role?.charAt(0).toUpperCase() + userConnected?.role?.slice(1)}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <User2Icon className="h-4 w-4" />
                <span>Nom : {detail?.nom?detail?.nom:'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <User2Icon className="h-4 w-4" />
                <span>Prenom : {detail?.prenom?detail?.prenom:'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <User2Icon className="h-4 w-4" />
                <span>Nom d'utilisateur : {detail?.username?detail?.username:'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{detail?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                <span>{detail?.tel?detail?.tel:'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <LocateIcon className="h-4 w-4" />
                <span>{detail?.adresse?detail?.adresse:'N/A'}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Créer le {" "}
                  {detail?.created_at
                    ? moment(detail?.created_at)?.format('DD/MM/YYYY')
                    : "N/A"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs
          defaultValue="schedules"
          className="w-full md:col-span-2"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 border">
            <TabsTrigger value="schedules">Information principale</TabsTrigger>
            <TabsTrigger value="logs">Information de connexion</TabsTrigger>
          </TabsList>

          <TabsContent value="schedules" className="mt-4">
            <Card className="md:col-span-2 bg-white">
              <CardHeader>
                <CardTitle>Detail Personnel</CardTitle>
                {/* <CardDescription>Update Details Description</CardDescription> */}
              </CardHeader>
              <CardContent>
                <form
                  id="profile-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        disabled={!isEditing || loading}
                        {...register("nom", { required: true })}
                      />
                      {errors.nom && (
                        <p className="text-sm text-destructive">nom require</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Prenom</Label>
                      <Input
                        id="prenom"
                        disabled={!isEditing || loading}
                        {...register("prenom", { required: true })}
                      />
                      {errors.nom && (
                        <p className="text-sm text-destructive">prenom require</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        disabled={!isEditing || loading}
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          email require
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Adresse</Label>
                      <Input
                        id="adresse"
                        disabled={!isEditing || loading}
                        {...register("adresse")}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      form="profile-form"
                      className="text-white"
                      disabled={loading}
                    >
                      {loading ? "En cour" : "Enregistrer"}
                    </Button>
                  </>
                ) : (
                  <Button className="text-white" onClick={() => setIsEditing(true)}>Editer</Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card className="md:col-span-2 bg-white">
              <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>Update credential</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="profile-form"
                  onSubmit={handlePassword(onSubmitPassword)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lastpass">Last password</Label>
                      <Input
                        id="lastpass"
                        type="password"
                        disabled={!isEditing || loading}
                        {...registerPass("password", { required: true })}
                      />
                      {errors.fullname && (
                        <p className="text-sm text-destructive">nom require</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newpass">New password</Label>
                      <Input
                        id="newpass"
                        type="password"
                        disabled={!isEditing || loading}
                        {...registerPass("newpass", { required: true })}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">
                          email require
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm password</Label>
                      <Input
                        id="confirm"
                        type="password"
                        disabled={!isEditing || loading}
                        {...registerPass("confirmpass", {
                          required: "confirm password required",
                          validate: (value) =>
                            value === newpass ||
                            "confirm password doesn't match with new pasword",
                        })}
                      />
                      {errorsPass.confirmpass && (
                        <p className="text-xs text-red-500">
                          {errorsPass.confirmpass.message}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={loading}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      form="profile-form"
                      disabled={loading}
                    >
                      {loading ? "En cour" : "Sauvegarder"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Editer</Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Profile Form Card */}
      </div>
    </div>
  );
};

export default Profile;
