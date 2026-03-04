export default function ProcessStep({ number, title, description, note, isLastStep }) {
    return (
        <li className={`relative flex items-start gap-6 ${!isLastStep ? 'pb-12' : ''}`}>
            <div className="flex-shrink-0 z-10 w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-4 border-white">{number}</div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-2">{description}</p>
                <p className="text-secondary text-sm font-medium">{note}</p>
            </div>
        </li>
    );
}
