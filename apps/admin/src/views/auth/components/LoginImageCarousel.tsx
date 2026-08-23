/**
 * Displays the testimonial image carousel used alongside the login form.
 *
 * Key Features:
 * - Loops through the configured testimonial slides.
 * - Renders each slide's image, accessible alternative text, quote, and attribution.
 * - Provides previous and next controls through the shared carousel components.
 *
 * @component
 */

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@my-monorepo/ui';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&h=1400&fit=crop&auto=format',
    alt: 'Team members collaborating around a laptop in a bright workspace',
    quote:
      'Signing up took less than two minutes, and the onboarding flow made it easy to get my profile ready for my first client call.',
    name: 'Janelle Carter',
    role: 'Product Designer | Austin, Texas',
  },
  {
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&h=1400&fit=crop&auto=format',
    alt: 'A bright modern office with desks and plants',
    quote:
      'The workspace keeps our team aligned, so every project feels clear from the first conversation to launch day.',
    name: 'Marcus Lee',
    role: 'Operations Lead | Seattle, Washington',
  },
];

export function LoginImageCarousel() {
  return (
    <Carousel opts={{ loop: true }} className="h-full w-full">
      <CarouselContent className="h-full">
        {slides.map((slide) => (
          <CarouselItem key={slide.name} className="relative h-full">
            <img
              src={slide.image}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="bg-linear-to-t absolute inset-0 from-black/55 via-black/0 to-black/0" />
            <div className="absolute bottom-6 left-6 right-20 rounded-2xl bg-black/30 p-5 text-white backdrop-blur-md">
              <p className="text-[15px] font-medium leading-snug">{slide.quote}</p>
              <p className="mt-4 text-sm font-semibold">{slide.name}</p>
              <p className="text-sm text-white/70">{slide.role}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="bottom-6 right-6 top-auto" />
      <CarouselPrevious className="bottom-20 left-auto right-6 top-auto" />
    </Carousel>
  );
}
