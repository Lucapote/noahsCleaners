import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
    const { t } = useLanguage();
    const container = useRef();
    const [diagnosticResult, setDiagnosticResult] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const problems = formData.getAll('problemas');
        const numProblems = problems.length;

        let status, title, message, colorClass, icon, headerBgClass;

        if (numProblems >= 2) {
            status = 'urgent';
            title = t('contactForm.resultUrgentTitle');
            message = t('contactForm.resultUrgentMsg');
            colorClass = 'bg-red-50 text-red-800 border-red-200';
            headerBgClass = 'bg-red-500';
            icon = 'error_outline';
        } else if (numProblems === 1) {
            status = 'warning';
            title = t('contactForm.resultWarningTitle');
            message = t('contactForm.resultWarningMsg');
            colorClass = 'bg-yellow-50 text-yellow-800 border-yellow-200';
            headerBgClass = 'bg-yellow-500';
            icon = 'warning_amber';
        } else {
            status = 'good';
            title = t('contactForm.resultGoodTitle');
            message = t('contactForm.resultGoodMsg');
            colorClass = 'bg-green-50 text-green-800 border-green-200';
            headerBgClass = 'bg-green-500';
            icon = 'check_circle_outline';
        }

        setDiagnosticResult({ status, title, message, colorClass, headerBgClass, icon });
        setIsSubmitted(true);
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top 75%', // Inicia cuando el top de la sección está al 75% de la pantalla
                toggleActions: 'play none none reverse'
            }
        });

        tl.from('.anim-header', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            .from('.anim-form', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5'); // Se solapa un poco con la animación anterior

    }, { scope: container });

    return (
        <section ref={container} id="diagnostico" className="py-20 bg-background-light">
            <div className="container mx-auto px-4">
                <div className="anim-header text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('contactForm.title')}</h2>
                    <p className="text-gray-600">{t('contactForm.subtitle')}</p>
                </div>
                <div className="anim-form max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    <div className={`p-4 text-center transition-colors duration-500 ${isSubmitted && diagnosticResult ? diagnosticResult.headerBgClass : 'bg-secondary'}`}>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider">
                            {!isSubmitted ? t('contactForm.formTitle') : diagnosticResult?.title}
                        </h3>
                    </div>

                    {diagnosticResult && (
                        <div className={`m-8 p-6 rounded-lg border flex gap-4 items-start transition-all duration-500 max-h-40 opacity-100 ${diagnosticResult.colorClass}`}>
                            <span className="material-icons text-3xl mt-0.5">{diagnosticResult.icon}</span>
                            <div>
                                <h4 className="font-bold text-lg mb-2">{diagnosticResult.title}</h4>
                                <p className="text-base">{diagnosticResult.message}</p>
                            </div>
                        </div>
                    )}

                    <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isSubmitted ? 'max-h-0 opacity-0' : 'max-h-[1500px] opacity-100'}`}>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <fieldset>
                                <legend className="block text-sm font-semibold text-gray-700 mb-3">{t('contactForm.propertyType')}</legend>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="cursor-pointer">
                                        <input defaultChecked className="peer sr-only" name="property_type" type="radio" value="casa" />
                                        <div className="rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-center hover:bg-gray-50 peer-checked:border-secondary peer-checked:bg-blue-50 transition">
                                            <span className="material-icons-outlined text-gray-500 peer-checked:text-secondary mb-1">home</span>
                                            <span className="text-sm font-medium text-gray-700">{t('contactForm.house')}</span>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input className="peer sr-only" name="property_type" type="radio" value="local" />
                                        <div className="rounded-lg border border-gray-200 p-4 flex flex-col items-center justify-center hover:bg-gray-50 peer-checked:border-secondary peer-checked:bg-blue-50 transition">
                                            <span className="material-icons-outlined text-gray-500 peer-checked:text-secondary mb-1">store</span>
                                            <span className="text-sm font-medium text-gray-700">{t('contactForm.store')}</span>
                                        </div>
                                    </label>
                                </div>
                            </fieldset>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="rejillas" className="block text-sm font-semibold text-gray-700 mb-2">{t('contactForm.vents')}</label>
                                    <select required defaultValue="" id="rejillas" name="rejillas" className="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-secondary focus:ring focus:ring-secondary/20 py-2.5 px-3">
                                        <option value="" disabled>{t('contactForm.selectOptionPlaceholder')}</option>
                                        <option value="5-10">5 - 10</option>
                                        <option value="10-15">10 - 15</option>
                                        <option value="15-20">15 - 20</option>
                                        <option value="20+">20+</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="last_cleaned" className="block text-sm font-semibold text-gray-700 mb-2">{t('contactForm.lastCleaned')}</label>
                                    <select required defaultValue="" id="last_cleaned" name="last_cleaned" className="w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-secondary focus:ring focus:ring-secondary/20 py-2.5 px-3">
                                        <option value="" disabled>{t('contactForm.selectOptionPlaceholder')}</option>
                                        <option value="never">{t('contactForm.lastCleanedOptions.never')}</option>
                                        <option value="less_than_1">{t('contactForm.lastCleanedOptions.lessThan1')}</option>
                                        <option value="1_to_3">{t('contactForm.lastCleanedOptions.oneToThree')}</option>
                                        <option value="more_than_3">{t('contactForm.lastCleanedOptions.moreThan3')}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="md:w-1/2 md:pr-3">
                                <label htmlFor="zipcode" className="block text-sm font-semibold text-gray-700 mb-2">{t('contactForm.zipcode')}</label>
                                <input required id="zipcode" name="zipcode" className="w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-secondary focus:ring focus:ring-secondary/20 py-2.5 px-3" placeholder={t('contactForm.zipcodePlaceholder')} type="text" />
                            </div>

                            <fieldset>
                                <legend className="block text-sm font-semibold text-gray-700 mb-3">{t('contactForm.problems')}</legend>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input name="problemas" value="polvo_olores" className="rounded border-gray-300 text-secondary focus:ring-secondary" type="checkbox" />
                                        <span className="text-sm text-gray-600">{t('contactForm.problem1')}</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input name="problemas" value="alergias" className="rounded border-gray-300 text-secondary focus:ring-secondary" type="checkbox" />
                                        <span className="text-sm text-gray-600">{t('contactForm.problem2')}</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input name="problemas" value="luz_alta" className="rounded border-gray-300 text-secondary focus:ring-secondary" type="checkbox" />
                                        <span className="text-sm text-gray-600">{t('contactForm.problem3')}</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input name="problemas" value="ac_no_enfria" className="rounded border-gray-300 text-secondary focus:ring-secondary" type="checkbox" />
                                        <span className="text-sm text-gray-600">{t('contactForm.problem4')}</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input name="problemas" value="secadora" className="rounded border-gray-300 text-secondary focus:ring-secondary" type="checkbox" />
                                        <span className="text-sm text-gray-600">{t('contactForm.problem5')}</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input name="problemas" value="humedad_moho" className="rounded border-gray-300 text-secondary focus:ring-secondary" type="checkbox" />
                                        <span className="text-sm text-gray-600">{t('contactForm.problem6')}</span>
                                    </label>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="block text-sm font-semibold text-gray-700 mb-3">{t('contactForm.contactData')}</legend>
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="nombre" className="sr-only">{t('contactForm.namePlaceholder')}</label>
                                        <input required id="nombre" name="nombre" className="w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-secondary focus:ring focus:ring-secondary/20 py-2.5 px-3" placeholder={t('contactForm.namePlaceholder')} type="text" />
                                    </div>
                                    <div>
                                        <label htmlFor="telefono" className="sr-only">{t('contactForm.phonePlaceholder')}</label>
                                        <input required id="telefono" name="telefono" className="w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-secondary focus:ring focus:ring-secondary/20 py-2.5 px-3" placeholder={t('contactForm.phonePlaceholder')} type="tel" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">{t('contactForm.emailPlaceholder')}</label>
                                    <input required id="email" name="email" className="w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-secondary focus:ring focus:ring-secondary/20 py-2.5 px-3" placeholder={t('contactForm.emailPlaceholder')} type="email" />
                                </div>
                            </fieldset>

                            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-xs text-gray-400 text-center md:text-left">{t('contactForm.secureText')}</p>

                                <button className="bg-primary hover:bg-green-600 text-white font-bold py-3 px-8 rounded shadow-lg transition duration-200 w-full md:w-auto" type="submit">
                                    {t('contactForm.submitBtn')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
