import React from 'react'
import { useState , useEffect } from 'react'

export default function Classes() {
    const [classes , setClasses ] = useState(null)
    useEffect(() => {
        fetch('http://localhost:1337/classes',{
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
              },
        })
            .then(res => res.json())
            .then(data => setClasses(data))

        return () => {}
    }, [])

    return (
        <div>
            {classes && <p>{JSON.stringify(classes)}</p>}
        </div>
    )
}
