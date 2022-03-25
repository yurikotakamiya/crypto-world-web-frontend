import React from 'react'
import * as AiIcons from 'react-icons/ai'

export const Menus = [
    {
        title: 'Member Login',
        path: '/login',
        icon: <AiIcons.AiTwotoneFire />,
        cName: 'nav-text'
    },
    {
        title: 'Instructor Login',
        path: '/instructorLogin',
        icon: <AiIcons.AiOutlineNotification />,
        cName: 'nav-text'
    },
    {
        title: 'Sign Up',
        path: '/signup',
        icon: <AiIcons.AiFillCrown />,
        cName: 'nav-text'
    },
    {
        title: 'Member Home',
        path: '/client',
        icon: <AiIcons.AiTwotoneHome />,
        cName: 'nav-text'
    },
    {
        title: 'Instructor Home',
        path: '/instructor',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Search Class',
        path: '/client',
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