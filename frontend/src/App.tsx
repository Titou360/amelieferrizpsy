import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import * as CookieConsent from 'vanilla-cookieconsent'
import { ToastProvider } from './components/ui/ToastProvider'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import TherapyPage from './pages/TherapyPage'
import ArticlePage from './pages/ArticlePage'
import LegalPage from './pages/LegalPage'

export default function App() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom right',
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          equalWeightButtons: false,
          flipButtons: false,
        },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
      },
      language: {
        default: 'fr',
        translations: {
          fr: {
            consentModal: {
              title: 'Nous respectons votre vie privée',
              description:
                'Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez choisir quels cookies autoriser.',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Refuser',
              showPreferencesBtn: 'Préférences',
            },
            preferencesModal: {
              title: 'Préférences en matière de cookies',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              savePreferencesBtn: 'Enregistrer',
              closeIconLabel: 'Fermer',
              sections: [
                {
                  title: 'Cookies nécessaires',
                  description: 'Ces cookies sont indispensables au fonctionnement du site.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Cookies analytiques',
                  description: 'Ces cookies nous permettent d\'analyser l\'utilisation du site afin d\'en améliorer les performances.',
                  linkedCategory: 'analytics',
                },
              ],
            },
          },
        },
      },
    })
  }, [])

  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/therapie/:slug" element={<TherapyPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/mentions-legales" element={<LegalPage type="mentions" />} />
            <Route path="/politique-cookies" element={<LegalPage type="cookies" />} />
            <Route path="/politique-confidentialite" element={<LegalPage type="confidentialite" />} />
            <Route path="/conditions-utilisation" element={<LegalPage type="conditions" />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
