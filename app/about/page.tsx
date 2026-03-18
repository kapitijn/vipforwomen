export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-serif mb-6">About forvipwomen</h1>
      <p className="text-lg max-w-2xl mb-4 text-center">forvipwomen is dedicated to curating luxury fashion and accessories for the modern woman. Our mission is to deliver elegance, exclusivity, and premium service with every collection.</p>
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <ul className="list-disc list-inside text-neutral-300">
          <li>Exclusive designer brands</li>
          <li>Signature collections</li>
          <li>Personalized shopping experience</li>
          <li>Fast, secure delivery</li>
        </ul>
      </div>
    </main>
  );
}
