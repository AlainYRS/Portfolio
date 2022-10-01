import Link from 'next/link'
import styles from '../ICHeaderMenu/ICHeaderMenu.module.css'

function ICHeaderMenu({NavMenus}){
    return (
        <div className={(styles.Header_Div)}>
            <ul className={styles.Header_Div_Ul}>
                {
                    NavMenus.map((Menu)=>{
                        return(
                            <li className={styles.Header_Ul_Li} key={Menu.RefLink}>
                                <Link href={Menu.RefLink}>{Menu.OptMenu}</Link>
                                {Menu.SubMenu && (
                                        <ul className={styles.Header_Li_Ul}>
                                            {
                                                Menu.SubMenu.map((SNMenu)=>{
                                                    return(
                                                        <li className={styles.Header_Li_Ul_Li} key={SNMenu.OptMenu}><Link href={SNMenu.RefLink}>{SNMenu.OptMenu}</Link></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ICHeaderMenu