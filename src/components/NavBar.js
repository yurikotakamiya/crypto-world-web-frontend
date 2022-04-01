import React from 'react'
import { Link } from 'react-router-dom'
import { Menus } from './Menus'
import { slide as Menu } from 'react-burger-menu'

const NavBar = () => {
    const session = localStorage.getItem('session')
    return (
        <div>
            <div className='menu'>
                <Menu right>
                    { Menus.map((menu, index) => {
                        return (
                            <li key={index} className={menu.cName}>
                                <Link to={menu.path} session={session}>
                                    {menu.icon}
                                    <span>{menu.title}</span>
                                </Link>
                            </li>
                        )
                    })}            
                </Menu>    
            </div>
        </div>
    )
}

export default NavBar