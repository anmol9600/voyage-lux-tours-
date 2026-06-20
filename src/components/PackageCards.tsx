import { Package } from '../types';
import { MapPin, Clock, Star, Phone, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface PackageCardProps {
  pkg: Package;
  onBook: () => void;
  onViewDetails: () => void;
}

export function PackageCard({ pkg, onBook, onViewDetails }: PackageCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative flex flex-col rounded-2xl bg-white/5 shadow-xl ring-1 ring-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:shadow-cyan-500/20 hover:ring-cyan-500/50"
    >
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent z-10" />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={pkg.image}
          alt={pkg.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-white text-sm font-medium">{pkg.rating}</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 z-20 -mt-10">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/5 mb-4">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{pkg.title}</h3>
          <div className="flex items-center gap-4 text-sm text-cyan-100/70">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{pkg.destination}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{pkg.duration}</span>
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-6 line-clamp-2 pb-4 border-b border-white/10">
          {pkg.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Starting from</p>
            <p className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">{pkg.price}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onViewDetails}
              className="px-4 py-2 text-sm font-medium text-white hover:text-cyan-400 transition-colors"
            >
              Details
            </button>
            <button
              onClick={onBook}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg hover:shadow-cyan-500/25"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function PackageModal({ pkg, isOpen, onClose, onBook }: { pkg: Package | null; isOpen: boolean; onClose: () => void; onBook: () => void; }) {
  if (!pkg) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[800px] md:max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            <div className="relative h-64 shrink-0">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-semibold backdrop-blur-md">
                      {pkg.destination}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {pkg.duration}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{pkg.title}</h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-cyan-400">{pkg.price}</p>
                  <p className="text-xs text-slate-300">per person</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-400" /> Inclusions
                  </h3>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-red-400 font-bold">✕</span> Exclusions
                  </h3>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">Daily Itinerary</h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                  {pkg.itinerary.map((day, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-slate-900 bg-cyan-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-slate-800/50 border border-slate-700 p-4 rounded-xl shadow-sm">
                        <div className="font-bold text-cyan-400 mb-1 text-sm">{day.day}</div>
                        <div className="text-slate-300 text-sm leading-relaxed">{day.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-900 shrink-0 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="w-8 h-8 rounded-full border-2 border-slate-900" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  ))}
                </div>
                <p className="text-xs text-slate-400">Join <span className="text-white font-medium">{pkg.reviews}</span> others who booked this.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <a href="#contact" onClick={onClose} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition-colors font-medium">
                  <Phone className="w-4 h-4" /> Call
                </a>
                <button onClick={() => { onClose(); onBook(); }} className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all active:scale-95">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
