import * as React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

export type CarouselApi = {
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
};
type CarouselOptions = { loop?: boolean };

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  opts?: CarouselOptions;
  setApi?: (api: CarouselApi) => void;
};

const CarouselContext = React.createContext<{
  carouselRef: React.RefObject<HTMLDivElement | null>;
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error('Carousel components must be used inside Carousel');
  return context;
}

export function Carousel({ opts, setApi, className, children, ...props }: CarouselProps) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const updateControls = React.useCallback(() => {
    const viewport = carouselRef.current;
    if (!viewport) return;
    setCanScrollPrev(Boolean(opts?.loop) || viewport.scrollLeft > 0);
    setCanScrollNext(
      Boolean(opts?.loop) || viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1,
    );
  }, [opts?.loop]);

  React.useEffect(() => {
    updateControls();
    const viewport = carouselRef.current;
    if (!viewport) return;
    viewport.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls);
    return () => {
      viewport.removeEventListener('scroll', updateControls);
      window.removeEventListener('resize', updateControls);
    };
  }, [updateControls]);

  const api = React.useMemo<CarouselApi>(() => {
    const scroll = (direction: -1 | 1) => {
      const viewport = carouselRef.current;
      if (!viewport) return;
      const isAtStart = viewport.scrollLeft <= 0;
      const isAtEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 1;
      if (opts?.loop && direction === -1 && isAtStart) {
        viewport.scrollTo({
          left: viewport.scrollWidth - viewport.clientWidth,
          behavior: 'smooth',
        });
        return;
      }
      if (opts?.loop && direction === 1 && isAtEnd) {
        viewport.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }
      viewport.scrollBy({ left: direction * viewport.clientWidth, behavior: 'smooth' });
    };
    return {
      canScrollPrev: () => canScrollPrev,
      canScrollNext: () => canScrollNext,
      scrollPrev: () => scroll(-1),
      scrollNext: () => scroll(1),
    };
  }, [canScrollNext, canScrollPrev, opts?.loop]);

  React.useEffect(() => {
    if (setApi) setApi(api);
  }, [api, setApi]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev: api.scrollPrev,
        scrollNext: api.scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        className={cn('relative', className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { carouselRef } = useCarousel();
  return (
    <div
      ref={carouselRef}
      className="h-full snap-x overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className={cn('flex', className)} {...props} />
    </div>
  );
}

export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn('relative min-w-0 shrink-0 grow-0 basis-full snap-start', className)}
      {...props}
    />
  );
}

export function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof CarouselButton>) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <CarouselButton
      aria-label="Previous slide"
      className={className}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
    </CarouselButton>
  );
}

export function CarouselNext({ className, ...props }: React.ComponentProps<typeof CarouselButton>) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <CarouselButton
      aria-label="Next slide"
      className={className}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
    </CarouselButton>
  );
}

function CarouselButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'absolute flex size-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
