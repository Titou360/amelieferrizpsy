import { useEffect, useState } from 'react'
import { Loader2, Save } from 'lucide-react'
import api from '../../lib/api'
import { useToast } from '../../components/ui/ToastProvider'

interface Hour {
  day: string
  open: string
  close: string
  closed: boolean
}

interface SettingsForm {
  address: { street: string; city: string; postalCode: string }
  phone: string
  email: string
  openingHours: Hour[]
}

const DEFAULT: SettingsForm = {
  address: { street: '19 rue de Londres', city: 'Narbonne', postalCode: '11100' },
  phone: '',
  email: 'contact@amelieferriz.fr',
  openingHours: [
    { day: 'Lundi',    open: '09:00', close: '19:00', closed: false },
    { day: 'Mardi',    open: '09:00', close: '19:00', closed: false },
    { day: 'Mercredi', open: '09:00', close: '19:00', closed: false },
    { day: 'Jeudi',    open: '09:00', close: '19:00', closed: false },
    { day: 'Vendredi', open: '09:00', close: '19:00', closed: false },
    { day: 'Samedi',   open: '09:00', close: '13:00', closed: false },
    { day: 'Dimanche', open: '',      close: '',       closed: true  },
  ],
}

export default function SettingsManager() {
  const [form, setForm] = useState<SettingsForm>(DEFAULT)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    api.get('/settings')
      .then((res) => {
        const s = res.data
        setForm({
          address: s.address ?? DEFAULT.address,
          phone: s.phone ?? '',
          email: s.email ?? '',
          openingHours: s.openingHours ?? DEFAULT.openingHours,
        })
      })
      .catch(() => toast({ type: 'error', title: 'Erreur de chargement' }))
      .finally(() => setLoading(false))
  }, [])

  const setHour = (i: number, field: keyof Hour, value: string | boolean) => {
    setForm((f) => {
      const hours = f.openingHours.map((h, idx) =>
        idx === i ? { ...h, [field]: value } : h
      )
      return { ...f, openingHours: hours }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/settings', form)
      toast({ type: 'success', title: 'Paramètres enregistrés' })
    } catch {
      toast({ type: 'error', title: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 size={24} className="animate-spin text-navy/30" />
    </div>
  )

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-navy">Paramètres</h1>
          <p className="font-sans text-sm text-navy/50 mt-1">
            Informations pratiques affichées sur le site.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary text-xs tracking-widest uppercase px-6 py-2.5 flex items-center gap-2"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          Enregistrer
        </button>
      </div>

      {/* Coordonnées */}
      <div className="bg-white border border-navy/8 p-6 space-y-4">
        <h2 className="font-sans text-xs text-navy/40 uppercase tracking-widest border-b border-navy/8 pb-3">
          Coordonnées du cabinet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="label-xs">Adresse</label>
            <input
              value={form.address.street}
              onChange={(e) => setForm((f) => ({ ...f, address: { ...f.address, street: e.target.value } }))}
              className="input"
              placeholder="Rue…"
            />
          </div>
          <div>
            <label className="label-xs">Code postal</label>
            <input
              value={form.address.postalCode}
              onChange={(e) => setForm((f) => ({ ...f, address: { ...f.address, postalCode: e.target.value } }))}
              className="input"
              placeholder="11100"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-xs">Ville</label>
            <input
              value={form.address.city}
              onChange={(e) => setForm((f) => ({ ...f, address: { ...f.address, city: e.target.value } }))}
              className="input"
              placeholder="Narbonne"
            />
          </div>
          <div>
            <label className="label-xs">Téléphone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="input"
              placeholder="+33 6 00 00 00 00"
            />
          </div>
        </div>
        <div>
          <label className="label-xs">Email de contact</label>
          <input
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="input"
            placeholder="contact@amelieferriz.fr"
          />
        </div>
      </div>

      {/* Horaires */}
      <div className="bg-white border border-navy/8 p-6">
        <h2 className="font-sans text-xs text-navy/40 uppercase tracking-widest border-b border-navy/8 pb-3 mb-5">
          Horaires d'ouverture
        </h2>
        <div className="space-y-3">
          {form.openingHours.map((h, i) => (
            <div key={h.day} className="grid grid-cols-[80px_1fr] items-center gap-3">
              <span className="text-sm font-sans text-navy/70 font-medium">{h.day}</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={h.closed}
                    onChange={(e) => setHour(i, 'closed', e.target.checked)}
                    className="accent-orange"
                  />
                  <span className="text-xs font-sans text-navy/50">Fermé</span>
                </label>
                {!h.closed && (
                  <>
                    <input
                      type="time"
                      value={h.open}
                      onChange={(e) => setHour(i, 'open', e.target.value)}
                      className="input py-1.5 text-sm w-28"
                    />
                    <span className="text-navy/30 text-sm">→</span>
                    <input
                      type="time"
                      value={h.close}
                      onChange={(e) => setHour(i, 'close', e.target.value)}
                      className="input py-1.5 text-sm w-28"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
