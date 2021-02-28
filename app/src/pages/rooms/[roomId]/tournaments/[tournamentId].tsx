import { useState, useEffect } from "react";

const TournamentShow = (props) => {
    const {tournamentId} = props
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