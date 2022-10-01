import Link from 'next/link'
import styles from '../ICAsideMenu/ICAsideMenus.module.css'

function ICAsideMenu (props) {
    return (
        <div id={styles.Div_Aside}>
                <ul className={styles.Ul_Aside}>
                    {
                        props.data.NavMenus.map((Menu)=>{
                            return(
                                <li key={Menu.OptMenu} className={styles.Li_Aside} onClick={()=> props.setAsideState(Menu.OptMenu)}>
                                    <Link href={Menu.RefLink}>{Menu.OptMenu}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
        </div>
    )
}

export default ICAsideMenu