import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-footer text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-left text-xl font-bold">
                    Noah's Cleaners
                </div>
                <div className="text-center md:text-right text-xs text-white space-y-1">
                    <p>{t('footer.copyright')}</p>
                    <p>{t('footer.serviceArea')}</p>
                </div>
            </div>
        </footer>
    );
}
