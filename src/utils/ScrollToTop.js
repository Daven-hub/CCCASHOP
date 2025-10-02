// ScrollToTop.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "../pages/Layouts";
import $ from "jquery"

const ScrollToTop = () => {
  const { pathname } = useLocation();
  // const timeoutRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
 
 
  useEffect(() => {
    $(".mobiles").removeClass("absolute");
    $(".navsbar").removeClass("active");
    $(".openm").removeClass("unshow");
    $(".closem").removeClass("show");
    $(".openm").addClass("show");
    $(".closem").addClass("unshow");
   
 
    // setIsLoading(true); 
    // const timeout= setTimeout(() => setIsLoading(false), 2100);
    // const handleStope= async ()=>{ 
    //   await clearTimeout(timeout);
    //   // clearTimeout(timeout1); 
    //    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    // }
    // return () => handleStope();
    // setIsLoading(true);

    // // Démarre le timeout pour cacher le loader après 2.1s
    // timeoutRef.current = setTimeout(() => {
    //   setIsLoading(false);
    // }, 2100);

    // // Fonction de nettoyage exécutée avant le prochain changement de route
    // return () => {
    //   if (timeoutRef.current) {
    //     clearTimeout(timeoutRef.current);
    //   }
    //   // Remonte immédiatement la page
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // };
  }, [pathname]);

  if (isLoading) {
    return <Loader />;
  }

  return null;
};

export default ScrollToTop;
