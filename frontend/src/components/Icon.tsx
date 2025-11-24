import type { Champion } from "../types/Data";

function Icon({ champion, handleSelect, isActive }: { champion: Champion; handleSelect: (champion: Champion) => void; isActive: boolean }) {
    if (!isActive) return (
        <li key={champion.name} className="m-auto opacity-40 pointer-events-none cursor-not-allowed">
            <img src={champion.url} alt={champion.name} className="w-28 h-28 object-cover object-top" />
            <p className="text-xl text-center">{champion.name}</p>
        </li>
    )


    return (
        <li key={champion.name} className="m-auto"
            onClick={() => handleSelect(champion)}
        >
            <img src={champion.url} alt={champion.name} className="w-28 h-28 object-cover object-top hover:cursor-pointer hover:brightness-120 hover:scale-101 transition-transform duration-75" />
            <p className="text-xl text-center">{champion.name}</p>
        </li>
    );
}

export default Icon;