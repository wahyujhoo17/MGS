import prisma from "@/lib/prisma";

export async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (testimonials.length === 0) {
    return null; // Don't render Section if there are no active testimonials
  }

  return (
    <section className="bg-offwhite py-14 sm:py-20 md:py-24 border-t border-concrete">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-navy uppercase tracking-tight">
            Dipercaya Ratusan Pelanggan
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-royal mx-auto mt-3 sm:mt-5" />
        </div>

        <div className="flex overflow-x-auto gap-3.5 sm:gap-4 md:grid md:grid-cols-3 md:gap-8 snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-none">
          {testimonials.map((testi) => (
            <div key={testi.id} className="min-w-[82vw] sm:min-w-[45vw] md:min-w-0 snap-start bg-white p-5 sm:p-6 md:p-8 rounded-2xl border border-concrete/80 border-l-4 border-l-royal shadow-xs">
              <div className="text-royal text-base sm:text-xl mb-3 sm:mb-4 tracking-widest">
                {"★".repeat(testi.rating)}
                {"☆".repeat(Math.max(0, 5 - testi.rating))}
              </div>
              <p className="text-iron leading-relaxed mb-5 sm:mb-7 italic text-xs sm:text-sm md:text-base">
                &quot;{testi.text}&quot;
              </p>
              <hr className="mb-4 sm:mb-6 border-concrete" />
              <div>
                <strong className="block font-display font-bold text-base sm:text-lg text-navy uppercase tracking-wide">
                  {testi.author} — {testi.location}
                </strong>
                <span className="text-iron text-xs sm:text-sm font-medium">
                  {testi.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
