export default function BenefitCard({ icon, iconColorClass, bgColorClass, title, description }) {
    return (
        <article className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition border border-gray-100 text-left">
            <div className={`w-12 h-12 ${bgColorClass} rounded-full flex items-center justify-center mb-6`}>
                <span className={`material-icons-outlined ${iconColorClass} text-2xl`}>{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
                {description}
            </p>
        </article>
    );
}
