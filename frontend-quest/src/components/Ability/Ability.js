import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Ability({ability,labels}) {

    return (
        <>
            {ability && <div>
                <h3>{ability.title} <i className="order-path">#{ability.order_in_path}</i></h3>
                {ability.roll_dice && <span className="h5 roll-dice">{labels.roll_dice}</span>}
                {ability.description && <ReactMarkdown>
                    {ability.description}
                </ReactMarkdown>}
                <h5>{labels.effects}:</h5>
                <ul>
                    {ability.Effect && ability.Effect.map(eff => {
                        return(
                            <li key={eff.id} className="effects-li">
                                <span className="h5"><b>{(eff.cost || (eff.cost === 0)) ? eff.cost : 'x'}</b> </span>
                                <ReactMarkdown>{eff.description}</ReactMarkdown>
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </>
    )
}
