import Chefs from "./components/chefs/chefs";
import Header from "./components/Header";
import MenuHome from "./components/menuH/menuH";
import Testimonials from "./components/testimonials/Testimonials";


export default function Home() {
  return (
    <div>
      <Header />
      <MenuHome />
      <Chefs />
      <Testimonials />
    </div>
  )
}