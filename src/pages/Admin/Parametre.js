// import React from 'react'

// function Parametre() {
//   return (
//     <div>
//       <Tabs defaultValue="general" className="w-full">
//         <TabsList className="grid w-full grid-cols-6">
//           <TabsTrigger value="general">Général</TabsTrigger>
//           <TabsTrigger value="notifications">Notifications</TabsTrigger>
//           <TabsTrigger value="security">Sécurité</TabsTrigger>
//           <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
//           <TabsTrigger value="appearance">Apparence</TabsTrigger>
//           <TabsTrigger value="integrations">Intégrations</TabsTrigger>
//         </TabsList>

//         {/* Général */}
//         <TabsContent value="general">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Globe className="h-5 w-5" />
//                 Paramètres Généraux
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="site_name">Nom du site</Label>
//                   <Input
//                     id="site_name"
//                     value={settings.site_name}
//                     onChange={(e) => updateSetting("site_name", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="site_url">URL du site</Label>
//                   <Input
//                     id="site_url"
//                     value={settings.site_url}
//                     onChange={(e) => updateSetting("site_url", e.target.value)}
//                   />
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="site_description">Description</Label>
//                 <Textarea
//                   id="site_description"
//                   value={settings.site_description}
//                   onChange={(e) => updateSetting("site_description", e.target.value)}
//                   rows={3}
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="admin_email">Email administrateur</Label>
//                 <Input
//                   id="admin_email"
//                   type="email"
//                   value={settings.admin_email}
//                   onChange={(e) => updateSetting("admin_email", e.target.value)}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Notifications */}
//         <TabsContent value="notifications">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Bell className="h-5 w-5" />
//                 Notifications
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Notifications par email</Label>
//                   <p className="text-sm text-muted-foreground">Recevoir les notifications importantes par email</p>
//                 </div>
//                 <Switch
//                   checked={settings.email_notifications}
//                   onCheckedChange={(checked) => updateSetting("email_notifications", checked)}
//                 />
//               </div>
              
//               <Separator />
              
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Notifications de commandes</Label>
//                   <p className="text-sm text-muted-foreground">Être notifié des nouvelles commandes</p>
//                 </div>
//                 <Switch
//                   checked={settings.order_notifications}
//                   onCheckedChange={(checked) => updateSetting("order_notifications", checked)}
//                 />
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Notifications d'inscription</Label>
//                   <p className="text-sm text-muted-foreground">Être notifié des nouveaux utilisateurs</p>
//                 </div>
//                 <Switch
//                   checked={settings.user_registration_notifications}
//                   onCheckedChange={(checked) => updateSetting("user_registration_notifications", checked)}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Sécurité */}
//         <TabsContent value="security">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Shield className="h-5 w-5" />
//                 Sécurité
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Authentification à deux facteurs</Label>
//                   <p className="text-sm text-muted-foreground">Renforcer la sécurité des comptes admin</p>
//                 </div>
//                 <Switch
//                   checked={settings.two_factor_auth}
//                   onCheckedChange={(checked) => updateSetting("two_factor_auth", checked)}
//                 />
//               </div>
              
//               <Separator />
              
//               <div className="space-y-2">
//                 <Label htmlFor="session_timeout">Délai d'expiration de session (minutes)</Label>
//                 <Input
//                   id="session_timeout"
//                   type="number"
//                   value={settings.session_timeout}
//                   onChange={(e) => updateSetting("session_timeout", parseInt(e.target.value))}
//                 />
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Complexité des mots de passe</Label>
//                   <p className="text-sm text-muted-foreground">Exiger des mots de passe forts</p>
//                 </div>
//                 <Switch
//                   checked={settings.password_complexity}
//                   onCheckedChange={(checked) => updateSetting("password_complexity", checked)}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* E-commerce */}
//         <TabsContent value="ecommerce">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Database className="h-5 w-5" />
//                 E-commerce
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="currency">Devise</Label>
//                   <Input
//                     id="currency"
//                     value={settings.currency}
//                     onChange={(e) => updateSetting("currency", e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="tax_rate">Taux de TVA (%)</Label>
//                   <Input
//                     id="tax_rate"
//                     type="number"
//                     value={settings.tax_rate}
//                     onChange={(e) => updateSetting("tax_rate", parseFloat(e.target.value))}
//                   />
//                 </div>
//               </div>
              
//               <div className="grid gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="shipping_cost">Frais de port (€)</Label>
//                   <Input
//                     id="shipping_cost"
//                     type="number"
//                     step="0.01"
//                     value={settings.shipping_cost}
//                     onChange={(e) => updateSetting("shipping_cost", parseFloat(e.target.value))}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="free_shipping_threshold">Seuil livraison gratuite (€)</Label>
//                   <Input
//                     id="free_shipping_threshold"
//                     type="number"
//                     value={settings.free_shipping_threshold}
//                     onChange={(e) => updateSetting("free_shipping_threshold", parseFloat(e.target.value))}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Apparence */}
//         <TabsContent value="appearance">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Palette className="h-5 w-5" />
//                 Apparence
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="primary_color">Couleur principale</Label>
//                 <Input
//                   id="primary_color"
//                   type="color"
//                   value={settings.primary_color}
//                   onChange={(e) => updateSetting("primary_color", e.target.value)}
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="logo_url">URL du logo</Label>
//                 <Input
//                   id="logo_url"
//                   value={settings.logo_url}
//                   onChange={(e) => updateSetting("logo_url", e.target.value)}
//                   placeholder="https://example.com/logo.png"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Intégrations */}
//         <TabsContent value="integrations">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Mail className="h-5 w-5" />
//                 Intégrations
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Stripe</Label>
//                   <p className="text-sm text-muted-foreground">Paiements par carte bancaire</p>
//                 </div>
//                 <Switch
//                   checked={settings.stripe_enabled}
//                   onCheckedChange={(checked) => updateSetting("stripe_enabled", checked)}
//                 />
//               </div>
              
//               <Separator />
              
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>PayPal</Label>
//                   <p className="text-sm text-muted-foreground">Paiements PayPal</p>
//                 </div>
//                 <Switch
//                   checked={settings.paypal_enabled}
//                   onCheckedChange={(checked) => updateSetting("paypal_enabled", checked)}
//                 />
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="space-y-0.5">
//                   <Label>Analytics</Label>
//                   <p className="text-sm text-muted-foreground">Suivi des performances</p>
//                 </div>
//                 <Switch
//                   checked={settings.analytics_enabled}
//                   onCheckedChange={(checked) => updateSetting("analytics_enabled", checked)}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// export default Parametre
