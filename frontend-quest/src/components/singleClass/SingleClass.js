import React from 'react'
import { useState } from 'react'
import { useQuery,gql } from "@apollo/client";
import PathAbilities from '../PathAbilities/PathAbilities';

const CLASSES_DETAILS = gql`
  query GetClassDetails($slug: String) {
    classes(where: {slug: $slug}){
        title
        description
        quick_start{
          id
          title
          slug
        }
        paths{
          id
          title
          slug
        }
      }
  }
`;

export default function SingleClass({slug}) {
    const [path , setPath ] = useState(null)
    const { loading, error, data } = useQuery(CLASSES_DETAILS, {
        variables: { slug }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            {data && data.classes && data.classes[0] && <div>
                <h2>{data.classes[0].title}</h2>
                <h5>{data.classes[0].description}</h5>
                <p><b>Quick Start:</b> {data.classes[0].quick_start && data.classes[0].quick_start.map(qs => {
                    let addStr = ', '
                    if (data.classes[0].quick_start.indexOf(qs) === (data.classes[0].quick_start.length - 1)){
                        addStr = ''
                    }
                    return qs.title + addStr
                })}</p>
                <div>
                    <h5>Paths:</h5>
                    {data.classes[0].paths && data.classes[0].paths.map(path => {
                        return <div key={path.slug}>
                            <p>
                                <button className="btn btn-primary" type="button" onClick={() => setPath(path.slug)}>
                                    {path.title}
                                </button>
                            </p>
                        </div>
                    })}
                </div>
                {path && <PathAbilities slug={path}/>}
            </div>}
        </div>
    )
}
