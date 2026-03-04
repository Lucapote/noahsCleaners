import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';

export default function StatsBanner() {
    const { t } = useLanguage();
    const container = useRef();
    const textRef = useRef();
    const [index, setIndex] = useState(0);

    const stats = t('statsBanner.stats');

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIndex((prev) => (prev + 1) % stats.length);
            }
        });

        // Animación tipo contador analógico (entra desde abajo, sale hacia arriba)
        tl.fromTo(textRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        )
            .to(textRef.current, {
                y: -20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
                delay: 1.5 // Tiempo que se queda visible
            });

    }, { scope: container, dependencies: [index] });

    return (
        <aside ref={container} className="bg-blue-50 py-6 border-t border-b border-blue-100 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <p ref={textRef} className="text-primary font-bold text-sm md:text-base tracking-wide uppercase">
                    {stats[index]}
                </p>
            </div>
        </aside>
    );
}
