import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { motion } from 'framer-motion'
import { MapPin, Clock, Car } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default marker icon in Vite
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const CABINET_POSITION: [number, number] = [43.1844, 3.0032] // Narbonne coords approx — à ajuster

export default function MapSection() {
  return (
    <section className="relative">
      {/* Info + Map layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        {/* Info side */}
        <div className="bg-navy flex flex-col justify-center px-10 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-sans text-orange uppercase tracking-[0.3em]">
              Le cabinet
            </span>
            <h2 className="font-serif text-4xl text-cream font-light mt-3 mb-10">
              Nous trouver
            </h2>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-orange/20 flex items-center justify-center mt-0.5">
                  <MapPin size={18} className="text-orange" />
                </div>
                <div>
                  <p className="text-xs font-sans text-cream/40 uppercase tracking-widest mb-1">Adresse</p>
                  <p className="font-sans text-cream/80 leading-relaxed">
                    19 rue de Londres<br />
                    11100 Narbonne, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-orange/20 flex items-center justify-center mt-0.5">
                  <Clock size={18} className="text-orange" />
                </div>
                <div>
                  <p className="text-xs font-sans text-cream/40 uppercase tracking-widest mb-1">Horaires</p>
                  <p className="font-sans text-cream/80 leading-relaxed">
                    Lundi – Vendredi : 9h – 19h<br />
                    Samedi : sur rendez-vous
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-orange/20 flex items-center justify-center mt-0.5">
                  <Car size={18} className="text-orange" />
                </div>
                <div>
                  <p className="text-xs font-sans text-cream/40 uppercase tracking-widest mb-1">Accès</p>
                  <p className="font-sans text-cream/80 leading-relaxed">
                    Parking à proximité<br />
                    Accessible en transports en commun
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=19+rue+de+Londres+11100+Narbonne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 btn-primary text-xs tracking-widest uppercase px-8 py-3"
            >
              Ouvrir dans Google Maps
            </a>
          </motion.div>
        </div>

        {/* Map side */}
        <div className="min-h-[400px] lg:min-h-full relative z-10">
          <MapContainer
            center={CABINET_POSITION}
            zoom={16}
            className="w-full h-full min-h-[400px]"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={CABINET_POSITION} icon={markerIcon}>
              <Popup>
                <strong>Amélie Ferriz — Psychanalyste</strong><br />
                19 rue de Londres<br />
                11100 Narbonne
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  )
}
