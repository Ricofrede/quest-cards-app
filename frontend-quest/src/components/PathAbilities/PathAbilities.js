import React from 'react'
import { useState, useEffect } from 'react'
import Ability from '../Ability/Ability';

export default function PathAbilities({path,qsAbility,labels}) {
    const [ability , setAbility ] = useState({})

    useEffect(() => {
        if(qsAbility.slug){
            setAbility(qsAbility)
        }

    }, [path,qsAbility])

    return (
        <>
            <div className="container">
                {path && <div className="row">
                    <h5 className="col-4">'{path.title}' {labels.path_abilities}:</h5>
                    <div className="nav col-8 justify-content-center">
                        {path.abilities && path.abilities.map(abil => {
                                return <div key={abil.slug} className="nav-item">
                                    <button className={"nav-link " + (abil.slug === ability.slug ? 'active' : '')} onClick={() => setAbility(abil)}>
                                        {abil.title}
                                    </button>
                                </div>
                            })}
                    </div>
                </div>}
            </div>
            {ability.slug && <Ability ability={ability} labels={labels}/>}
        </>
    )
}
