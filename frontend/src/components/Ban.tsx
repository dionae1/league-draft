import type { Champion } from "../types/Data";

function Ban({ champion, isActive, className }: { champion: Champion | null, isActive: boolean, className?: string }) {
    return (
        <div className={`m-auto border-3 border-transparent ${isActive ? 'border-3 rounded border-gray-500 animate-pulse transition-all ease-in-out duration-200' : ''}`}>
            <div className="">
                {champion ? (
                    <img src={champion.url} alt={champion.name} className={`object-cover ${className || 'w-12 h-12'}`} />
                ) : (
                    <img className={`${className || 'w-12 h-12'}`} />
                )}
            </div>
        </div>
    );
}


export default Ban;