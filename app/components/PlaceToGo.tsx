import { useState } from "react"
import { usePlaceStore } from "../stores/placeStore"
import add from '../assets/svg/add.svg'
import close from '../assets/svg/close.svg'
import check from '../assets/svg/check.svg'
import deleteItem from '../assets/svg/delete.svg'
import done from '../assets/svg/done.svg'
import Image from "next/image"

const PlaceToGo = () => {
  const [inputPlace, setInputPlace] = useState('')
  const [placeId, setPlaceId] = useState(1)
  const {placesToGo, addPlaceToGo, removePlaceToGo, updatePlaceStatus} = usePlaceStore()
  
  const [showInput, setShowInput] = useState(false)

  return (
    <section className="shadow-xl p-4 rounded-2xl bg-white min-h-40 sm:min-h-52">
        <h2 className="bg-emerald-500 text-white w-fit py-2 px-4 rounded -mt-8">PLACES TO GO</h2>
        <div className="relative">
            <div className={showInput ? "absolute z-40 left-6 sm:left-1/4 bg-gray-100 w-5/6 sm:w-3/6 p-3 rounded-xl flex flex-col gap-3" : "hidden"}>
                <button onClick={() => setShowInput(false)}><Image src={close} alt="close" className="w-7 sm:w-8 float-right" /></button>
                <div className="flex flex-col gap-3">
                <input className="w-full bg-white rounded-2xl p-3 outline-none" type="text" value={inputPlace} onChange={(e) => setInputPlace(e.target.value)}/>
                <button onClick={() =>{
                    addPlaceToGo(placeId, inputPlace)
                    setPlaceId(placeId+1)
                    setInputPlace('')
                    setShowInput(false)
                }} className="bg-emerald-500 p-3 text-white rounded-lg">Add place to go</button>
            </div>
          </div>
          <button onClick={() => setShowInput(true)} className="float-right mx-5"><Image src={add} alt="add" className="w-7 sm:w-10" /></button>
        </div>
        
        <div className="py-10">
          {placesToGo.map((place) => {
            return place.status === false && <div key={place.id} className="flex mt-2 w-full justify-between px-6">
              <p className={!place.status ? "text-black" : "text-green-400"}>{place.item}</p>
              <div className="flex gap-4 sm:gap-6">
                <button onClick={() => removePlaceToGo(place.id)}><Image src={deleteItem} alt="delete" className="w-7 sm:w-8" /></button>
                <button onClick={() => updatePlaceStatus(place.id)}><Image src={check} alt="check" className="w-7 sm:w-8" /></button>
              </div>
            </div>
          })}
          {placesToGo.map((place) => {
            return place.status === true && <div key={place.id} className="flex mt-2 w-full justify-between px-6">
              <p className='line-through decoration-gray-500 text-gray-700'>{place.item}</p>
              <div className="flex gap-3">
                <button className="cursor-auto" onClick={() => updatePlaceStatus(place.id)}><Image src={done} alt="done" className="w-7 sm:w-8" /></button>
              </div>
            </div>
          })}
        </div>
      </section>
  )
}
export default PlaceToGo