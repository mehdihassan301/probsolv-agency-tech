
import React from 'react';
import { Page, PortfolioItem } from '../types';
import ParticleBackground from '../components/ParticleBackground';

interface CaseStudyPageProps {
  item: PortfolioItem;
  setPage: (page: Page) => void;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ item, setPage }) => {
  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center text-center">
        <div className="absolute inset-0">
            <img src={item.heroImage} alt={item.title} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-white/70 dark:bg-black/60"></div>
        </div>
        <ParticleBackground type="dots" />
        <div className="relative z-10 container mx-auto px-4">
          <p className="text-primary dark:text-accent font-semibold mb-2 drop-shadow-lg">{item.category}</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold max-w-4xl mx-auto drop-shadow-lg text-text_light dark:text-white">{item.title}</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto">
          {/* The Challenge */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-4">The Challenge</h2>
            <p className="text-lg text-subtext_light dark:text-subtext_dark leading-relaxed">{item.challenge}</p>
          </section>

          {/* The Solution */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-8">Our Solution</h2>
            <div className="space-y-12">
              {item.solution.map((step, index) => (
                <div key={index} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                  <div className={`overflow-hidden rounded-lg shadow-lg ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary dark:text-accent mb-2">{`0${index + 1}. ${step.title}`}</h3>
                    <p className="text-subtext_light dark:text-subtext_dark">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* The Results */}
          <section className="mb-12 bg-bg_light dark:bg-surface_dark py-12 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-8 text-center">The Results</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
              {item.results.map((result, index) => (
                <div key={index} className="p-6">
                  <p className="text-4xl font-bold text-primary dark:text-accent">{result.value}</p>
                  <h3 className="text-lg font-semibold text-text_light dark:text-text_dark mt-2">{result.metric}</h3>
                  <p className="text-sm text-subtext_light dark:text-subtext_dark mt-1">{result.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Technologies Used */}
          <section className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6">Technologies Used</h2>
              <div className="flex flex-wrap justify-center gap-4">
                  {item.technologies.map((tech) => (
                      <div key={tech} className="bg-border_light dark:bg-border_dark text-subtext_light dark:text-text_dark font-medium py-2 px-4 rounded-full">
                          {tech}
                      </div>
                  ))}
              </div>
          </section>

           {/* CTA */}
           <div className="mt-16 text-center">
                <button
                    onClick={() => setPage('Contact')}
                    className="px-8 py-4 bg-primary text-white font-bold rounded-lg text-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30"
                >
                    Start Your Next Project
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
