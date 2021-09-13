import React from 'react'
import { useState } from 'react'
import { useQuery,gql } from "@apollo/client";
import SingleClass from '../singleClass/SingleClass';

const CLASSES_TITLES = gql`
  query GetClassesTitles($lang: String) {
    classes(where: {language: $lang}){
      id
      title
      slug
    }
  }
`;

export default function Classes({lang}) {
    const [classSlug , setClassSlug ] = useState(null)
    const { loading, error, data } = useQuery(CLASSES_TITLES , {
      variables: { lang }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
          <div className="container classes-nav">
            <nav className="nav">
            {data && data.classes && data.classes.map(clas => {
                return <a key={clas.id} className={"nav-link " + (clas.slug === classSlug ? 'active' : '')} href="javascript:void(0)" onClick={() => setClassSlug(clas.slug)}>{clas.title}</a> // eslint-disable-line
            })}
            </nav>
          </div>
          {classSlug && <SingleClass slug={classSlug}/>}
        </>
    )
}
