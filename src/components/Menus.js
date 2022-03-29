import React from 'react'
import * as AiIcons from 'react-icons/ai'

export const Menus = [
    {
        title: 'Register',
        path: '/register',
        icon: <AiIcons.AiFillCrown />,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <AiIcons.AiTwotoneFire />,
        cName: 'nav-text'
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <AiIcons.AiOutlineNotification />,
        cName: 'nav-text'
    },
    {
        title: 'Trades',
        path: '/trades',
        icon: <AiIcons.AiTwotoneHome />,
        cName: 'nav-text'
    },
    {
        title: 'Charts',
        path: '/charts',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Setting',
        path: '/setting',
        icon: <AiIcons.AiOutlineSearch />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        path: '/logout',
        icon: <AiIcons.AiOutlineThunderbolt />,
        cName: 'nav-text'
    },
]