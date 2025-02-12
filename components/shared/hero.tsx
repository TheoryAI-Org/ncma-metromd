interface HeroProps {
  title: string;
  subtitle?: string;
  height?: "sm" | "md" | "lg";
  className?: string;
}

export function Hero({ 
  title, 
  subtitle, 
  height = "md",
  className = "" 
}: HeroProps) {
  const heightClasses = {
    sm: "h-[200px]",
    md: "h-[300px]",
    lg: "h-[400px]"
  };

  return (
    <div className={`relative ${heightClasses[height]} flex items-center justify-center bg-[#1B365D] ${className}`}>
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
