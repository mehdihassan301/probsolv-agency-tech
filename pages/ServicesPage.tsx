import React, { useState } from 'react';
import { Page } from '../types';
import { serviceDetails } from '../components/constants';
import { ChevronDownIcon } from '../components/Icons';

interface ServicesPageProps {
  setPage: (page: Page, serviceId?: string) => void;
}

const ServiceCard: React.FC<{ service: typeof serviceDetails[0], isOpen: boolean, onToggle: () => void, setPage: (page: Page, serviceId?: string) => void }> = ({ service, isOpen, onToggle, setPage }) => {
  return (
    <div className="group border border-border_light dark:border-border_dark rounded-xl bg-surface_light dark:bg-surface_dark backdrop-blur-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20 dark:hover:shadow-primary/20 hover:border-primary dark:hover:border-accent">
      <div className="p-4 sm:p-6 md:p-8 cursor-pointer flex justify-between items-center" onClick={onToggle}>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
            <service.icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-text_light dark:text-text_dark">{service.title}</h3>
            <p className="text-subtext_light dark:text-subtext_dark mt-1 text-sm sm:text-base">{service.description}</p>
          </div>
        </div>
        <ChevronDownIcon className={`w-6 h-6 text-subtext_light dark:text-subtext_dark transition-transform duration-300 ml-4 flex-shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-4 border-t border-border_light dark:border-border_dark">
          
          <p className="text-subtext_light dark:text-subtext_dark mb-8 text-sm sm:text-base leading-relaxed">{service.overview}</p>
          
          <div className="grid md:grid-cols-2 md:gap-x-12">
            {/* Left Column */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-text_light dark:text-text_dark mb-4">Our Process</h4>
              <ol className="list-decimal list-inside space-y-3 text-subtext_light dark:text-subtext_dark text-sm sm:text-base">
                {service.process.slice(0, 4).map(p => <li key={p.step}><strong>{p.step}</strong></li>)}
              </ol>
            </div>
            
            {/* Right Column */}
            <div className="mt-8 md:mt-0">
              <h4 className="text-base sm:text-lg font-semibold text-text_light dark:text-text_dark mb-4">Key Benefits</h4>
              <ul className="list-disc list-inside space-y-2 text-subtext_light dark:text-subtext_dark mb-6 text-sm sm:text-base">
                {service.benefits.slice(0, 4).map(b => <li key={b}>{b}</li>)}
              </ul>
              
              <h4 className="text-base sm:text-lg font-semibold text-text_light dark:text-text_dark mb-4 mt-8">Deliverables</h4>
              <ul className="list-disc list-inside space-y-2 text-subtext_light dark:text-subtext_dark text-sm sm:text-base">
                {service.deliverables.slice(0, 4).map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>
          
          <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg text-center mt-8">
            <p className="font-semibold text-primary text-sm sm:text-base">Guarantee: Elite-quality delivery with revisions until satisfaction.</p>
            <p className="text-sm text-accent">Plus, a 7-Day Money-Back Promise.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
             <button
              onClick={() => setPage('ServiceDetail', service.id)}
              className="w-full sm:w-auto px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/10 transition-colors duration-300"
            >
              Learn More
            </button>
            <button
              onClick={() => setPage('Contact')}
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-purple-600 transition-colors duration-300"
            >
              Build With ProbSolv
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};


const ServicesPage: React.FC<ServicesPageProps> = ({ setPage }) => {
  const [openService, setOpenService] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenService(openService === id ? null : id);
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">Our Services</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          We provide cutting-edge digital solutions to elevate your business.
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        {serviceDetails.map(service => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            isOpen={openService === service.id} 
            onToggle={() => toggleService(service.id)}
            setPage={setPage}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;