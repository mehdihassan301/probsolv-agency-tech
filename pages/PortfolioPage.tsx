
import React from 'react';
import { portfolioItems } from '../components/constants';
import { Page } from '../types';

interface PortfolioPageProps {
  setPage: (page: Page, id?: string) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ setPage }) => {
  return (
    <>
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">Our Work</h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400">
            A selection of projects that showcase our commitment to quality, creativity, and results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl aspect-w-4 aspect-h-3">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-accent text-sm">{item.category}</p>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button
                          onClick={() => setPage('CaseStudy', item.id)}
                          className="font-semibold text-white bg-primary/80 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-primary"
                      >
                          View Case Study
                      </button>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
