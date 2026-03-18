export default function NewArrivalsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-serif mb-6">New Arrivals</h1>
      <p className="text-lg mb-4">Discover the latest additions to our luxury collection.</p>
      <div className="bg-neutral-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <ul className="list-disc list-inside text-neutral-300">
          <li>Fresh designer pieces</li>
          <li>Seasonal exclusives</li>
          <li>Limited edition releases</li>
        </ul>
      </div>
    </main>
  );
}
