import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProcessStep from "./ProcessStep";
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
    const { t } = useLanguage();
    const container = useRef();
    const steps = t('process.steps');
    const stepsData = [
        {
            number: 1,
            ...steps[0]
        },
        {
            number: 2,
            ...steps[1]
        },
        {
            number: 3,
            ...steps[2]
        },
        {
            number: 4,
            ...steps[3]
        }
    ];

    useGSAP(() => {
        // Animación del título (Pop suave)
        gsap.from('.process-title', {
            scrollTrigger: {
                trigger: '.process-title',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });

        // Animación de los pasos (Pop individual para cada uno)
        const steps = gsap.utils.toArray('ol li');
        steps.forEach((step) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 80,
                opacity: 0,
                scale: 0.8,
                duration: 0.7,
                ease: 'back.out(1.7)'
            });
        });
    }, { scope: container });

    return (
        <section ref={container} id="processo" className="py-20 bg-background-light">
            <div className="container mx-auto px-4">
                <h2 className="process-title text-3xl font-bold text-center text-gray-900 mb-16">{t('process.title')}</h2>
                <ol className="relative max-w-4xl mx-auto">
                    <div className="hidden md:block absolute left-[27px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    {stepsData.map((step, index) => (
                        <ProcessStep key={index} {...step} isLastStep={index === stepsData.length - 1} />
                    ))}
                </ol>
                <div className="mt-16 text-center">
                    <a href="#diagnostico" className="inline-block bg-primary hover:bg-green-600 text-white font-bold py-3 px-10 rounded shadow-lg transition duration-200 w-full md:w-auto">
                        {t('hero.btnPrimary')}
                    </a>
                </div>
            </div>
        </section>
    );
}
