'use client';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BrainCircuit, 
  ScanLine, 
  Sparkles, 
  LineChart, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

const capabilities = [
  {
    title: 'Semantic Math Input',
    description:
      'Describe complex functions in plain English. Our AI transforms "a decaying sine wave" into precise LaTeX and renders it instantly on the coordinate plane.',
    link: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    color: 'hsl(221.2 83.2% 30%)', // Primary blue (darker)
    icon: <BrainCircuit className="size-6 text-blue-400" />,
  },
  {
    title: 'Vision OCR Digitization',
    description:
      'Snap a photo of your handwritten whiteboard notes. EigenPlot recognizes multivariate calculus and implicit relations, digitizing them into interactive models.',
    link: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop',
    color: 'hsl(142.1 76.2% 25%)', // Emerald (darker)
    icon: <ScanLine className="size-6 text-emerald-400" />,
  },
  {
    title: 'Predictive Pattern Analysis',
    description:
      'The intelligence layer identifies asymptotes, roots, and points of interest before you even search for them, providing proactive insights into your data behavior.',
    link: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    color: 'hsl(262.1 83.3% 35%)', // Violet (darker)
    icon: <Sparkles className="size-6 text-purple-400" />,
  },
  {
    title: 'High-Performance Engine',
    description:
      'Powered by WebAssembly, EigenPlot renders millions of data points and vector fields at 60fps, ensuring your complex simulations never skip a beat.',
    link: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop',
    color: 'hsl(24.6 95% 40%)', // Orange (darker)
    icon: <Zap className="size-6 text-orange-400" />,
  },
  {
    title: 'Automated Regression',
    description:
      'Import massive CSV datasets and let AI suggest the best-fit curves. From linear to non-linear regression, find the mathematical truth in your data automatically.',
    link: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    color: 'hsl(222.2 47.4% 11.2%)', // Slate
    icon: <LineChart className="size-6 text-stone-400" />,
  },
];

export default function ContentSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
      <main id="ai" className='bg-background text-foreground' ref={container}>
        <section className='h-[70vh] w-full grid place-content-center relative overflow-hidden'>
          {/* Grid Background Effect - Only visible in dark theme */}
          <div className='hidden dark:block absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-6"
          >
            <h1 className='2xl:text-7xl text-5xl font-bold tracking-tighter leading-tight'>
              EigenPlot Intelligence <br /> 
              <span className="text-muted-foreground font-medium">Stacked for Performance.</span>
            </h1>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
              Explore the AI-driven layer that turns complex mathematics into visual reality.
            </p>
          </motion.div>
        </section>

        <section className='w-full px-6'>
          {capabilities.map((feature, i) => {
            const targetScale = 1 - (capabilities.length - i) * 0.05;
            return (
              <Card
                key={`feature_${i}`}
                i={i}
                url={feature.link}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                progress={scrollYProgress}
                range={[i * 0.2, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        <footer className='py-32 bg-background'>
          <h1 className='text-[14vw] leading-none uppercase font-black text-center bg-linear-to-b from-foreground/80 to-foreground/40 bg-clip-text text-transparent'>
            EigenPlot
          </h1>
          <div className='mt-20 flex justify-center'>
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-colors">
              Get Started for Free
            </button>
          </div>
        </footer>
      </main>
  );
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  url,
  icon,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${i * 28}px)`,
        }}
        className='flex flex-col relative h-[500px] w-full max-w-4xl rounded-3xl border border-border bg-card p-8 lg:p-12 origin-top shadow-2xl'
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className='text-3xl font-bold tracking-tight text-card-foreground'>{title}</h2>
        </div>
        
        <div className='flex flex-col md:flex-row h-full mt-8 gap-10 overflow-hidden'>
          <div className='flex flex-col justify-between md:w-[45%]'>
            <p className='text-card-foreground text-lg leading-relaxed'>
              {description}
            </p>
            
            <Link href="#" className="group flex items-center gap-2 text-card-foreground font-medium hover:underline mt-4">
              Learn about {title.split(' ')[0]}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className='relative flex-1 h-64 md:h-full rounded-2xl overflow-hidden border border-border/50'>
            <motion.div
              className='w-full h-full'
              style={{ scale: imageScale }}
            >
              <Image 
                fill 
                src={url} 
                alt={title} 
                className='object-cover opacity-80 group-hover:opacity-100 transition-opacity' 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};