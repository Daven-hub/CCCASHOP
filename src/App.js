import './App.css'
import { Route, Routes } from 'react-router-dom'

import CccaRevueAdmin from './pages/Admin/CccaRevue'
import Dashboard from './pages/Admin/Dashboard'
// import Activities from './pages/Admin/Other/Activities';
import News from './pages/Admin/Actualite'
import PresentationAdmin from './pages/Admin/PresentationAdmin'
import 'jquery/dist/jquery.min.js'

import moment from 'moment'
import { useTranslation } from 'react-i18next'
// import Products from './pages/CentralAchat/Products';
import Fournisseurs from './pages/CentralAchat/Fournisseurs'
import Acheteurs from './pages/CentralAchat/Acheteurs'
import Enregistrement from './pages/CentralAchat/Enregistrement'
import DetailsProduct from './pages/CentralAchat/DetailsProduct'
import DetailFournisseur from './pages/CentralAchat/DetailFournisseur'
import DetailsAcheteur from './pages/CentralAchat/DetailsAcheteur'
import TypeEnregistrement from './pages/CentralAchat/TypeEnregistrement'
import Commerce from './pages/CentralAchat/commerce'
import LayoutsCommerce from './pages/CentralAchat/commerce/LayoutsCommerce'
import Favoris from './pages/CentralAchat/commerce/Favoris'
import Cart from './pages/CentralAchat/commerce/Cart'
import LayoutOtherPage from './pages/CentralAchat/commerce/LayoutOtherPage'
import LoginShop from './pages/CentralAchat/commerce/LoginShop'
import ProductShop from './pages/CentralAchat/commerce/ProductShop'
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
import { useAuth } from './context/authContext'
import Attribute from './pages/Admin/Attribute'
import AttributeValue from './pages/Admin/AttributeValue'
import StockProduits from './pages/Admin/StockProduits'
import FournisseurAdmin from './pages/Admin/FournisseurAdmin'
import ProtectedRoute from './routes/ProtectedRoutes'

function App() {
  // useEffect(() => {
  //   Aos.init({
  //     duration: 300,
  //     easing: "ease-in-out",
  //     once: true,
  //   });
  // })
  // const { usershop,token } = useSelector(
  //   (state) => state.auth
  // );
  const { i18n } = useTranslation()
  moment.locale(i18n.language)

  // const withSuspense = (Component) => {
  //   return (props) => (
  //     <Suspense fallback={<Loader />}>
  //       <Component {...props} />
  //     </Suspense>
  //   );
  // };

  const { userConnected } = useAuth()

  return (
    // <Suspense fallback={<Loader />}>
    <>
      <Toaster />
      <Routes>
        <Route path='/' Component={LayoutsCommerce}>
          <Route index Component={Commerce} />
          <Route Component={LayoutOtherPage}>
            <Route path='*' Component={NotFoun} />
            <Route path='favoris/' Component={Favoris} />
            <Route path='mon-compte/:id' Component={LoginShop} />
            <Route path='enregistrement/'>
              <Route index Component={Enregistrement} />
              <Route path=':id' Component={TypeEnregistrement} />
            </Route>
            <Route path='cart/' Component={Cart} />
            <Route path='produits/'>
              <Route index Component={ProductShop} />
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
        <Route element={<ProtectedRoute allowedRoles={['admin','fournisseur','acheteur']} />}>
          <Route path='/admin' element={<Layout />}>
            <Route path='tableau-de-bord' element={<Dashboard />} />
            <Route path='produits'>
              <Route index element={<Product />} />
            </Route>
            <Route path='profile' element={<Profile />} />
            <Route path='attributs/'>
              <Route index element={<Attribute />} />
              <Route path='value/:id' element={<AttributeValue />} />
            </Route>
            <Route path='stock-produits' element={<StockProduits />} />
            <Route path='categories' element={<Categorie />} />
            <Route path='parametres' element={<Settings />} />
            <Route path='sous-categories' element={<SousCategorie />} />
            <Route path='commandes' element={<Commandes />} />
            <Route path='ventes' element={<Ventes />} />
            <Route path='acheteurs' element={<Clients />} />
            <Route path='fournisseurs' element={<FournisseurAdmin />} />
            <Route path='ccca-revue' element={<CccaRevueAdmin />} />
            <Route path='news' element={<News />} />
            <Route path='*' Component={NotFoun} />
            {/* <Route path="activities" element={<Activities />} /> */}
            <Route path='à-propos'>
              <Route path='presentation' element={<PresentationAdmin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
    // </Suspense>
  )
}

export default App
