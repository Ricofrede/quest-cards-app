import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function TextPage({content}) {

    console.log(content)
    return (
        <div className="text-page">
            {content && <div className="container class-page">
                <div className="row justify-content-center">
                    <h1 className="col-6 text-center">{content.title}</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {content && content.content && content.content.map(block => {
                            return (
                            <>
                                {block.image && <div className="row justify-content-center">
                                    <figure className="row justify-content-center">
                                        <img className="col-8 img-fluid" src={block && block.image} alt={content.title}></img>
                                    </figure>
                                </div>}
                                <ReactMarkdown key={block.id}>{block.text}</ReactMarkdown>
                            </>)
                        })}
                    </div>
                </div>
            </div>}
        </div>
    )
}
