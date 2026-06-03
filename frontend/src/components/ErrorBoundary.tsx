import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Contenu de secours affiché si une erreur survient (optionnel). */
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Capture les erreurs de rendu des composants enfants pour éviter que toute
 * l'application ne disparaisse (écran blanc). Affiche un message de secours
 * à la place de la partie fautive.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Visible dans la console pour le diagnostic ; ne casse pas l'UI.
    console.error('ErrorBoundary a intercepté une erreur :', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) return this.props.fallback
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6 text-center">
          <h1 className="font-serif text-3xl text-navy font-light mb-4">
            Une erreur est survenue
          </h1>
          <p className="font-sans text-navy/60 mb-8 max-w-md">
            Le contenu n'a pas pu s'afficher correctement. Vous pouvez recharger
            la page pour réessayer.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary px-8 py-3 text-sm tracking-widest uppercase"
          >
            Recharger la page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
