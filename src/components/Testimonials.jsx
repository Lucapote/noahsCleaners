import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
    const { t } = useLanguage();
    const container = useRef();

    useGSAP(() => {
        // Animación de escala y transparencia (Zoom In)
        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: '.testimonial-card',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.5,      // Empieza al 80% de su tamaño (chiquito)
            opacity: 0,      // Empieza invisible
            duration: 1,
            ease: 'back.out(1.5)' // Efecto de rebote suave al final
        });

        // Animación simple para el título y estrellas
        gsap.from('.testimonial-header', {
            scrollTrigger: {
                trigger: '.testimonial-header',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    }, { scope: container });

    return (
        <section ref={container} id="testimonios" className="py-20 bg-beige">
            <div className="container mx-auto px-4">
                <div className="testimonial-header text-center mb-12">
                    <div className="flex justify-center mb-2">
                        <span className="material-icons text-yellow-400">star</span>
                        <span className="material-icons text-yellow-400">star</span>
                        <span className="material-icons text-yellow-400">star</span>
                        <span className="material-icons text-yellow-400">star</span>
                        <span className="material-icons text-yellow-400">star</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{t('testimonials.title')}</h2>
                </div>
                <div className="testimonial-card max-w-5xl mx-auto flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                        <div className="absolute inset-0 flex">
                            <img alt="Before and after air duct cleaning in Orlando homes" className="w-full h-full object-cover border-r border-white/20" src="./img/vent-1.webp" />
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                        <span className="absolute top-8 right-8 text-6xl text-gray-100 font-serif leading-none">”</span>
                        <blockquote className="text-gray-700 italic mb-8 relative z-10">
                            {t('testimonials.quote')}
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <img alt="Satisfied customer of Orlando duct cleaning service" className="w-12 h-12 rounded-full object-cover" src="./img/review.webp" />
                            <div>
                                <h4 className="font-bold text-gray-900">{t('testimonials.author')}</h4>
                                <p className="text-xs text-gray-500">{t('testimonials.location')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
