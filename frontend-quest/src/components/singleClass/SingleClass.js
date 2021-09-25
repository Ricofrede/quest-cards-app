import React from 'react'
import { useState } from 'react'
import PathAbilities from '../PathAbilities/PathAbilities';

export default function SingleClass({selected, labels}) {
    const [path , setPath ] = useState({})
    const [ability , setAbility ] = useState({})

    function handleQuickStart(qs){
        setAbility(qs)
        const paths = selected && selected.paths
        for (const pth of paths){
            const abils = pth && pth.abilities
            for (const abil of abils){
                if (abil.slug === qs.slug){
                    setPath(pth)
                }
            }
        }
    }

    function isLegendary(slug){
        if (slug.startsWith('legendary') || slug.endsWith('lendario')){
            return true
        }
        return false
    }

    return (
        <>
            {selected && <div className="container">
                <div className="container class-page">
                    <div className="row justify-content-center">
                        <h2 className="col-6 text-center">{selected.title}</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <figure className="row justify-content-center">
                                <img className="col-8 img-fluid" src={selected && selected.image} alt={selected.title}></img>
                            </figure>
                        </div>
                        <div className="col-lg-8">
                            <p className="h5">{selected.description}</p>
                            <br/>
                            <p><b className="h5">{labels.quick_start}:</b> {selected.quick_start && selected.quick_start.map(qs => {
                                let addStr = ', '
                                if (selected.quick_start.indexOf(qs) === (selected.quick_start.length - 1)){
                                    addStr = ''
                                }
                                return <span key={qs.slug}><button onClick={() => handleQuickStart(qs)}>{qs.title}</button>{addStr}</span>
                            })}</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <h5 className="col-4">{labels.paths}:</h5>
                        <div className="nav col-8 justify-content-center">
                            {selected.paths && selected.paths.map(pth => {
                                return <div key={pth.slug} className="nav-item">
                                    <button className={"nav-link " + (pth.slug === path.slug ? 'active' : '') + ' ' + (isLegendary(pth.slug) ? 'legendary' : '')} onClick={() => setPath(pth)}>
                                        {pth.title}
                                    </button>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {path.slug && <PathAbilities path={path} qsAbility={ability} labels={labels}/>}
            </div>}
        </>
    )
}
