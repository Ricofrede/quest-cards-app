import React from 'react'
import { useQuery,gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown'

const ABILITY = gql`
  query GetAbility($slug: String) {
    abilities(where: {slug: $slug}){
        title
          description
          order_in_path
          Effect{
          id
          description
          cost
        }
      }
  }
`;

export default function Ability({slug}) {
    const { loading, error, data } = useQuery(ABILITY, {
        variables: { slug }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            {data && data.abilities && <div>
                <h3>{data.abilities[0].title}</h3>
                {data.abilities[0].description && <ReactMarkdown>
                    {data.abilities[0].description}
                </ReactMarkdown>}
                <h5>Effects:</h5>
                <ul>
                    {data.abilities[0].Effect && data.abilities[0].Effect.map(eff => {
                        return(
                            <li key={eff.id}>
                                <h5>Cost: {eff.cost}</h5>
                                <ReactMarkdown>{eff.description}</ReactMarkdown>
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </div>
    )
}
