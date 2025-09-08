import ChatPage from "./ChatPage/page";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { LanguageProvider } from "./Components/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-hidden">
          <ChatPage />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
