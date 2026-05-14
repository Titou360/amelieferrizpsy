import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  _singleton: { type: String, default: 'main', unique: true },
  address: {
    street:     { type: String, default: '19 rue de Londres' },
    city:       { type: String, default: 'Narbonne' },
    postalCode: { type: String, default: '11100' },
  },
  phone:          { type: String, default: '' },
  email:          { type: String, default: 'contact@amelieferriz.fr' },
  openingHours: {
    type: [
      {
        day:    { type: String }, // 'Lundi', 'Mardi'…
        open:   { type: String }, // '09:00'
        close:  { type: String }, // '19:00'
        closed: { type: Boolean, default: false },
      }
    ],
    default: [
      { day: 'Lundi',    open: '09:00', close: '19:00', closed: false },
      { day: 'Mardi',    open: '09:00', close: '19:00', closed: false },
      { day: 'Mercredi', open: '09:00', close: '19:00', closed: false },
      { day: 'Jeudi',    open: '09:00', close: '19:00', closed: false },
      { day: 'Vendredi', open: '09:00', close: '19:00', closed: false },
      { day: 'Samedi',   open: '09:00', close: '13:00', closed: false },
      { day: 'Dimanche', open: '',      close: '',       closed: true  },
    ],
  },
}, { timestamps: true })

export default mongoose.model('Settings', settingsSchema)
