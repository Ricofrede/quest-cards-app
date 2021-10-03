import React from 'react'
import Classes from '../classes/Classes';
import TextPage from '../TextPage/TextPage'
import { useState } from 'react'
import Logo from '../../assets/images/questlogowhite.png'
import Home from '../../assets/images/home.png'


export default function Menu({classes, labels}) {
    const [menuItem , setMenuItem] = useState(null)
    return (
        <div>
            {menuItem && <div className="home-btn">
                <button onClick={() => setMenuItem(null)}>
                    <img src={Home} alt='Home Button'></img>
                </button>
            </div>}
            {!menuItem && <div className="container main-menu justify-content-center">
                <div>
                    <figure>
                        <img src={Logo} alt='Quest RPG Logo'></img>
                    </figure>
                </div>
                <nav className="nav justify-content-center">
                    <button className="nav-link" onClick={() => setMenuItem('intro')}>{labels.intro}</button>
                    <button className="nav-link" onClick={() => setMenuItem('howto')}>{labels.howto}</button>
                    <button className="nav-link" onClick={() => setMenuItem('createchar')}>{labels.createchar}</button>
                    <button className="nav-link" onClick={() => setMenuItem('roles')}>{labels.roles}</button>
                    <button className="nav-link" onClick={() => setMenuItem('credits')}>{labels.credits}</button>
                </nav>
            </div>}
            {menuItem && (menuItem !== 'roles') && <TextPage content={menuItem} labels={labels}/>}
            {(menuItem === 'roles') && <Classes classes={classes} labels={labels}/>}  
        </div>
    )
}
