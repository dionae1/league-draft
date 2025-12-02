import { useEffect, useState } from "react"
import { getData } from "../services/data"

import Pick from "./Pick"
import Ban from "./Ban"
import Icon from "./Icon"

import api from "../api/client"

import type { Champion } from "../types/Data";

type Action = "pick" | "ban" | "complete" | "starting"

interface DraftProps {
    onComplete?: (picks: Array<Champion>) => void,
    fearlessBans?: Array<Champion>
}

function Draft({ onComplete, fearlessBans }: DraftProps) {
    const [data, setData] = useState<Array<Champion> | null>(null)
    const [action, setAction] = useState<Action>("starting")

    const [pickIndex, setPickIndex] = useState<number>(0)
    const [pickedChampions, setPickedChampions] = useState<Array<Champion>>([])

    const [banIndex, setBanIndex] = useState<number>(0)
    const [bannedChampions, setBannedChampions] = useState<Array<Champion>>([])

    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData()
                setData(data)

            } catch (error) {
                console.error('Error in App component while fetching data:', error)
                setError('Failed to load data')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleSelect = (champion: Champion) => {
        if (pickIndex === 0 && banIndex === 0) return

        if (action === "ban") {
            setBannedChampions((prevBans) => {
                const newBans = [...prevBans]
                if (!newBans) return prevBans
                newBans[banIndex] = champion
                return newBans
            })
            return
        }

        setPickedChampions((prevPicks) => {
            const newPicks = [...prevPicks]
            if (!newPicks) return prevPicks
            newPicks[pickIndex] = champion
            return newPicks
        })
    }

    const handleConfirm = () => {

        if (action === "starting") {
            setAction("ban")
            setBanIndex(1)
            return
        }

        if (action === "ban") {
            if (!bannedChampions[banIndex])
                return

            setBanIndex((prevIndex) => prevIndex + 1)
            if (banIndex === 6) {
                setAction("pick")
                setPickIndex(1)
                setBanIndex(0)
                return
            }

            if (banIndex === 10) {
                setAction("pick")
                setPickIndex(7)
            }

            return
        }

        if (!pickedChampions[pickIndex])
            return

        setPickIndex((prevIndex) => prevIndex + 1)

        if (pickIndex === 6) {
            setAction("ban")
            setBanIndex(7)
            setPickIndex(0)
        }

        if (pickIndex === 10) {
            setAction("complete")

            const bluePicks = ([pickedChampions[1], pickedChampions[4], pickedChampions[5], pickedChampions[8], pickedChampions[9]]).map((c) => c.name)
            const redPicks = [pickedChampions[2], pickedChampions[3], pickedChampions[6], pickedChampions[7], pickedChampions[10]].map((c) => c.name)
            const blueBans = [bannedChampions[1], bannedChampions[3], bannedChampions[5], bannedChampions[7], bannedChampions[9]].map((c) => c.name)
            const redBans = [bannedChampions[2], bannedChampions[4], bannedChampions[6], bannedChampions[8], bannedChampions[10]].map((c) => c.name)

            api.post("/data/draft", {
                bluePicks,
                redPicks,
                blueBans,
                redBans,
                fearlessBans
            })

            // index 0 is unused to make the pick/ban order easier to manage, start with 1
            if (onComplete) onComplete(pickedChampions.slice(1))
        }
    }

    const isTaken = (champion: Champion) => {
        const byName = (arr?: Array<Champion>) =>
            !!arr && arr.some((c) => c && c.name === champion.name)

        return byName(bannedChampions) || byName(pickedChampions) || byName(fearlessBans)
    }

    return (
        <div className="relative w-full flex justify-center mt-10">
            <div className="absolute left-40 top-0 flex flex-col items-start z-0">
                <h2 className="text-2xl font-bold">Blue Team</h2>
                <div className="flex flex-col gap-2 mt-2">
                    <Pick champion={pickedChampions[1]} isActive={pickIndex === 1} />
                    <Pick champion={pickedChampions[4]} isActive={pickIndex === 4} />
                    <Pick champion={pickedChampions[5]} isActive={pickIndex === 5} />
                    <Pick champion={pickedChampions[8]} isActive={pickIndex === 8} />
                    <Pick champion={pickedChampions[9]} isActive={pickIndex === 9} />
                </div>
                <div className="flex flex-row my-6 w-max">
                    <Ban champion={bannedChampions[1]} isActive={banIndex === 1} className="w-20 h-20" />
                    <Ban champion={bannedChampions[3]} isActive={banIndex === 3} className="w-20 h-20" />
                    <Ban champion={bannedChampions[5]} isActive={banIndex === 5} className="w-20 h-20" />
                    <Ban champion={bannedChampions[7]} isActive={banIndex === 7} className="w-20 h-20" />
                    <Ban champion={bannedChampions[9]} isActive={banIndex === 9} className="w-20 h-20" />
                </div>

            </div>


            {loading ? (
                <div className="p-4 w-[800px] shrink-0 m-auto flex flex-col items-center relative z-10">
                    <h2 className="text-2xl">Loading champions...</h2>
                </div>

            ) : error ? (
                <div className="p-4 w-[800px] shrink-0 m-auto flex flex-col items-center relative z-10">
                    <h2 className="text-2xl text-red-600">{error}</h2>
                </div>

            ) : (
                <div className="p-4 pt-10 w-full shrink-0 m-auto flex flex-col items-center relative z-10">
                    <h2 className="text-2xl">{action === "ban" ? "Ban a Champion" : action === "pick" ? "Pick a Champion" : <p className="mt-8"></p>}</h2>
                    {data && Array.isArray(data) && (
                        <ul className="grid grid-cols-6 gap-2 h-150 w-200 overflow-y-scroll border-1 m-4 p-4 rounded-md bg-zinc-950">
                            {
                                data.map((champion) => (
                                    <Icon
                                        key={champion.name}
                                        champion={champion}
                                        handleSelect={handleSelect}
                                        isActive={
                                            ((action !== "starting") && !isTaken(champion))
                                        }
                                    />
                                ))
                            }
                        </ul>
                    )}

                    {
                        pickIndex > 10 ? <h2 className="text-3xl mt-4">Draft Complete!</h2> :
                            <button
                                className="p-2 text-2xl rounded-md w-32 text-center hover:bg-white hover:text-black transition mt-4 border-2 border-white hover:cursor-pointer"
                                onClick={handleConfirm}>{`${action === "starting" ? 'Start' : 'Confirm'}`}
                            </button>
                    }

                </div>
            )}

            <div className="absolute right-40 top-0 flex flex-col items-end z-0">
                <h2 className="text-2xl font-bold">Red Team</h2>
                <div className="flex flex-col gap-2 mt-2">
                    <Pick champion={pickedChampions[2]} isActive={pickIndex === 2} />
                    <Pick champion={pickedChampions[3]} isActive={pickIndex === 3} />
                    <Pick champion={pickedChampions[6]} isActive={pickIndex === 6} />
                    <Pick champion={pickedChampions[7]} isActive={pickIndex === 7} />
                    <Pick champion={pickedChampions[10]} isActive={pickIndex === 10} />
                </div>
                <div className="flex flex-row my-6 gap-1 w-max">
                    <Ban champion={bannedChampions[2]} isActive={banIndex === 2} className="w-20 h-20" />
                    <Ban champion={bannedChampions[4]} isActive={banIndex === 4} className="w-20 h-20" />
                    <Ban champion={bannedChampions[6]} isActive={banIndex === 6} className="w-20 h-20" />
                    <Ban champion={bannedChampions[8]} isActive={banIndex === 8} className="w-20 h-20" />
                    <Ban champion={bannedChampions[10]} isActive={banIndex === 10} className="w-20 h-20" />
                </div>

            </div>
        </div>
    )
}

export default Draft