import React , {useContext} from 'react'
import { useQuery,gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown'
import { OpenAbility } from '../singleClass/SingleClass'; 


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

export default function Ability() {
    const choosenAbility = useContext(OpenAbility)
    const { loading, error, data } = useQuery(ABILITY, {
        variables: { slug: choosenAbility.ability }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            {data && data.abilities && <div>
                <h3>{data.abilities[0].title}</h3>
                {data.abilities[0].description && <ReactMarkdown>
                    {data.abilities[0].description}
                </ReactMarkdown>}
                <h5>Effects:</h5>
                <ul>
                    {data.abilities[0].Effect && data.abilities[0].Effect.map(eff => {
                        return(
                            <li key={eff.id} className="effects-li">
                                <span className="h5"><b>{eff.cost}</b> </span>
                                <ReactMarkdown>{eff.description}</ReactMarkdown>
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </>
    )
}
