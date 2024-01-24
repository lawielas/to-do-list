import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Item } from "../types/itemType";

type PlaceStore = {
    placesToGo: Item[]
    addPlaceToGo: (id:number ,item: string) => void
    removePlaceToGo: (id: number) => void
    updatePlaceStatus: (id: number) => void
}

export const usePlaceStore = create(persist<PlaceStore>((set) => ({
    placesToGo: [],
    addPlaceToGo: (id: number ,item: string) => {
        set((state) => ({
            placesToGo: [
                ...state.placesToGo,
                {
                    id,
                    item,
                    status: false
                } as Item
            ]
        }))
    },
    removePlaceToGo: (id: number) => {
        set(state => ({placesToGo: state.placesToGo.filter(place => place.id !== id)}))
    },
    updatePlaceStatus: (id: number) => {
        set(state => ({
            placesToGo: state.placesToGo.map(place => place.id === id ? ({...place, status: true} as Item) : place)
        }))
    }
}), {
    name: 'place',
    storage: createJSONStorage(() => localStorage)
}
))