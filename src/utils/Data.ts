

// _______FOR NAVBAR_____
interface NavLinks  {
    link: string,
    path: string,
    downArrow: boolean
}
export const navLinks:NavLinks[] = [
    {
        link: "Home",
        path: '/',
        downArrow: false
    },
    {
        link: "News",
        path: '/news',
        downArrow: true
    },
    {
        link: "About",
        path: '/about',
        downArrow: false
    },
    {
        link: "Blog",
        path: '/blog',
        downArrow: false
    },
]