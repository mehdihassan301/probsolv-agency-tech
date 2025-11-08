import React, { useState } from 'react';
import { serviceDetails } from '../components/constants';
import { SpinnerIcon } from '../components/Icons';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }
    if (!formState.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\+?[1-9]\d{6,14}$/.test(formState.phone.replace(/[\s-()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number with country code.';
    }
    if (!formState.projectType) {
      newErrors.projectType = 'Please select a project type.';
    }
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const response = await fetch('https://formspree.io/f/mpwozakj', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formState),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          throw new Error('Form submission failed.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitError('Sorry, there was an issue sending your message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };


  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text_light dark:text-text_dark">Get In Touch</h1>
        <p className="mt-4 text-base md:text-lg text-subtext_light dark:text-subtext_dark">
          Have a project in mind? Let's talk. We're here to help you turn your ideas into reality.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-surface_light dark:bg-surface_dark border border-border_light dark:border-border_dark rounded-xl p-8 md:p-12">
        {submitted ? (
          <div className="text-center py-10 animate-fade-in">
            <h2 className="text-2xl font-bold text-primary dark:text-accent mb-4">Thank you for your message!</h2>
            <p className="text-subtext_light dark:text-subtext_dark">We've received your submission and will get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Full Name</label>
              <input type="text" name="name" id="name" value={formState.name} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
              {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Email Address</label>
                <input type="email" name="email" id="email" value={formState.email} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Phone Number</label>
                <input type="tel" name="phone" id="phone" placeholder="+1 (555) 123-4567" value={formState.phone} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}/>
                {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Project Type</label>
              <select name="projectType" id="projectType" value={formState.projectType} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark ${errors.projectType ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}>
                <option value="" disabled>Select a service...</option>
                {serviceDetails.map(service => (
                  <option key={service.id} value={service.title}>{service.title}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {errors.projectType && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectType}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-subtext_light dark:text-subtext_dark mb-2">Message</label>
              <textarea name="message" id="message" rows={5} value={formState.message} onChange={handleChange} className={`w-full bg-bg_light dark:bg-bg_dark border rounded-md p-3 text-text_light dark:text-text_dark placeholder-subtext_light ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-border_light dark:border-border_dark focus:ring-primary focus:border-primary'}`}></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
            </div>
            <div>
              <button type="submit" disabled={isSubmitting} className="w-full px-8 py-4 bg-primary text-white font-bold rounded-lg text-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/30 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {isSubmitting && <SpinnerIcon className="w-5 h-5" />}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {submitError && <p className="mt-4 text-center text-red-600 dark:text-red-400">{submitError}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;