import Hero from "./components/Hero.jsx";
import BirthdayLetter from "./components/BirthdayLetter.jsx";
import PhotoGallery from "./components/PhotoGallery.jsx";
import CafeMenu from "./components/CafeMenu.jsx";
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
        <BirthdayLetter />
        <PhotoGallery />
        <CafeMenu />
        <ProudOfMyself />
        <BirthdayCake />
        <SecretGift />
        <NewChapter />
        <BirthdayDate />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}
