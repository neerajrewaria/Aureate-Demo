/*
  SectionHeading — Reusable Section Title Block
  ================================================
  Used across the homepage and inner pages to display a consistent
  section title + subtitle + optional decorative line.

  Props:
  - title: main heading text
  - subtitle: optional explanatory text below the title
  - centered: centers the text (default: false = left-aligned)
  - light: use ivory colour on dark backgrounds (default: false)
*/

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  const alignClass = centered ? 'text-center items-center' : 'text-left items-start';
  const titleColor = light ? 'text-ivory' : 'text-forest';
  const subtitleColor = light ? 'text-stone-300' : 'text-stone-500';
  const lineColor = light ? 'bg-gold/60' : 'bg-gold';

  return (
    <div className={`flex flex-col ${alignClass} gap-3 mb-10`}>
      {/* Decorative gold line above title */}
      <div className={`w-10 h-0.5 ${lineColor}`} />

      <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight ${titleColor}`}>
        {title}
      </h2>

      {subtitle && (
        <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
