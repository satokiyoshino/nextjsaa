import { useState, useEffect } from "react";

const TournamentShow = (props) => {
    const {tournamentId} = props

    const fetchTournamentPlayer = async(tournamentId) => {
        const res = await fetch(`http://localhost/api/v1/tournaments/${tournamentId}`)
        return await res.json()
    }

    useEffect(()=>{
        fetchTournamentPlayer(tournamentId).then(data=>console.log(data))
    },[])

    return(
        <>
            <h1>TournamentShow: {tournamentId}</h1>
        </>
    )
}

export async function getServerSideProps(context) {
    return { props: context.query }
}

export default TournamentShow