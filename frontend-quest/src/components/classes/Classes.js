import React from 'react'
import { useState } from 'react'
import SingleClass from '../singleClass/SingleClass';

export default function Classes({classes, labels}) {
    const [selected , setSelected ] = useState({})

    return (
        <>
          <div className="container classes-nav justify-content-center">
              <nav className="nav justify-content-center">
                {classes && classes.map(clas => {
                    return <button key={clas.id} className={"nav-link " + (clas.slug === selected.slug ? 'active' : '')} onClick={() => setSelected(clas)}>{clas.title}</button> // eslint-disable-line
                })}
              </nav>
          </div>
          {selected.slug && <SingleClass selected={selected} labels={labels}/>}
        </>
    )
}
