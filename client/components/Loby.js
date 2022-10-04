import React from "react"
import Image from "next/dist/client/image"
import styles from '../styles/Loby.module.css'

export default function Loby({Name, Personal_Photo, Personal_Introduction}) {
    return(
        <>
            <section>
                <main className={styles.LM}>
                    <h2>{Name != '' ? Name : "Personal Introduction"}</h2>
                        {Personal_Photo !== "" && 
                            <div className={styles.divimg}>
                                <Image src={Personal_Photo} layout="fill" alt={Name}/>
                            </div>
                        }
                    <p>{Personal_Introduction != '' ? Personal_Introduction : "Personal Description"}</p>
                </main>
            </section>
        </>
    )
}
