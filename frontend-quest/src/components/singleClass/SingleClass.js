import React from 'react'
import { useState , createContext } from 'react'
import { useQuery,gql } from "@apollo/client";
import PathAbilities from '../PathAbilities/PathAbilities';

const choosenAbility = {
    class: null,
    path: null,
    ability: null
}

export const OpenAbility = createContext(choosenAbility)

const CLASSES_DETAILS = gql`
  query GetClassDetails($slug: String) {
    classes(where: {slug: $slug}){
        title
        description
        quick_start{
          id
          title
          slug
          path {
              slug
          }
        }
        paths{
          id
          title
          slug
        }
        image{
            url
        }
      }
  }
`;

export default function SingleClass({slug}) {
    const [path , setPath ] = useState(null)
    const [ability , setAbility ] = useState(null)
    const { loading, error, data } = useQuery(CLASSES_DETAILS, {
        variables: { slug }
    })

    choosenAbility.class = slug

    if (path){
        choosenAbility.path = path
    }
    if (ability){
        choosenAbility.ability = ability
    }

    function setQuickStart(qs){
        setAbility(qs.slug)
        setPath(qs.path.slug)
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            <OpenAbility.Provider value={choosenAbility}>
            {data && data.classes && data.classes[0] && <div className="container">
                <div className="container class-page">
                    <div className="row justify-content-center">
                        <h2 className="col-6 text-center">{data.classes[0].title}</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <figure className="row justify-content-center">
                                <img className="col-8 img-fluid" src={'http://localhost:1337' + (data.classes[0].image && data.classes[0].image.url)} alt=''></img>
                            </figure>
                        </div>
                        <div className="col-lg-8">
                            <p className="h5">{data.classes[0].description}</p>
                            <br/>
                            <p><b className="h5">Quick Start:</b> {data.classes[0].quick_start && data.classes[0].quick_start.map(qs => {
                                let addStr = ', '
                                if (data.classes[0].quick_start.indexOf(qs) === (data.classes[0].quick_start.length - 1)){
                                    addStr = ''
                                }
                                return <span key={qs.id}><a href="javascript:void(0)" onClick={() => setQuickStart(qs)}>{qs.title}</a>{addStr}</span>
                            })}</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <h5 className="col-4">Paths:</h5>
                        <div className="nav col-8 justify-content-center">
                            {data.classes[0].paths && data.classes[0].paths.map(path => {
                                return <div key={path.slug} className="nav-item">
                                    <a className={"nav-link " + (path.slug === choosenAbility.path ? 'active' : '')} href="javascript:void(0)" onClick={() => setPath(path.slug)}>
                                        {path.title}
                                    </a>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                {choosenAbility.path && <PathAbilities/>}
            </div>}
            </OpenAbility.Provider>
        </>
    )
}
