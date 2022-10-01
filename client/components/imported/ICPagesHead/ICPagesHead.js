import React, { createContext, useContext } from 'react'
import Head from 'next/head'

export default function ICPagesHead({author, title, description, content, icon}) {
    const UserContext = createContext({});
    const { HideHeaderFooter, setHideHeaderFooter, LangLegends, setLangLegends }= useContext(UserContext)
    return(
        <>
            <Head>
                <meta name={author} content={content} />
                <meta name={description} content={content}/>
                <title>{title}</title>
                <link rel="icon" href={icon ? icon : "../Icons/AYRSIcon.png"} />
                <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0 maximum-scale=5.0, minimum-scale=1.0"/>
            </Head>
        </>
    );
}