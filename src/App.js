import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Admin/Dashboard'
import 'jquery/dist/jquery.min.js'

import moment from 'moment'
import { useTranslation } from 'react-i18next'
import Fournisseurs from './pages/CentralAchat/Fournisseurs'
import Acheteurs from './pages/CentralAchat/Acheteurs'
import DetailsProduct from './pages/CentralAchat/Products/DetailsProduct'
import DetailFournisseur from './pages/CentralAchat/Fournisseurs/DetailFournisseur'
import DetailsAcheteur from './pages/CentralAchat/Acheteurs/DetailsAcheteur'
import CentralAchat from './pages/CentralAchat'
import LayoutsCommerce from './pages/CentralAchat/LayoutsCommerce'
import Favoris from './pages/CentralAchat/Favoris'
import Cart from './pages/CentralAchat/Cart'
import LayoutOtherPage from './pages/CentralAchat/LayoutOtherPage'
import LoginShop from './pages/CentralAchat/LoginShop'
import Products from './pages/CentralAchat/Products'
import Layout from './components/Layouts/Layout'
import Product from './pages/Admin/Product'
import Categorie from './pages/Admin/Categorie'
import Commandes from './pages/Admin/Commandes'
import Ventes from './pages/Admin/Ventes'
import SousCategorie from './pages/Admin/SousCategorie'
import Clients from './pages/Admin/Clients'
import { Toaster } from './components/ui/Toaster'
import Settings from './pages/Admin/Settings'
import Profile from './pages/Admin/Profile'
import NotFoun from './pages/Error/NotFoun'
import Attribute from './pages/Admin/Attribute'
import AttributeValue from './pages/Admin/AttributeValue'
import StockProduits from './pages/Admin/StockProduits'
import FournisseurAdmin from './pages/Admin/FournisseurAdmin'
import ProtectedRoute from './routes/ProtectedRoutes'
import LinkProtected from './routes/LinkProtected'
import WizardContainer from './components/wizardForm/WizardContainer'
import Generale from './pages/Admin/Settings/Generale'

function App() {
  // useEffect(() => {
  //   Aos.init({
  //     duration: 300,
  //     easing: "ease-in-out",
  //     once: true,
  //   });
  // })
  const { i18n } = useTranslation()
  moment.locale(i18n.language)

  return (
    <React.Fragment>
      <Toaster />
      <Routes>
        <Route path='/' Component={LayoutsCommerce}>
          <Route index Component={CentralAchat} />
          <Route Component={LayoutOtherPage}>
            <Route path='*' Component={NotFoun} />
            <Route path='favoris/' Component={Favoris} />
            <Route path='mon-compte/:id' Component={LoginShop} />
            <Route path='cart/' Component={Cart} />
            <Route path='produits/'>
              <Route index Component={Products} />
              <Route path=':id' Component={DetailsProduct} />
            </Route>
            <Route path='fournisseurs/'>
              <Route index Component={Fournisseurs} />
              <Route path=':id' Component={DetailFournisseur} />
            </Route>
            <Route path='acheteurs/'>
              <Route index Component={Acheteurs} />
              <Route path=':id' Component={DetailsAcheteur} />
            </Route>
          </Route>
        </Route>
        <Route path='/wizard' Component={WizardContainer} />
        <Route element={<ProtectedRoute allowedRoles={['admin','fournisseur','acheteur']} />}>
          <Route path='/admin' element={<Layout />}>
            <Route path='tableau-de-bord' element={<Dashboard />} />
            <Route element={<LinkProtected allowedRoles={['admin','fournisseur']} />}>
              <Route path='produits'>
                <Route index element={<Product />} />
              </Route>
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin','fournisseur','acheteur']} />}>
              <Route path='profile' element={<Profile />} />
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin','fournisseur']} />}>
              <Route path='attributs/'>
                <Route index element={<Attribute />} />
                <Route path=':id/valeur' element={<AttributeValue />} />
              </Route>
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin','fournisseur']} />}>
               <Route path='stock-produits' element={<StockProduits />} />
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin']} />}>
              <Route path='categories' element={<Categorie />} />
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin','fournisseur',"acheteur"]} />}>
              <Route path='parametres/' element={<Settings />} >
                <Route path='generale' element={<Generale />} />
                <Route path='mot-de-passe' element={<SousCategorie />} />
                <Route path='email' element={<SousCategorie />} />
                {/* <Route path='generale' element={<SousCategorie />} /> */}
                {/* <Route path='generale' element={<SousCategorie />} /> */}
              </Route>
            </Route>
            <Route element={<LinkProtected allowedRoles={['fournisseur']} />}>
              <Route path='sous-categories' element={<SousCategorie />} />
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin',"acheteur"]} />}>
              <Route path='commandes' element={<Commandes />} />
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin','fournisseur']} />}>
              <Route path='ventes' element={<Ventes />} />
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin','fournisseur']} />}>
              <Route path='acheteurs' element={<Clients />} />
            </Route>
            <Route element={<LinkProtected allowedRoles={['admin']} />}>
              <Route path='fournisseurs' element={<FournisseurAdmin />} />
            </Route>
            <Route path='*' Component={NotFoun} />
            {/* <Route path="activities" element={<Activities />} /> */}
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  )
}

export default App
