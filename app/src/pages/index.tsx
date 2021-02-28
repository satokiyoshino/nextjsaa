import { useState } from "react";

const Index = () => {
    const [playerInput, setPlayerInput] = useState('')
    const [playernames, setPlayernames] = useState([])

    const addPlayer = (playername: String) => {
        setPlayernames([...playernames, playername])
        setPlayerInput('')
    }

    const createRoom = async() => {
        const body = { 'room_id': '1000', playernames: playernames }
        const res = await fetch(
            'http://localhost/api/v1/rooms',
            {
                method: 'post',
                body: JSON.stringify(body)
            }
        )
        console.log(await res.json())
    }

    return(
        <>
            <h1>TOPPAGE</h1>
            <h2>playernames</h2>
            <input type="text" value={playerInput} onChange={e=> setPlayerInput(e.target.value)}/>
            <button onClick={()=> addPlayer(playerInput)}>追加</button>
            <ul>
                {
                    playernames.map((playername, index) =>  <li key={index}>{playername}</li>)
                }
            </ul>
            <button onClick={()=>createRoom()}>ROOM CREATE</button>
        </>
    )
}

export default Index