import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();
    const container = useRef();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Animación de fondo suave (zoom out sutil + fade in)
        tl.from('.hero-bg', {
            scale: 1.1,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out'
        });

        // Animación de contenido escalonada
        tl.from('.hero-title', {
            y: isMobile ? 30 : 50,
            opacity: 0,
            duration: 1
        }, '-=1')
            .from('.hero-text', {
                y: isMobile ? 20 : 30,
                opacity: 0,
                duration: 1
            }, '-=0.8')
            .from('.hero-buttons', {
                y: isMobile ? 20 : 30,
                opacity: 0,
                duration: 1
            }, '-=0.8')
            .from('.hero-features', {
                y: 20,
                opacity: 0,
                duration: 1
            }, '-=0.8');

    }, { scope: container, dependencies: [isMobile] });

    return (
        <section ref={container} className="relative pt-32 pb-24 md:pt-48 md:pb-32 bg-gray-900 overflow-hidden h-screen">
            <div className="absolute inset-0 z-0">
                <img alt="Familia feliz en sala limpia" className="hero-bg w-full h-full object-cover opacity-60" src="./img/portada.webp" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
                <h1 className="hero-title text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                    {t('hero.title1')}<br />
                    <span className="text-secondary">{t('hero.title2')}</span>
                </h1>
                <p className="hero-text text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                    {t('hero.subtitle')}
                </p>
                <div className="hero-buttons flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
                    <a href="#diagnostico" className="bg-primary hover:bg-green-600 text-white font-bold py-3 px-8 rounded shadow-lg transition duration-200 w-full md:w-auto">
                        {t('hero.btnPrimary')}
                    </a>
                    <a href="#beneficios" className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded shadow-lg transition duration-200 w-full md:w-auto text-center">
                        {t('hero.btnSecondary')}
                    </a>
                </div>
                <div className="hero-features flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 text-sm text-white font-medium">
                    <div className="flex items-center gap-2">
                        <span className="material-icons-outlined text-primary">check_circle</span>
                        {t('hero.feature1')}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-icons-outlined text-primary">check_circle</span>
                        {t('hero.feature2')}
                    </div>
                </div>
            </div>
        </section>
    );
}
