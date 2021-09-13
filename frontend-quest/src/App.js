import Classes from './components/classes/Classes';
import { useState } from 'react'
import Logo from './assets/images/questlogowhite.png'

function App() {
  const [ lang , setLang ] = useState(null)
  return (
    <div className="App">
        {!lang && <div className="container justify-content-center lang-choose">
            <div>
              <figure>
                <img src={Logo} alt=''></img>
              </figure>
            </div>
            <div className="nav justify-content-center">
              <button className="nav-link" onClick={() => setLang('en')}>EN</button>
              <button className="nav-link" onClick={() => setLang('pt_BR')}>PT-BR</button>
            </div>
          </div>}
        {lang && <Classes lang={lang}/>}  
    </div>
  );
}

export default App;
