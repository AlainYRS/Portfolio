import React from "react";
import styles from '../styles/Resume.module.css'

export default function Resume() {
    return(
        <main  className={styles.RS}>
            <section>
                <label htmlFor="Employment">Employment History
                    <input type="checkbox" id={styles.Employment}/>
                    <fieldset>
                        <ul>Freelance web Designer
                            <li>Web designer with React JS, Next, JavaScript, HTML, CSS, Node JS and serverless process such as google firebase and 
                            google cloud platform (Firestore database, Realtime database, Functions, Storage, Analytics, Authentication, Hosting, Map box
                            maps and Google Maps APIs, Google autocomplete & I18next translations) (Oct20 – nowadays)</li>
                        </ul>
                        <ul>INNCOMEXT SA de CV
                            <li>Main Partner and Legal representative: Product Development and Merchandise Import (Guangzhou – Canton Fair, Shenzhen,
                                Yiwu market & Shanghai), Business Implementation and Branches Development, Personnel Training, Business Control and 
                                metrics. Retail and Wholesale Commerce (Aug 2015 to date) (5 Branches – Mundo e / Town Center Rosario / Sky mall La 
                                Cúspide / Plaza San Mateo / Galerías Perinorte)</li>
                        </ul>
                        <ul>HSBC Financial Group Mexico
                            <li>RBWM Executive Staff Manager: Business Steering & Performance for Nationwide Branches support for Retail Business and 
                                Wealth Management (RBWM) about Sales Annual Operating Plan design and follow up for products (Personal Loan, Payroll, 
                                Auto, Mortgage, Money market, Capitals, Funds, Deposits and Insurance Car-Mortgage-Medical-Unemployment) for each 
                                channel (Branches, Contact Center, Premier-Advance and PFS Segments); Incentive Schemes design, implementation, operation
                                and measurements through Balance Score Card Design and follow up; Branch Network Development (Jan13 - Jul15)</li>
                            <li>Premier Executive Staff Manager: Premier Segment Area for Nationwide Premier personnel and branches support together 
                                with Personal Financial Services about Sales Annual Operating Plan design on Premier customer results and follow up;
                                Incentive Schemes design and measurements through Balance Score Card Design and follow up. (May08 – Dec12)</li>
                            <li>Project Leader: HSBC Systems Area for Collections Credit Card nationwide support about Incentives Scheme design and follow 
                                up; Development metrics, measurement and design with SQL; Overdue portfolio allocation processes for multiple collection channels
                                (PFS, Call Center, Physical Collection and Law department); “Household and Cobranz” Nationwide global collections System
                                implementation (Feb03 – Apr08)</li>
                            <li>Collections staff Advisor: Credit Card Contact Center Collections Staff designing and implementing Development metrics,
                                measurement and design; Overdue portfolio allocation processes for Contact center segments (Welcome call and Overdue) 
                                (Apr02 – Jan03)</li>
                            <li>Contact Center Analyst: Auto Loan welcome call for new customers (Feb02 – Apr02)</li>
                        </ul>
                        <ul>Freelance Software Designer
                            <li>Ford Motor Company SA de CV: Software for rebates and administrative control. (01 – 02)</li>
                        </ul>
                        <ul>Financial Advisor
                            <li>Prudential Apolo Investment Funds (2000 – 2001)</li>
                            <li>Actinver Investment Funds (2000 - 2000)</li>
                        </ul>
                        <ul>Minor Jobs
                            <li>Highschool Mathematic Teacher (2000)</li>
                            <li>Forex Stock Exchange broker (1999)</li>
                            <li>Lanzagorta Money Exchange (1998)</li>
                        </ul>
                    </fieldset>
                </label>
            </section>
            <section>
                <label htmlFor="Schooling">Schooling
                    <input type="checkbox" id={styles.Schooling}/>
                    <fieldset>
                        <ul>
                            <li>Web Development and Internet Application Diploma (St. Clair College – Sep20 - May23 - In progress)</li>
                            <li>Bachelor Economics (ITAM Instituto Tecnológico Autónomo de México – up to 5th intake)</li>
                            <li>Software Engineer (Anahuac University – Mexico – up to 3rd intake)</li>
                            <li>Diploma Business Performance Management (HSBC Financial Group)</li>
                            <li>Technical Computer Technician (Universidad Instituto Patria de Humanidades)</li>
                            <li>High School Rudyard Kipling (Mexico City)</li>
                            <li>Languages Spanish (Native Language)</li>
                            <li>English (B2 level IELTS 6.0 overall / 6 listening, 6.5 reading, 6 writing, 6.5 speaking)</li>
                        </ul>
                    </fieldset>
                </label>
            </section>
            <section>
                <label htmlFor="Skills">Skills
                    <input type="checkbox" id={styles.Skills}/>
                    <fieldset>
                        <ul>
                            <li>Developments: Frontend (HTML, CSS, Js, React Js, Next, Google Firebase, Google Maps), Backend Databases (SQL relational databases, No relational databases Firestore)</li>
                            <li>Financial: Balance Score Cards, Incentive Schemes Modulation - Implementation - Payment calculus, Annual Operating Plans Modulation - Implementation - Measurement - Adjustments.</li>
                            <li>Personal Management experience: Up to 12 retail sales employes, up to 4 administrative positions experience at multinational HSBC financial group corporation</li>
                            <li>Business experience: International electronics Comerce China to Mexico, Real Estate brokerage Mexico.</li>
                        </ul>
                    </fieldset>
                </label>
            </section>
            <section>
                <label htmlFor="Hobbies">Hobbies
                    <input type="checkbox" id={styles.Hobbies}/>
                    <fieldset>
                        <ul>
                            <li>Programming</li>
                            <li>Universal History</li>
                            <li>Documentaries</li>
                            <li>Traveling</li>
                            <li>Family Time</li>
                        </ul>
                    </fieldset>
                </label>
            </section>
        </main>
    )
}