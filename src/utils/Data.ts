

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
interface NewsCategory  {
    id:number,
    link:string
}

export const categories:NewsCategory[] = [
    {
        id:0,
        link: "All",

    },
    {
        id:1,
        link: "Technology",

    },
    {
        id:2,
        link: "Business",

    },
    {
        id:3,
        link: "Sports",

    },
    {
        id:4,
        link: "Entertainment",

    },
    {
        id:5,
        link: "Health",

    },
]