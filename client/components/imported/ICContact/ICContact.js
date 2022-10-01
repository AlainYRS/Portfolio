import React from "react"
import styles from '../../imported/ICContact/ICContact.module.css'

export default function Contact() {

    return(
        <>
            <main className={styles.CS}>
                <fieldset>
                    <label htmlFor="FisrtName">First Name
                        <input id={styles.FisrtName} className={styles.ContactElement} name="FisrtName" type="text" required />
                    </label>
                    <label htmlFor="LastName">Last name
                        <input id={styles.LastName} className={styles.ContactElement} name="LastName" type="text" required />
                    </label>
                    <label htmlFor="email">email
                        <input id={styles.email} className={styles.ContactElement} name="email" type="email" required />
                    </label>
                    <label htmlFor="phone">Phone Number
                        <input id={styles.phone} className={styles.ContactElement} name="phone" type="text" pattern="\d{3}-?\d{3}-?\d{4}" required placeholder="10 digits"/>
                    </label>
                    <label htmlFor="extension">Extension
                        <input id={styles.extension} className={styles.ContactElement} name="extension" type="text"/>
                    </label>
                    <label htmlFor="Company">Company
                        <input id={styles.Company} className={styles.ContactElement} name="Company" type="text" required />
                    </label>
                    <label htmlFor="typecontact">Type of contact:
                        <input list="typecontacts" name="typecontact" id={styles.typecontact} className={styles.ContactElement} placeholder="Plese Select"/>
                    </label>
                    <datalist id={styles.typecontacts} required>
                        <option value="Employment Interview" />
                        <option value="Potential Business" />
                        <option value="Freelance Support" />
                        <option value="Other Issue" />
                    </datalist>
                    <label htmlFor="Tellus">Please tell me more...
                        <textarea id={styles.Tellus} className={styles.ContactElement} name="Tellme" rows="4" required placeholder="I'll be in touch as soon as possible."/>
                    </label>
                    <fieldset id={styles.recomend}>
                        <legend>Do you like my site?</legend>
                        <label id={styles.Lblgradechk}>Thanks for your feedback
                            <input id={styles.grade} className={styles.gradebar} name="gradegiven" type="range" value="7" min="0" step="1" max="10" />{/*Añadir Js para grade y usestate*/}
                        </label>
                    </fieldset>
                    <input id={styles.ContactSubmit} type="submit" value="Submit not dynamic by now"/>
                </fieldset>
            </main>
        </>
    )
}