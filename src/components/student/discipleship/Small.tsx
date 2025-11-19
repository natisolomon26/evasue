import Image from "next/image";

export default function Small() {
  return (
    <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/bg3.JPG"
          alt="Small Group Ministry"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-900/80 to-sky-900/95"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-6">
        <h2 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
          Small Group
        </h2>

        <p className="text-lg md:text-xl text-gray-200 mt-4 leading-relaxed">
          Since community is essential for spiritual development, we encourage 
          small group ministry among students — promoting 
          <span className="text-sky-400 font-semibold"> Mission</span>, 
          <span className="text-green-400 font-semibold"> Fellowship</span>, 
          <span className="text-yellow-400 font-semibold"> Prayer</span>, and 
          <span className="text-red-400 font-semibold"> Nurturing</span>.
        </p>
      </div>
    </section>
  );
}
