export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-serif mb-4 text-center">Contact forvipwomen</h1>
        <p className="text-lg mb-10 text-center">We'd love to hear from you! Please use the form or contact details below.</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div className="bg-neutral-900 p-8 rounded-lg shadow-lg flex flex-col gap-6 justify-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Our Location</h2>
              <p className="mb-2">Mahonylaan 61 Unit 7, Paramaribo, Suriname</p>
              <div className="w-full h-56 rounded overflow-hidden mb-4">
                <iframe
                  title="Google Maps - Mahonylaan 61 Unit 7"
                  src="https://www.google.com/maps?q=Mahonylaan+61+Unit+7,+Paramaribo,+Suriname&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">WhatsApp</h2>
              <p className="mb-1">
                <a href="https://wa.me/5978795009" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:underline">879-5009 (Ringweg-Zuid)</a>
              </p>
              <p>
                <a href="https://wa.me/5978902750" target="_blank" rel="noopener noreferrer" className="text-luxury-silver hover:underline">890-2750 (Mahonylaan 61 Unit 17)</a>
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Email</h2>
              <p className="mb-1">
                <a href="mailto:info@forvipwomen.com" className="text-luxury-silver hover:underline">info@forvipwomen.com</a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-900 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form className="flex flex-col gap-4">
              <input className="bg-neutral-800 p-3 rounded text-white" type="text" placeholder="Your Name" required />
              <input className="bg-neutral-800 p-3 rounded text-white" type="email" placeholder="Your Email" required />
              <textarea className="bg-neutral-800 p-3 rounded text-white" placeholder="Your Message" rows={4} required />
              <button className="bg-luxury-silver text-black py-2 rounded font-semibold hover:bg-white transition">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
