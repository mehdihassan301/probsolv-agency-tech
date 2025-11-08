
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Page, Service } from '../types';
import ParticleBackground from '../components/ParticleBackground';
import { SpinnerIcon, ArrowRightIcon } from '../components/Icons';
import { blogPosts } from '../components/constants';

interface ServiceDetailPageProps {
  service: Service;
  setPage: (page: Page, id?: string) => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, setPage }) => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const benefitsRef = useRef<HTMLElement | null>(null);
  const processRef = useRef<HTMLElement | null>(null);
  const whyUsRef = useRef<HTMLElement | null>(null);

  const sectionLinks = [
    { id: 'benefits', title: 'Benefits' },
    { id: 'process', title: 'Our Process' },
    { id: 'why-us', title: 'Why ProbSolv?' }
  ];

  // Observer for individual process steps
  useEffect(() => {
    stepRefs.current = stepRefs.current.slice(0, service.process.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the vertical center
        threshold: 0,
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (ref) observer.unobserve(ref);
      });
    };
  }, [service.process]);

  // Observer for main page sections
  useEffect(() => {
    const sections = [
        { id: 'benefits', ref: benefitsRef.current },
        { id: 'process', ref: processRef.current },
        { id: 'why-us', ref: whyUsRef.current },
    ];
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        },
        {
            rootMargin: `-100px 0px -60% 0px`, // Trigger when section top is 100px from viewport top
        }
    );

    sections.forEach((section) => {
        if (section.ref) observer.observe(section.ref);
    });

    return () => {
        sections.forEach((section) => {
            if (section.ref) observer.unobserve(section.ref);
        });
    };
  }, []);


  const handleStepClick = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };
  
  const handleSectionLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const navbarHeight = 64; // From Navbar h-16
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // 20px margin

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[1-9]\d{6,14}$/.test(formState.phone.replace(/[\s-()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number with country code.';
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch('https://formspree.io/f/mpwozakj', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ ...formState, service: service.title, form_source: 'Service Detail Page' }),
            });

            if (response.ok) {
                setFormSubmitted(true);
            } else {
                throw new Error('Form submission failed.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setSubmitError('There was an error sending your request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  const relatedPosts = useMemo(() => {
    const keywords = service.title.toLowerCase().split(' ');
    const primaryKeyword = keywords.includes('ai') ? 'ai' : keywords.includes('vibe') ? 'vibe' : 'web';

    return blogPosts
        .filter(post => post.category.toLowerCase().includes(primaryKeyword))
        .slice(0, 2); // Get up to 2 posts
  }, [service]);


  return (
    <div className="pt-24 pb-16 sm:pb-20">
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center text-center px-4" aria-labelledby="service-hero-title">
        <ParticleBackground type="waves" />
        <div className="relative z-10">
          <h1 id="service-hero-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text_light dark:text-white drop-shadow-lg">{service.title}</h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-subtext_light dark:text-gray-300 drop-shadow-lg">{service.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Progress Indicator Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <nav aria-labelledby="service-navigation">
                <div className="mb-8">
                    <h3 id="service-navigation" className="font-bold text-lg text-text_light dark:text-text_dark mb-4">On This Page</h3>
                    <ul role="list" className="space-y-1">
                        {sectionLinks.map(link => (
                            <li key={link.id}>
                                <button
                                    onClick={() => handleSectionLinkClick(link.id)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                                        activeSection === link.id
                                        ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent font-semibold'
                                        : 'text-subtext_light dark:text-subtext_dark hover:bg-border_light/50 dark:hover:bg-border_dark/50 hover:text-text_light dark:hover:text-text_dark'
                                    }`}
                                >
                                    {link.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div role="navigation" aria-labelledby="process-heading">
                    <h3 id="process-heading" className="font-bold text-lg text-text_light dark:text-text_dark mb-4">Service Process Steps</h3>
                    <ul role="list" className="space-y-1">
                        {service.process.map((p, i) => (
                            <li key={i} role="listitem">
                                <button 
                                    onClick={() => handleStepClick(i)} 
                                    className={`w-full text-left flex items-center p-2 rounded-lg transition-colors duration-200 hover:bg-border_light/50 dark:hover:bg-border_dark/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-bg_dark ${activeStep === i ? 'bg-primary/10 dark:bg-primary/20' : ''}`}
                                    aria-current={activeStep === i ? 'step' : 'false'}
                                >
                                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 bg-surface_light dark:bg-surface_dark mr-3 flex-shrink-0" style={{borderColor: activeStep >= i ? 'var(--color-primary)' : 'currentColor'}} aria-hidden="true">
                                        {activeStep >= i && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                                    </div>
                                    <span className={`text-sm font-medium ${activeStep === i ? 'text-primary dark:text-accent' : 'text-subtext_light dark:text-subtext_dark hover:text-text_light dark:hover:text-text_dark'}`}>{p.step}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 lg:col-span-6">
            {/* Benefits */}
            <section ref={benefitsRef} id="benefits" className="mb-12 scroll-mt-24" aria-labelledby="benefits-heading">
              <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6">Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark p-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:scale-[1.02]">
                    <h3 className="text-lg font-semibold text-primary dark:text-accent">{benefit}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section ref={processRef} id="process" className="mb-12 scroll-mt-24" aria-labelledby="process-main-heading">
              <h2 id="process-main-heading" className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6">Our Step-by-Step Process</h2>
              <div className="space-y-6">
                {service.process.map((p, i) => (
                  <div key={i} ref={(el) => { stepRefs.current[i] = el; }} className="flex scroll-mt-24">
                    <div className="flex flex-col items-center mr-4" aria-hidden="true">
                      <div>
                        <div className="flex items-center justify-center w-10 h-10 border-2 border-primary rounded-full text-primary font-bold">
                          {i + 1}
                        </div>
                      </div>
                      {i < service.process.length - 1 && <div className="w-px h-full bg-primary/30"></div>}
                    </div>
                    <div className="pb-8">
                      <h3 className="mb-2 text-xl font-bold text-text_light dark:text-text_dark">{p.step}</h3>
                      <p className="text-subtext_light dark:text-subtext_dark">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Us */}
            <section ref={whyUsRef} id="why-us" className="scroll-mt-24" aria-labelledby="why-us-heading">
              <h2 id="why-us-heading" className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6">Why ProbSolv?</h2>
              <div className="space-y-6">
                {service.whyUs.map((reason, i) => (
                  <div key={i} className="bg-bg_light dark:bg-surface_dark p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
                    <h3 className="text-xl font-semibold text-text_light dark:text-text_dark mb-2">{reason.title}</h3>
                    <p className="text-subtext_light dark:text-subtext_dark">{reason.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Related Insights */}
            {relatedPosts.length > 0 && (
                <section id="related-insights" className="mt-16 scroll-mt-24" aria-labelledby="related-insights-heading">
                    <h2 id="related-insights-heading" className="text-2xl sm:text-3xl font-bold text-text_light dark:text-text_dark mb-6">Related Insights</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {relatedPosts.map((post) => (
                            <button
                                key={post.id}
                                onClick={() => setPage('BlogPost', post.id)}
                                className="group bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl text-left transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary dark:hover:border-accent flex flex-col"
                            >
                                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-xl">
                                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-primary dark:text-accent font-semibold mb-2">{post.category}</p>
                                    <h3 className="text-lg font-bold text-text_light dark:text-text_dark flex-grow">{post.title}</h3>
                                    <div className="mt-4 font-semibold text-primary dark:text-accent inline-flex items-center">
                                        Read More
                                        <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}
          </main>

          {/* Contact Form Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-28 space-y-8">
              <div className="bg-primary/10 border border-primary/30 p-6 rounded-lg text-center" role="status">
                <p className="font-semibold text-primary">Guarantee: Elite-quality delivery with revisions until satisfaction.</p>
                <p className="text-sm text-accent mt-2">Plus, a 7-Day Money-Back Promise.</p>
              </div>
              <div className="bg-surface_light dark:bg-surface_dark p-6 rounded-lg border border-border_light dark:border-border_dark">
                <h3 className="text-2xl font-bold text-text_light dark:text-text_dark mb-4 text-center">Start Your Project</h3>
                {formSubmitted ? (
                    <div className="text-center p-4 bg-green-500/20 text-green-400 dark:text-green-300 rounded-lg animate-fade-in" role="alert">
                        <h4 className="font-bold">Thank You!</h4>
                        <p>We've received your request and will be in touch shortly.</p>
                    </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="name" className="sr-only">Your Name</label>
                        <input id="name" name="name" type="text" placeholder="Your Name" value={formState.name} onChange={handleFormChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`} />
                        {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Your Email</label>
                        <input id="email" name="email" type="email" placeholder="Your Email" value={formState.email} onChange={handleFormChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`} />
                        {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="sr-only">Phone Number</label>
                        <input id="phone" name="phone" type="tel" placeholder="Phone Number (+1...)" value={formState.phone} onChange={handleFormChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`} />
                        {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="sr-only">Your Message</label>
                        <textarea id="message" name="message" placeholder="Your Message" rows={4} value={formState.message} onChange={handleFormChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}></textarea>
                        {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-purple-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface_dark disabled:opacity-70 flex items-center justify-center gap-2">
                        {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                        {isSubmitting ? 'Sending...' : 'Request a Quote'}
                    </button>
                    {submitError && <p className="mt-2 text-sm text-center text-red-600 dark:text-red-400">{submitError}</p>}
                  </form>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
