import { useState, useEffect } from "react";

const RoomShow = (props) => {
    const { roomId } = props

    const [playernames, setPlayernames] = useState([])

    const fetchRoomPlayer = async(roomId) => {
        const res = await fetch(`http://localhost/api/v1/rooms/${roomId}`)
        return await res.json()
    }

    

    useEffect(()=>{
        fetchRoomPlayer(roomId).then(data=>setPlayernames(data.playernames))
    },[])

    if(playernames.length == 0){
        return <>reading or 404</>
    }

    return(
        <>
            <h1>ROOM: {roomId}</h1>
            <ul>{ playernames.map((playername, index) =>  <li key={index}>{playername}</li>) }</ul>
        </>
    )
}

export async function getServerSideProps(context) {
    return { props: context.query }
}

export default RoomShow