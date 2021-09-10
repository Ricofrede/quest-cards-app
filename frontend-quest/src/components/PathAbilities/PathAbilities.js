import React from 'react'
import { useState } from 'react'
import { useQuery,gql } from "@apollo/client";
import Ability from '../Ability/Ability';

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

export default function PathAbilities({slug}) {
    const [ability , setAbility ] = useState(null)
    const { loading, error, data } = useQuery(PATH_ABILITIES, {
        variables: { slug }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            {data && data.paths && <div>
                <h5>'{data.paths && data.paths[0].title}' Path's Abilities:</h5>
                {data.paths[0].abilities && data.paths[0].abilities.map(abil => {
                        return <div key={abil.slug}>
                            <p>
                                <button className="btn btn-primary" type="button" onClick={() => setAbility(abil.slug)}>
                                    {abil.title}
                                </button>
                            </p>
                        </div>
                    })}
            </div>}
            {ability && <Ability slug={ability}/>}
        </div>
    )
}
