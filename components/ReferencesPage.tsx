import React from 'react';
import { Translations } from '../App';

const ReferencesPage: React.FC<{ t: Translations }> = ({ t }) => {
  return (
    <section className="space-y-16 md:space-y-24" aria-labelledby="references-heading">
      <header className="text-center">
        <h1 id="references-heading" className="text-3xl sm:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">
          {t.references.title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-text-muted">
          {t.references.description}
        </p>
      </header>

      <div className="container grid gap-8 grid-cols-1 @834px:grid-cols-2 @1440px:grid-cols-3">
        {t.references.testimonials.map((testimonial, index) => (
          <figure key={index} className="content-visibility-auto bg-surface-1 rounded-lg border-2 border-text-primary p-6 flex flex-col h-full transition-all duration-300 hover:shadow-warhol animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <blockquote className="flex-grow">
              <p className="text-text-muted italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-6 pt-6 border-t border-border">
              <p className="font-bold text-text-primary">{testimonial.author}</p>
              <p className="text-sm text-accent">{testimonial.company}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default ReferencesPage;