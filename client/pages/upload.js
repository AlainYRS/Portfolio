import ICPagesHead from '../components/imported/ICPagesHead/ICPagesHead'
import ICHeaderMenu from '../components/imported/ICHeaderMenu/ICHeaderMenu'
import ICAsideMenu from '../components/imported/ICAsideMenu/ICAsideMenu'
import ICFooters from '../components/imported/ICFooters/ICFooters'
import Uploader from '../components/Uploader'
import styles from '../styles/Uploader.module.css'
import { useState } from 'react'

export default function UploadPage(){
    const [AsideState, setAsideState] = useState('');

    return(
        <div id={styles.UploadPage}>
            <ICPagesHead {...{
                author: 'Alain',
                title: 'Alain R. - Resume',
                description: 'description',
                content: "Alain Rivera®",
                icon: "../Icons/AYRSIcon.png"
            }}/>
            <header id={styles.PageHeader}>
                <ICHeaderMenu {...{    
                    NavMenus: [
                        {OptMenu: 'Resume', RefLink: '/resume', SubMenu: null},
                        {OptMenu: 'Projects', RefLink: '/projects', SubMenu: 
                            [
                                {OptMenu: 'NIXIN Website', RefLink: '/projects#NIXIN', SubMenu: null},
                                {OptMenu: 'PHP Website', RefLink: '/projects#PHP', SubMenu: null},
                                {OptMenu: 'Final Wireframe Usability', RefLink: '/projects#Usability', SubMenu: null},
                                {OptMenu: 'Upload', RefLink: '/upload', SubMenu: null},
                            ]
                        },
                        {OptMenu: 'Contact', RefLink: '/contact', SubMenu: null},
                    ]
                }}/>
            </header>
            <main id={styles.PageMain}>
                <h3 id={styles.WebLinkOnlineResume}>Make your Portfolio Website - Share your Resume Web-Link</h3>
                <Uploader />
            </main>
            <footer id={styles.PageFooter}>
                <ICFooters {...{FotLegend: 'FullStack PWA developed by Alain Rivera © with Next Js, Node Js, MySql & Firebase'}}/>
            </footer>
        </div>
    )
}