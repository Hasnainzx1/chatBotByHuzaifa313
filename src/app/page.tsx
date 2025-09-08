import { ChatPage } from "./ChatPage/page";
import Footer from "./Components/Footer";
import { LanguageProvider } from "./Components/LanguageContext";
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col" style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Navbar />
        <div className="flex-1 overflow-hidden">
          <ChatPage />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  )
}