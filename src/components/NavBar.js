import React from 'react'
import { Link } from 'react-router-dom';
import { Menus } from './Menus'
import { slide as Menu } from 'react-burger-menu'

const NavBar = () => {
    
    return (
        <div className="header">
            <div className="header-left">
                <Menu>
                    { Menus.map((menu, index) => {
                        return (
                            <li key={index} className={menu.cName}>
                                <Link to={menu.path}>
                                    {menu.icon}
                                    <span>{menu.title}</span>
                                </Link>
                            </li>
                        )
                    })}            
                </Menu>    
            </div>
            <div className="header-right">
                
            </div>
        </div>
    )
}

export default NavBar