"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectuser } from "@/Feature/Userslice";
import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

//  Language setup
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

const Navbar = () => {
  const user = useSelector(selectuser);
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlelogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });

      toast.success(" Logged in successfully!");
    } catch (error) {
      console.error(error);
      toast.error(" Login failed");
    }
  };

  const handlelogout = () => {
    signOut(auth);
    toast.info(" Logged out successfully");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* logo */}
            <div className="flex items-center space-x-2">
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-12 w-auto hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>

            {/* desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 font-medium">
              {["internship", "job", "resume-generator", "PublicSpace"].map(
                (path, idx) => (
                  <Link
                    key={idx}
                    href={`/${path}`}
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
                  >
                    {t(
                      ["internships", "jobs", "resume", "public_space"][idx]
                    )}
                  </Link>
                )
              )}

              {/* search bar */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 hover:shadow-md transition-all duration-200">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  className="ml-2 bg-transparent focus:outline-none text-sm w-48 text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>

            {/* right side */}
            <div className="hidden md:flex items-center space-x-4"> 
              <select
                onChange={handleLanguageChange}
                className="bg-blue-50 text-gray-700 border border-gray-300 px-2 py-1 rounded-lg text-sm hover:bg-blue-100"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="es">ES</option>
                <option value="pt">PT</option>
                <option value="zh">ZH</option>
                <option value="fr">FR</option>
              </select>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Link href="/profile">
                    <img
                      src={user.photo}
                      alt="User"
                      className="w-9 h-9 rounded-full border border-gray-300"
                    />
                  </Link>
                  <button
                    onClick={handlelogout}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    {t("logout")}
                  </button>
                </div>
              ) : (
                <>
                  {/*google Button */}
                  <button
                    onClick={handlelogin}
                    className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700 font-medium">
                      {t("login_google")}
                    </span>
                  </button>

                  <Link
                    href="/adminlogin"
                    className="text-gray-600 hover:text-blue-600 font-medium"
                  >
                    {t("admin")}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center space-x-2">
              <select
                onChange={handleLanguageChange}
                className="bg-blue-50 text-gray-700 border border-gray-300 px-2 py-1 rounded-lg text-sm hover:bg-blue-100"
              >
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="es">ES</option>
                <option value="pt">PT</option>
                <option value="zh">ZH</option>
                <option value="fr">FR</option>
              </select>
              <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/*  Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white shadow-lg border-t border-gray-200 animate-slide-down">
              <div className="px-4 py-4 space-y-4">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <Search size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("search_placeholder")}
                    className="ml-2 bg-transparent focus:outline-none text-sm w-full text-gray-700"
                  />
                </div>

                {["internship", "job", "resume-generator", "PublicSpace"].map(
                  (path, idx) => (
                    <Link
                      key={idx}
                      href={`/${path}`}
                      className="block text-gray-700 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      {t(
                        ["internships", "jobs", "resume", "public_space"][idx]
                      )}
                    </Link>
                  )
                )}

                {user ? (
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.photo}
                      alt="User"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <button
                      onClick={() => {
                        handlelogout();
                        toggleMenu();
                      }}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 w-full"
                    >
                      {t("logout")}
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        handlelogin();
                        toggleMenu();
                      }}
                      className="w-full flex items-center justify-center space-x-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                      />
                      <span className="text-gray-700 font-medium">
                        {t("login_google")}
                      </span>
                    </button>
                    <Link
                      href="/adminlogin"
                      className="block text-gray-600 hover:text-blue-600"
                      onClick={toggleMenu}
                    >
                      {t("admin")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
