import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';

export default function LocalBanner() {
    const { t } = useLanguage();
    const container = useRef();
    const textRef = useRef();
    const [index, setIndex] = useState(0);

    const messages = t('localBanner.messages');

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIndex((prev) => (prev + 1) % messages.length);
            }
        });

        // Animación de desvanecimiento invertido (fade-in, fade-out lateral)
        tl.fromTo(textRef.current,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        )
            .to(textRef.current, {
                x: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in",
                delay: 2.5 // Tiempo visible
            });

    }, { scope: container, dependencies: [index] });

    return (
        <div ref={container} className="bg-yellow-100 py-6 overflow-hidden">
            <div className="container mx-auto px-4 text-center h-5 flex items-center justify-center">
                <p ref={textRef} className="text-yellow-800 text-md font-bold m-0 leading-none">
                    {messages[index]}
                </p>
            </div>
        </div>
    );
}
