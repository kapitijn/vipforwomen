export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-serif mb-6">Contact Us</h1>
      <p className="text-lg mb-4">We're here to help! Reach out for any questions or support.</p>
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <form className="flex flex-col gap-4">
          <input className="bg-neutral-800 p-3 rounded text-white" type="text" placeholder="Your Name" required />
          <input className="bg-neutral-800 p-3 rounded text-white" type="email" placeholder="Your Email" required />
          <textarea className="bg-neutral-800 p-3 rounded text-white" placeholder="Your Message" rows={4} required />
          <button className="bg-luxury-silver text-black py-2 rounded font-semibold hover:bg-white transition">Send Message</button>
        </form>
      </div>
    </main>
  );
}
