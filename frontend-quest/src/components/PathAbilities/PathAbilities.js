import React from 'react'
import { useState, useContext } from 'react'
import { useQuery,gql } from "@apollo/client";
import Ability from '../Ability/Ability';
import { OpenAbility } from '../singleClass/SingleClass';

const PATH_ABILITIES = gql`
  query GetPathAbilities($slug: String) {
    paths(where: {slug: $slug}){
        title
        abilities{
          id
          title
          slug
        }
      }
  }
`;

export default function PathAbilities() {
    const [ability , setAbility ] = useState(null)
    const choosenAbility = useContext(OpenAbility)
    const { loading, error, data } = useQuery(PATH_ABILITIES, {
        variables: { slug: choosenAbility.path }
    })

    if (ability){
        choosenAbility.ability = ability
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
        <OpenAbility.Provider value={choosenAbility}>
            <div className="container">
                {data && data.paths && <div className="row">
                    <h5 className="col-4">'{data.paths && data.paths[0].title}' Path's Abilities:</h5>
                    <div className="nav col-8 justify-content-center">
                        {data.paths[0].abilities && data.paths[0].abilities.map(abil => {
                                return <div key={abil.slug} className="nav-item">
                                    <a className={"nav-link " + (abil.slug === choosenAbility.ability ? 'active' : '')} href="javascript:void(0)" onClick={() => setAbility(abil.slug)}>
                                        {abil.title}
                                    </a>
                                </div>
                            })}
                    </div>
                </div>}
            </div>
            {choosenAbility.ability && <Ability/>}
            </OpenAbility.Provider>
        </>
    )
}
