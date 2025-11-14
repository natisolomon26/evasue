interface PageBannerProps {
  title: string;
  subtitle?: string;
  image: string; // path from public folder
}

export default function PageBanner({ title, subtitle, image }: PageBannerProps) {
  return (
    <section
      className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900/50 via-sky-900/60 to-sky-900/50" />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg md:text-xl mt-3 opacity-95 drop-shadow">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
