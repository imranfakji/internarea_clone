"use client";
import React, { useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// ✅ i18n initialization (all languages in one place)
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: {
        title: "Welcome to Our Website",
        description: "Explore jobs, internships, and more.",
        select_language: "Select Language",
      }},
      hi: { translation: {
        title: "हमारी वेबसाइट में आपका स्वागत है",
        description: "नौकरियां, इंटर्नशिप और अधिक खोजें।",
        select_language: "भाषा चुनें",
      }},
      es: { translation: {
        title: "Bienvenido a Nuestro Sitio Web",
        description: "Explora empleos, pasantías y más.",
        select_language: "Seleccionar idioma",
      }},
      pt: { translation: {
        title: "Bem-vindo ao Nosso Site",
        description: "Explore empregos, estágios e muito mais.",
        select_language: "Selecionar idioma",
      }},
      zh: { translation: {
        title: "欢迎来到我们的网站",
        description: "探索工作、实习等更多内容。",
        select_language: "选择语言",
      }},
      fr: { translation: {
        title: "Bienvenue sur Notre Site Web",
        description: "Explorez des emplois, des stages et plus encore.",
        select_language: "Choisir la langue",
      }},
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default function LanguageTranslation() {
  const { t } = useTranslation();
  const [lang, setLang] = useState("en");

  const handleChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{t("title")}</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "30px", maxWidth: "600px" }}>
        {t("description")}
      </p>

      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          padding: "15px 25px",
          borderRadius: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <label htmlFor="language" style={{ fontWeight: "bold", marginRight: "10px" }}>
          {t("select_language")}:
        </label>
        <select
          id="language"
          value={lang}
          onChange={handleChange}
          style={{
            background: "white",
            color: "#333",
            borderRadius: "8px",
            border: "none",
            padding: "8px 12px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="pt">Portuguese</option>
          <option value="zh">Chinese</option>
          <option value="fr">French</option>
        </select>
      </div>
    </div>
  );
}
