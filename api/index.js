// Point d'entrée de l'API en fonction serverless Vercel.
// L'app Express gère elle-même tout le routage /api/* (le rewrite Vercel
// "/api/(.*)" -> "/api" préserve le chemin complet).
import app from '../backend/src/app.js'

export default app
