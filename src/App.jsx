import Header from './components/Header';
import Hero from './components/Hero';
import LocalBanner from './components/LocalBanner';
import Benefits from './components/Benefits';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import StatsBanner from './components/StatsBanner';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="bg-background-light text-gray-800 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <LocalBanner />
        <Benefits />
        <Process />
        <Testimonials />
        <StatsBanner />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
