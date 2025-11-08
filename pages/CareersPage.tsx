import React, { useState } from 'react';
import { Page } from '../types';
import { jobOpenings } from '../components/constants';
import { ChevronDownIcon, WebDevIcon, VibeCodeIcon, AIIcon } from '../components/Icons';

interface CareersPageProps {
  setPage: (page: Page) => void;
}

const JobOpeningCard: React.FC<{ job: typeof jobOpenings[0], isOpen: boolean, onToggle: () => void, setPage: (page: Page) => void }> = ({ job, isOpen, onToggle, setPage }) => {
  return (
    <div className="border border-border_light dark:border-border_dark rounded-xl bg-surface_light dark:bg-surface_dark backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary dark:hover:border-accent hover:shadow-lg">
      <div className="p-6 md:p-8 cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl sm:text-2xl font-bold text-text_light dark:text-text_dark">{job.title}</h3>
                <div className="flex items-center space-x-4 text-subtext_light dark:text-subtext_dark mt-2 text-sm">
                    <span>{job.location}</span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>{job.type}</span>
                </div>
            </div>
            <ChevronDownIcon className={`w-6 h-6 text-subtext_light dark:text-subtext_dark transition-transform duration-300 flex-shrink-0 mt-1 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </div>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="px-6 md:px-8 pb-8">
          <p className="text-subtext_light dark:text-subtext_dark mb-6">{job.description}</p>
          
          <h4 className="text-lg font-semibold text-text_light dark:text-text_dark mb-3">Responsibilities:</h4>
          <ul className="list-disc list-inside space-y-2 text-subtext_light dark:text-subtext_dark mb-6">
            {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
          
          <h4 className="text-lg font-semibold text-text_light dark:text-text_dark mb-3">Qualifications:</h4>
          <ul className="list-disc list-inside space-y-2 text-subtext_light dark:text-subtext_dark mb-6">
            {job.qualifications.map((q, i) => <li key={i}>{q}</li>)}
          </ul>

          <button
            onClick={() => setPage('Contact')}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-purple-600 transition-colors duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

const CareersPage: React.FC<CareersPageProps> = ({ setPage }) => {
  const [openJob, setOpenJob] = useState<string | null>(null);

  const toggleJob = (id: string) => {
    setOpenJob(openJob === id ? null : id);
  };
  
  const cultureItems = [
    { icon: WebDevIcon, title: 'Innovate & Create', description: 'Work with modern tools on challenging projects that push the boundaries of technology.' },
    { icon: VibeCodeIcon, title: 'Culture of Excellence', description: 'We are passionate about our craft and strive for the highest quality in everything we do.' },
    { icon: AIIcon, title: 'Growth & Learning', description: 'We invest in our team\'s growth with continuous learning opportunities and mentorship.' },
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">Join Our Team</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          We're building the future of digital systems, and we're looking for passionate, talented people to join us on our mission.
        </p>
      </div>

      <section className="py-12 sm:py-16 bg-bg_light dark:bg-surface_dark rounded-xl mb-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-12">Why Work at ProbSolv?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
                {cultureItems.map((item) => (
                    <div key={item.title} className="group flex flex-col items-center">
                        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                            <item.icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-12deg]" />
                        </div>
                        <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">{item.title}</h3>
                        <p className="text-subtext_light dark:text-subtext_dark">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-8 text-center">Current Openings</h2>
        <div className="space-y-6">
            {jobOpenings.map(job => (
                <JobOpeningCard 
                    key={job.id}
                    job={job}
                    isOpen={openJob === job.id}
                    onToggle={() => toggleJob(job.id)}
                    setPage={setPage}
                />
            ))}
        </div>
        <div className="text-center mt-12 p-8 bg-bg_light dark:bg-surface_dark rounded-lg">
            <h3 className="text-2xl font-bold text-text_light dark:text-text_dark">Don't see your role?</h3>
            <p className="text-subtext_light dark:text-subtext_dark mt-2 mb-4">We're always looking for talented individuals. If you believe you're a great fit for our team, we'd love to hear from you.</p>
            <button
                onClick={() => setPage('Contact')}
                className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-purple-600 transition-colors duration-300"
            >
                Get In Touch
            </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;