import React from "react";
import styles from "../styles/Project.module.css"
import Image from "next/image";

export default function Project() {
    return(
        <section className={styles.PS}>
            <label htmlFor="Employment">
                <fieldset>
                    <ul id="NIXIN">NIXIN Website
                        <li>Progressive web application for a new Mexican Start UP focused on the real estate and commercial advertising sectors, customizable and synchronized in one place under the commercial name of NIXIN for the Mexican company NIXIN Impulso y Difusión SAPI de CV.</li>
                        <li>Frontend developed with the following technologies: React Js, Next, Google Maps API and Mapbox, Algolia & I12 Traslations.</li>
                        <li>Backend implemented on the structure of Google Cloud and Google Firebase using server processes through the server side render and non-relational database services Firestore, Authentication, Autocomplete, Geocoding & Geolocation programmed with typescript. (Oct20 – nowadays)</li>
                        <div className={styles.divimg}>
                            <Image src="/NIXINProject1.jpg" layout="fill" alt="NIXIN Project"/>
                        </div>
                        <div className={styles.divimg}>
                            <Image src="/NIXINProject.jpg" layout="fill" alt="NIXIN Project"/>
                        </div>
                    </ul>
                    <ul id="PHP">PHP Website
                        <li>Project developed with the PHP programming language and connection with MySQL for the capture, ordering and collection of data directly from the server.</li>
                        <div className={styles.divimg}>
                            <Image src="/PHPProject.png" layout="fill" alt="PHP Project"/>
                        </div>
                    </ul>
                    <ul id="Usability">Final Wireframe Usability
                        <li>Project developed in the wireframes stage with Figma in order to activate an online sporting goods store.</li>
                        <div className={styles.divimg}>
                            <Image src="/UsabilityProject.png" layout="fill" alt="Web Usability Project"/>
                        </div>
                    </ul>
                    <ul id="Blazor">Blazor Website
                        <li>Blazor pages project developed with ASP.NET for interaction through a real-time chat between the user and the owner of the website.</li>
                        <div className={styles.divimg}>
                            <Image src="/BlazorProject.png" layout="fill" alt="Blazor Project"/>
                        </div>
                    </ul>
                </fieldset>
            </label>
        </section>
    )
}