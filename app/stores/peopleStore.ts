import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Item } from "../types/itemType";

type PeopleToSpeak = {
    peopleToSpeak: Item[],
    addPeopleToSpeak: (id: number, people: string) => void
    removePeopleToSpeak: (id: number) => void
    updatePeopleStatus: (id: number) => void
}

export const usePeopleToSpeak = create(persist<PeopleToSpeak>((set) => ({
    peopleToSpeak: [],
    addPeopleToSpeak: (id: number, item: string) => {
        set((state) => ({
            peopleToSpeak: [
                ...state.peopleToSpeak,
                {
                    id,
                    item,
                    status: false
                } as Item
            ]
        }))
    },
    removePeopleToSpeak: (id: number) => {
        set((state) => ({peopleToSpeak: state.peopleToSpeak.filter(people => people.id !== id)}))
    },
    updatePeopleStatus: (id: number) => {
        set((state) => ({
            peopleToSpeak: state.peopleToSpeak.map(people => people.id === id ? ({...people, status: true} as Item) : people)
        }))
    }
}), {
    name: 'people',
    storage: createJSONStorage(() => localStorage)
}
))