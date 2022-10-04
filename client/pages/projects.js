import ICPagesHead from "../components/imported/ICPagesHead/ICPagesHead";
import ICHeaderMenu from '../components/imported/ICHeaderMenu/ICHeaderMenu'
import Project from "../components/Project";
import ICFooters from '../components/imported/ICFooters/ICFooters'

export default function ProjectPage() {
    return(
        <>
            <ICPagesHead {...{
                author: 'Alain',
                title: 'Alain R. - Projects',
                description: 'description',
                content: "Alain Rivera®",
                icon: "../Icons/AYRSIcon.png"
            }}/>
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
            <Project />
            <ICFooters {...{FotLegend: 'Developed by Alain Rivera ©'}}/>
        </>
    )
}