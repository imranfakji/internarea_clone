import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Fotter";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { auth } from "@/firebase/firebase";
import { login, logout } from "@/Feature/Userslice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🟢 i18n imports
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// 🌍 Language setup for all pages
i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        internships: "Internships",
        jobs: "Jobs",
        resume: "Resume Generator",
        public_space: "Public Space",
        search_placeholder: "Search opportunities...",
        logout: "Logout",
        login_google: "Continue with Google",
        admin: "Admin",
      },
    },
    hi: {
      translation: {
        internships: "इंटर्नशिप",
        jobs: "नौकरियां",
        resume: "रिज़्यूमे जनरेटर",
        public_space: "सार्वजनिक स्थान",
        search_placeholder: "अवसर खोजें...",
        logout: "लॉगआउट",
        login_google: "गूगल से जारी रखें",
        admin: "प्रशासक",
      },
    },
    es: {
      translation: {
        internships: "Pasantías",
        jobs: "Trabajos",
        resume: "Generador de CV",
        public_space: "Espacio Público",
        search_placeholder: "Buscar oportunidades...",
        logout: "Cerrar sesión",
        login_google: "Continuar con Google",
        admin: "Administrador",
      },
    },
    pt: {
      translation: {
        internships: "Estágios",
        jobs: "Empregos",
        resume: "Gerador de Currículo",
        public_space: "Espaço Público",
        search_placeholder: "Procurar oportunidades...",
        logout: "Sair",
        login_google: "Continuar com Google",
        admin: "Administrador",
      },
    },
    zh: {
      translation: {
        internships: "实习",
        jobs: "工作",
        resume: "简历生成器",
        public_space: "公共空间",
        search_placeholder: "搜索机会...",
        logout: "登出",
        login_google: "用谷歌继续",
        admin: "管理员",
      },
    },
    fr: {
      translation: {
        internships: "Stages",
        jobs: "Emplois",
        resume: "Générateur de CV",
        public_space: "Espace Public",
        search_placeholder: "Rechercher des opportunités...",
        logout: "Se déconnecter",
        login_google: "Continuer avec Google",
        admin: "Administrateur",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            name: authUser.displayName,
            email: authUser.email,
            phoneNumber: authUser.phoneNumber,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthListener />
      <div className="bg-white min-h-screen flex flex-col">
        <ToastContainer />
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
