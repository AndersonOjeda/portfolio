export default function Home({ searchParams }: { searchParams: { color?: string } }) {
  const color = searchParams.color || "white";

  // Mapeo de colores a clases completas
  const colorClasses = {
    "cyan-300": "bg-cyan-300",
    "blue-400": "bg-blue-400",
    "purple-500": "bg-purple-500",
    "red-400": "bg-red-400",
    "green-400": "bg-green-400",
    "white": "bg-white"
  };

  const bgClass = colorClasses[color as keyof typeof colorClasses] || "bg-white";

  return (
    <main className={`grid place-items-center w-screen h-screen ${bgClass}`}>
      <h1 className="text-3xl font-bold text-black">Anderson Ojeda</h1>
      <div className="grid grid-cols-5 gap-4 mt-6">
        <a href="?color=cyan-300" className="w-10 h-10 rounded-full bg-cyan-300 border-2 border-black"></a>
        <a href="?color=blue-400" className="w-10 h-10 rounded-full bg-blue-400 border-2 border-black"></a>
        <a href="?color=purple-500" className="w-10 h-10 rounded-full bg-purple-500 border-2 border-black"></a>
        <a href="?color=red-400" className="w-10 h-10 rounded-full bg-red-400 border-2 border-black"></a>
        <a href="?color=green-400" className="w-10 h-10 rounded-full bg-green-400 border-2 border-black"></a>
      </div>
    </main>
  );
}