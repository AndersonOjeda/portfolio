export default function Home({ searchParams }: { searchParams: { color?: string } }) {
  const color = searchParams.color || "white"; 

  return (
    <main className={`grid place-items-center w-screen h-screen bg-${color}`}>
      <h1 className="text-3xl font-bold text-black">Anderson Ojeda</h1>
      <div className="grid grid-cols-5 gap-4 mt-6">
        <a href="?color=cyan-300" className="w-10 h-10 rounded-full bg-cyan-300 border-2 border-black"></a>
        <a href="?color=blue-400" className="w-10 h-10 rounded-full bg-blue-400 border-2 border-black"></a>
        <a href="?color=purple-500" className="w-10 h-10 rounded-full bg-purple-500 border-2 border-black"></a>
        <a href="?color=red-400" className="w-10 h-10 rounded-full bg-red-400 border-2 border-black"></a>
        <a href="?color=green-400" className="w-10 h-10 rounded-full bg-green-400 border-2 border-black"></a>
        <a href="?color=green-400" className="w-10 h-10 rounded-full bg-amber-300-400 border-2 border-black"></a>
      </div>
    </main>
  );
}
