import ICPagesHead from '../components/imported/ICPagesHead/ICPagesHead'
import ICHeaderMenu from '../components/imported/ICHeaderMenu/ICHeaderMenu'
import Loby from '../components/Loby.js'
import ICFooters from '../components/imported/ICFooters/ICFooters'

/* Proyectos de AYRS
HSBC
IRSi Inmobiliaria y Construccion
NIXIN
China
Tknoshop
NPO
Canada
College Projects (ASPNET, )
*/

export default function HomePage() {
  return (
    <>
      <ICPagesHead {...{
          author: 'Alain',
          title: 'Alain R. - Portfolio',
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
          {OptMenu: 'Contact', RefLink: '/contact', SubNavMenu: null},
        ]
      }}/>
      <Loby {...{
        Name: 'Alain Y. Rivera S.',
        Personal_Photo: "/AlainRivera.jpeg",
        Personal_Introduction: 'I consider myself a proactive person who believes in personal development as result of individual improvement effort where self-motivation and self-management are fundamentals in an ethical daily applied behaviour focused on vision and objectives. I am stimulated by challenges that require intellectual skills as well as human relationships as a constant source of personal growth to learn and contribute to the collective goals achievement.'
      }}/>
      <ICFooters {...{FotLegend: 'Developed by Alain Rivera ©'}}/>
    </>
  )
}
