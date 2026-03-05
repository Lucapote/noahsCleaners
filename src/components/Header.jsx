import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t, toggleLanguage } = useLanguage();

    return (
        <header className="bg-white shadow-sm py-4 fixed w-full z-50">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-800">Noah's Cleaners</span>
                </div>

                {/* Navegación Desktop */}
                <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                    <a className="hover:text-secondary transition" href="#beneficios">{t('header.benefits')}</a>
                    <a className="hover:text-secondary transition" href="#processo">{t('header.process')}</a>
                    <a className="hover:text-secondary transition" href="#testimonios">{t('header.testimonials')}</a>
                </nav>

                {/* Botones Desktop */}
                <div className="hidden md:flex items-center space-x-4">
                    <a href="#diagnostico" className="bg-secondary hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded shadow transition duration-200 text-sm w-fit text-center">
                        {t('header.cta')}
                    </a>
                    <button onClick={toggleLanguage} className="text-sm font-bold text-gray-700">{t('header.langToggle')}</button>
                </div>

                {/* Botón Menú Móvil */}
                <button
                    className="md:hidden text-gray-600 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="material-icons-outlined text-3xl">
                        {isMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>

            {/* Menú Desplegable Móvil */}
            <div className={`md:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
                <div className="flex flex-col px-6 py-6 space-y-4">
                    <a onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-secondary font-medium" href="#beneficios">{t('header.benefits')}</a>
                    <a onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-secondary font-medium" href="#processo">{t('header.process')}</a>
                    <a onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-secondary font-medium" href="#testimonios">{t('header.testimonials')}</a>

                    <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                        <a href="#diagnostico" onClick={() => setIsMenuOpen(false)} className="bg-secondary hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded shadow transition duration-200 text-sm w-full max-w-[250px] text-center">
                            {t('header.cta')}
                        </a>
                        <button onClick={toggleLanguage} className="text-sm font-bold text-gray-700 text-left py-2">{t('header.langToggle')}</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
