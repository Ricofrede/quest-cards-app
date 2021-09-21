import Classes from './components/classes/Classes';
import { useState } from 'react'
import { useQuery,gql } from "@apollo/client";
import Logo from './assets/images/questlogowhite.png'
import loadGif from './assets/images/load.gif'

const QUERY_ALL = gql`
  query getAll
    {
      classes{
        id
        slug
        title
        description
        image
        language
        quick_start{
          id
          slug
          title
          order_in_path
          description
          roll_dice
          Effect{
            id
            description
            cost
          }
        }
        paths{
          title
          slug
          id
          abilities{
            id
            slug
            title
            order_in_path
            description
            roll_dice
            Effect{
              id
              description
              cost
            }
          }
        }
      }
      portugueseTranslation{
        LabelTranslation{
          label
          translation{
            en
            pt_BR
          }
        }
      }
    }
`

function App() {
  const [ lang , setLang ] = useState(null)
  const { loading, error, data } = useQuery(QUERY_ALL)

  if (loading) {
    return (
      <div className="container loading-container">
        <div className="row">
          <img src={loadGif} alt='Quest Logo'></img>
        </div>
      </div>
  )
  ;}


  if (error) return <p>{error.message}</p>;


  const dictionary = {}
  if (lang && data && data.portugueseTranslation){
    const translations = data.portugueseTranslation && data.portugueseTranslation.LabelTranslation
    for (const tr of translations) {
      dictionary[tr.label] = tr.translation[lang]
    }
  }

  const classes = lang && data && data.classes && data.classes.map(clss => {
    if(clss.language === lang){
      return clss
    }
    return false
  }).filter(Boolean)

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
        {lang && <Classes classes={classes} labels={dictionary}/>}  
    </div>
  );
}

export default App;
