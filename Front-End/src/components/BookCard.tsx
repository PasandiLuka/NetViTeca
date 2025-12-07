interface BookCardProps {
    image: string
    title: string
    author: string
    description: string
    onClick?: () => void
}

export default function BookCard({ image, title, author, description, onClick }: BookCardProps) {
    return (
        <div
            onClick={onClick}
            className="
        group cursor-pointer overflow-hidden
        bg-black/40 border border-white/10 rounded-xl 
        shadow-[0_0_15px_rgba(0,200,255,0.15)]
        hover:shadow-[0_0_35px_rgba(0,200,255,0.35)]
        backdrop-blur-lg transition-all duration-300
        hover:-translate-y-1 hover:border-cyan-400/50
      "
        >

            {/* Imagen */}
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover 
          group-hover:scale-105 transition-all duration-500"
                />

                {/* Sombra suave en la base para legibilidad */}
                <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Información */}
            <div className="p-4 flex flex-col gap-2 text-white">

                <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition">
                    {title.length > 42 ? title.slice(0, 42) + "..." : title}
                </h3>

                <p className="text-sm text-cyan-300 opacity-80">
                    {author}
                </p>

                <p className="text-sm text-gray-300 line-clamp-2">
                    {description}
                </p>

            </div>
        </div>
    )
}
