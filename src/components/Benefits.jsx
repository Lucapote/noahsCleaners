import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from 'react-responsive';
import BenefitCard from './BenefitCard';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
    const { t } = useLanguage();
    const container = useRef();
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const items = t('benefits.items');
    const benefitsData = [
        {
            icon: 'savings',
            bgColorClass: 'bg-green-100',
            iconColorClass: 'text-green-600',
            ...items[0]
        },
        {
            icon: 'ac_unit',
            bgColorClass: 'bg-blue-100',
            iconColorClass: 'text-blue-600',
            ...items[1]
        },
        {
            icon: 'health_and_safety',
            bgColorClass: 'bg-red-100',
            iconColorClass: 'text-red-600',
            ...items[2]
        }
    ];

    useGSAP(() => {
        if (isMobile) {
            // Animación para Móvil: Triggers individuales para cada elemento
            gsap.from('.anim-title', {
                scrollTrigger: {
                    trigger: '.anim-title',
                    start: 'top 90%',
                    end: 'bottom 60%',
                    scrub: 1
                },
                x: -50,
                opacity: 0,
                ease: 'power3.out'
            });

            gsap.from('.anim-text', {
                scrollTrigger: {
                    trigger: '.anim-text',
                    start: 'top 90%',
                    end: 'bottom 60%',
                    scrub: 1
                },
                x: -50,
                opacity: 0,
                ease: 'power3.out'
            });

            const cards = container.current.querySelectorAll('.anim-card');
            cards.forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        end: 'center center',
                        scrub: 1
                    },
                    x: -50,
                    opacity: 0,
                    ease: 'power3.out'
                });
            });
        } else {
            // Animación para Desktop (Deslizamiento vertical desde abajo)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.from('.anim-title', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
                .from('.anim-text', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6')
                .from('.anim-card', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out'
                }, '-=0.6');
        }
    }, { scope: container, dependencies: [isMobile] });

    return (
        <section ref={container} id="beneficios" className="py-20 bg-beige">
            <div className="max-w-[960px] w-full px-4 py-16 md:py-24 container mx-auto text-center">
                <h2 className="anim-title text-3xl font-bold text-gray-900 mb-4">{t('benefits.title')}</h2>
                <p className="anim-text text-gray-600 mb-12 max-w-xl mx-auto">
                    {t('benefits.subtitle')}
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {benefitsData.map((benefit, index) => (
                        <div key={index} className="anim-card">
                            <BenefitCard {...benefit} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
