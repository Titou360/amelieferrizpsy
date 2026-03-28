/**
 * Script pour générer le hash du mot de passe administrateur.
 * Usage : node setup-password.js
 *
 * Copiez le hash généré dans votre .env sous ADMIN_PASSWORD_HASH
 */
import bcrypt from 'bcryptjs'
import readline from 'readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('🔐 Choisissez un mot de passe administrateur : ', async (password) => {
  if (password.length < 12) {
    console.error('❌ Le mot de passe doit faire au moins 12 caractères.')
    process.exit(1)
  }

  const hash = await bcrypt.hash(password, 12)
  console.log('\n✅ Hash généré. Ajoutez cette ligne dans votre .env :\n')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  console.log('\n⚠️  Ne partagez jamais ce hash ni votre mot de passe.')
  rl.close()
})
