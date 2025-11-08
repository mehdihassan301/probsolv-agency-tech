import React, { useState, useEffect, useCallback } from 'react';
import { testimonials } from './constants';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < rating ? 'fill-current' : 'text-border_light dark:text-border_dark'}`} viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        ))}
    </div>
);

const TestimonialsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };
    
    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    }

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <div className="relative w-full max-w-4xl mx-auto" aria-roledescription="carousel" aria-label="Client testimonials">
            <div className="overflow-hidden relative h-96 sm:h-80">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${testimonials.length}`}
                        aria-hidden={index !== currentIndex}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transitionDelay: `${index === currentIndex ? '200ms' : '0ms'}` }}
                    >
                        <div className="flex flex-col items-center justify-center text-center h-full p-4">
                             <StarRating rating={testimonial.stars} />
                             <blockquote className="text-subtext_light dark:text-subtext_dark text-lg md:text-xl italic my-4 max-w-2xl">
                                “{testimonial.message}”
                            </blockquote>
                            <div>
                                <p className="font-bold text-text_light dark:text-text_dark">{testimonial.name}</p>
                                <p className="text-sm text-subtext_light dark:text-subtext_dark">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button 
                onClick={prevSlide}
                className="absolute top-1/2 left-0 sm:-left-12 transform -translate-y-1/2 p-2 rounded-full bg-surface_light/50 dark:bg-surface_dark/50 hover:bg-surface_light dark:hover:bg-surface_dark text-text_light dark:text-text_dark shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous testimonial"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-0 sm:-right-12 transform -translate-y-1/2 p-2 rounded-full bg-surface_light/50 dark:bg-surface_dark/50 hover:bg-surface_light dark:hover:bg-surface_dark text-text_light dark:text-text_dark shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next testimonial"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary w-6' : 'bg-border_light dark:bg-border_dark hover:bg-primary/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentIndex ? "true" : "false"}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialsCarousel;