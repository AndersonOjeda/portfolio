export default function Home({ searchParams }: { searchParams: { color?: string } }) {
  // Objeto con todas las clases de color posibles que podrías usar
  const colorClasses = {
    'cyan': 'bg-cyan-300',
    'blue': 'bg-blue-400',
    'purple': 'bg-purple-500',
    'red': 'bg-red-400',
    'green': 'bg-green-400',
    'white': 'bg-white',
    'slate': 'bg-slate-400',
    'gray': 'bg-gray-400',
    'zinc': 'bg-zinc-400',
    'neutral': 'bg-neutral-400',
    'stone': 'bg-stone-400',
    'orange': 'bg-orange-400',
    'amber': 'bg-amber-400',
    'yellow': 'bg-yellow-400',
    'lime': 'bg-lime-400',
    'emerald': 'bg-emerald-400',
    'teal': 'bg-teal-400',
    'sky': 'bg-sky-400',
    'indigo': 'bg-indigo-400',
    'violet': 'bg-violet-400',
    'fuchsia': 'bg-fuchsia-400',
    'pink': 'bg-pink-400',
    'rose': 'bg-rose-400'
  };

  // Color por defecto si no se especifica o no es válido
  const defaultColor = 'white';

  // Verificar si el color recibido es válido
  const colorKey = searchParams.color && colorClasses.hasOwnProperty(searchParams.color)
    ? searchParams.color
    : defaultColor;

  // Clase de color segura
  const safeColorClass = colorClasses[colorKey as keyof typeof colorClasses] || colorClasses[defaultColor];

  return (
    <main className={`grid place-items-center w-screen h-screen ${safeColorClass}`}>
      <h1 className="text-3xl font-bold text-black">Anderson Ojeda</h1>
      <div className="grid grid-cols-5 gap-4 mt-6">
        {/* Solo mostramos algunos colores como ejemplo */}
        <a href="?color=cyan" className="w-10 h-10 rounded-full bg-cyan-300 border-2 border-black"></a>
        <a href="?color=blue" className="w-10 h-10 rounded-full bg-blue-400 border-2 border-black"></a>
        <a href="?color=purple" className="w-10 h-10 rounded-full bg-purple-500 border-2 border-black"></a>
        <a href="?color=red" className="w-10 h-10 rounded-full bg-red-400 border-2 border-black"></a>
        <a href="?color=green" className="w-10 h-10 rounded-full bg-green-400 border-2 border-black"></a>
      </div>
    </main>
  );
}