import React from 'react'
import { useState } from 'react'
import { useQuery,gql } from "@apollo/client";
import SingleClass from '../singleClass/SingleClass';

const CLASSES_TITLES = gql`
  query GetClassesTitles {
    classes{
      id
      title
      slug
    }
  }
`;

export default function Classes() {
    const [classSlug , setClassSlug ] = useState(null)
    const { loading, error, data } = useQuery(CLASSES_TITLES)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <nav className="nav">
            {data && data.classes && data.classes.map(clas => {
                return <a key={clas.id} className="nav-link" href="#" onClick={() => setClassSlug(clas.slug)}>{clas.title}</a> // eslint-disable-line
            })}
            </nav>
            {classSlug && <SingleClass slug={classSlug}/>}
        </div>
    )
}
