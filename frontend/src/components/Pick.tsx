import type { Champion } from "../types/Data";

function Pick({ champion, isActive }: { champion: Champion | null, isActive: boolean }) {
    return (
        <div className={`m-auto border-2 border-transparent ${isActive ? 'border-2 rounded border-white animate-pulse transition-all ease-in-out duration-200' : ''}`}>
            <div className="">
                {champion ? (
                    <img src={champion.url} alt={champion.name} className="w-64 h-32 object-cover object-top" />
                ) : (
                    <img className="w-64 h-32" />
                )}
            </div>
        </div>
    );
}


export default Pick;