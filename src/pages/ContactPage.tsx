import React, { useState } from "react";
import { DEALER_CONFIG } from "../config/dealerConfig";
import { THEME_CONFIG } from "../config/theme";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2 block">
            Visit Our Showroom in Nanded
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Get in Touch with {THEME_CONFIG.dealerName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Have questions about an available car or want to evaluate your old car? Call us or visit our showroom on Maltekdi Road.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Showroom Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white">Showroom Details</h3>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-600/20 text-rose-500 rounded-2xl shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-300">Address</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{DEALER_CONFIG.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 text-amber-500 rounded-2xl shrink-0 mt-0.5">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-300">Direct Contact Numbers</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <a href={`tel:${DEALER_CONFIG.phone}`} className="hover:text-white font-medium block">
                      {DEALER_CONFIG.phone}
                    </a>
                    <a href={`tel:${DEALER_CONFIG.alternatePhone}`} className="hover:text-white font-medium block">
                      {DEALER_CONFIG.alternatePhone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-2xl shrink-0 mt-0.5">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-300">Showroom Timings</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{DEALER_CONFIG.openingHours}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href={`https://wa.me/${DEALER_CONFIG.whatsappNumber}?text=Hello%20Patil%20Dealers,%20I%20have%20an%20enquiry.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare size={16} />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Google Maps link preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center">
              <span className="text-xs text-slate-400 block mb-2">Located near Shivaji Statue, Maltekdi Road, Nanded</span>
              <a
                href={DEALER_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition"
              >
                <MapPin size={14} className="text-rose-500" />
                <span>Navigate with Google Maps</span>
              </a>
            </div>
          </div>

          {/* Contact / Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-white mb-2">Send Showroom Enquiry</h3>
            <p className="text-xs text-slate-400 mb-6">
              Leave your name and number; our car advisor will call you with vehicle specs and financing details.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
                <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Thank you, {name}!</h4>
                <p className="text-xs text-slate-300">
                  Your enquiry has reached Patil Dealers Nanded. We will reach out to {phone} within working hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-rose-400 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Kadam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98234 56789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Which car or service are you interested in?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. I am looking for a 2021+ Diesel SUV around ₹12 Lakhs with low mileage..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-950 transition cursor-pointer"
                >
                  <Send size={15} />
                  <span>Submit Showroom Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
