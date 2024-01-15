"use client"

import PeopleToSpeak from "./components/PeopleToSpeak"
import PlaceToGo from "./components/PlaceToGo"
import Todo from "./components/Todo"


export default function Home() {


  return (
    <main className="font-nunito flex flex-col min-h-screen items-center justify-start py-10 sm:py-20 bg-gray-100">
      <div className="flex flex-col gap-12 w-11/12 sm:w-5/6 md:w-4/6 lg:w-3/6 text-base sm:text-lg">
        <h1 className="text-4xl mx-4 font-bold">My Day</h1>
        <Todo />
        <PlaceToGo />
        <PeopleToSpeak />
      </div>
      
    </main>
  )
}
