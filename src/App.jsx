import Hero from "./components/Hero.jsx";
import Ribbons from "./components/Ribbons.jsx";
import BirthdayLetter from "./components/BirthdayLetter.jsx";
import PhotoGallery from "./components/PhotoGallery.jsx";
import CafeMenu from "./components/CafeMenu.jsx";
import Fortune from "./components/Fortune.jsx";
import ProudOfMyself from "./components/ProudOfMyself.jsx";
import BirthdayCake from "./components/BirthdayCake.jsx";
import SecretGift from "./components/SecretGift.jsx";
import NewChapter from "./components/NewChapter.jsx";
import BirthdayDate from "./components/BirthdayDate.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import Footer from "./components/Footer.jsx";
import FloatingDecorations from "./components/FloatingDecorations.jsx";

export default function App() {
  return (
    <div className="page">
      <FloatingDecorations />
      <main>
        <Hero />
        <Ribbons />
        <BirthdayLetter />
        <PhotoGallery />
        <CafeMenu />
        <Fortune />
        <ProudOfMyself />
        <SecretGift />
        {/* Night (wish) flows into dawn (new chapter). */}
        <BirthdayCake />
        <NewChapter />
        <BirthdayDate />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}
