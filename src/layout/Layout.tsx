import Home from "../home/Home"
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"


const Layout = () => {
  return (
    <div>
        <Navbar/>
        <Home/>
        <Footer/>
    </div>
  )
}

export default Layout