import { useState, useEffect } from "react";

const TournamentIndex = (props) => {
    const { roomId } = props

    const [playernames, setPlayernames] = useState([]) 
    const [participatePlayernames, setParticipatePlayernames] = useState([])
    const [entryfee, setEntryfee] = useState(0)


    const fetchRoomPlayer = async(roomId) => {
        const res = await fetch(`http://localhost/api/v1/rooms/${roomId}`)
        return await res.json()
    }

    const participateTournament = (playername) => {
        if (!participatePlayernames.find(name => name == playername)) setParticipatePlayernames([...participatePlayernames, playername])
    }

    const withdrawTournament = (playername) => {
        const copyParticipatePlayernames = participatePlayernames

        const index = participatePlayernames.indexOf(playername)
        copyParticipatePlayernames.splice(index, 1)

        setParticipatePlayernames([...copyParticipatePlayernames])
    }

    const holdTournament = async() => {
        const playername_cash = []

        participatePlayernames.forEach(playername=>{
            playername_cash.push({
                'playername': playername,
                'cash': -(entryfee),
                'cash_type': 'entryfee',
            })
        })
        
        const requestBody = {
            'room_id': roomId,
            'playername_cash': playername_cash
        }

        const res = await fetch(`http://localhost/api/v1/tournaments`, {method: 'post', body: JSON.stringify(requestBody)})
        console.log(await res.json())
    }


    useEffect(()=>{
        fetchRoomPlayer(roomId).then(data=>setPlayernames(data.playernames))
    },[])
    
    return(
        <>
            <h1>CREATE TOUNAMENT: {roomId}</h1>
            <h2>Room Member</h2>
            {  
                playernames.map((playername, index) => 
                    <button 
                        key={index} 
                        value={playernames} 
                        onClick={()=>participateTournament(playername)}
                        >{playername}</button>)
            }

            <h2>Participate Playernames</h2>
            {  
                participatePlayernames.map((playername, index) => 
                    <button 
                        key={index} 
                        value={playernames} 
                        onClick={()=>withdrawTournament(playername)}
                        >{playername}</button>)
            }

            <h2>Entryfee</h2>
            <input value={entryfee} onChange={e=>{
                setEntryfee(
                    isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
                )
            }} />

            <h2>Hold a Tournament</h2>
            <button onClick={()=>holdTournament()}>Hold a Tournament</button>
        </>
    )
}

export async function getServerSideProps(context) {
    return { props: context.query }
}

export default TournamentIndex