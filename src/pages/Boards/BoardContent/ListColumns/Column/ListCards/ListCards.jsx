import React from 'react'
import Card from './Cards/Card'
function ListCards({cards}) {
    return (
        <>
           {cards?.map(card => <Card  key={card._id} card={card}/>)}
        </>
    )
}

export default ListCards