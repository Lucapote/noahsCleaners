import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-footer text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-6">
                <div className="flex flex-col items-center md:items-start gap-6">
                    <div className="text-xl font-bold">
                        Noah's Cleaners
                    </div>
                    <div className="flex flex-col sm:flex-col items-center sm:items-start gap-6 sm:gap-6 text-sm text-gray-300">
                        <span className="sr-only">{t('footer.callUs')}</span>
                        <a href="tel:+13215022611" className="flex items-center gap-2 hover:text-primary transition-colors" aria-label={`${t('footer.callUs')} (321) 502-2611`}>
                            <span className="material-icons-outlined text-lg" aria-hidden="true">phone</span>
                            (321) 502-2611
                        </a>
                        <a href="tel:+19293946659" className="flex items-center gap-2 hover:text-primary transition-colors" aria-label={`${t('footer.callUs')} (929) 394-6659`}>
                            <span className="material-icons-outlined text-lg" aria-hidden="true">phone</span>
                            (929) 394-6659
                        </a>
                    </div>
                </div>
                <div className="text-center md:text-right text-xs text-white space-y-1">
                    <p>{t('footer.copyright')}</p>
                    <p>{t('footer.serviceArea')}</p>
                </div>
            </div>
        </footer>
    );
}
