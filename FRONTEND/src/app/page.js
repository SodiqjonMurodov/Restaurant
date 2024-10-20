import Chefs from "./components/chefs/chefs";
import Header from "./components/Header";
import Services from "./components/services/services";
import Testimonials from "./components/testimonials/Testimonials";


export default function Home() {
  return (
    <div>
      <Header />
      <Services />
      <Chefs />
      <Testimonials />
    </div>
  )
}