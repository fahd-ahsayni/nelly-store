import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  image: string;
}

export default function TestimonialGrid() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Amina S.",
      rating: 5,
      comment:
        "The Serenity Hijab is so comfortable and breathable. Perfect for everyday wear!",
      image:
        "https://img.freepik.com/free-photo/medium-shot-beautiful-woman-posing_23-2149226589.jpg?t=st=1747400900~exp=1747404500~hmac=e663a83d410d65aba8594c18caa83e87bae7dadb9ab10a70bf737726f047c85a&w=1380",
    },
    {
      id: 2,
      name: "Fatima K.",
      rating: 5,
      comment:
        "I love how elegant the Cascade Collection looks. The fabric drapes beautifully!",
      image:
        "https://img.freepik.com/free-photo/close-up-hands-holding-beautiful-flowers_23-2149226642.jpg?t=st=1747401195~exp=1747404795~hmac=14c80c6614ce775bf6032ab489a0bdae4a0794dbb2c150edf6fa5382d6d7966a&w=1380",
    },
    {
      id: 3,
      name: "Layla H.",
      rating: 4,
      comment:
        "The Everyday Essentials hijabs are perfect for my busy lifestyle. So easy to style!",
      image:
        "https://img.freepik.com/free-photo/front-view-woman-holding-plant_23-2149642252.jpg?t=st=1747401299~exp=1747404899~hmac=7c25d44ef2b377c6cf947b478544220c4b85f368d22cdc214f7bdf7e20415d43&w=996",
    },
    {
      id: 4,
      name: "Noor J.",
      rating: 5,
      comment:
        "The Premium Silk Collection feels luxurious and looks so elegant. Worth every penny!",
      image:
        "https://img.freepik.com/free-photo/side-view-muslim-woman-posing-chair_23-2149642295.jpg?t=st=1747401346~exp=1747404946~hmac=084144869b0765a2a9d0b81690b28dae5136f9f023bab9380c391c83d8978cbd&w=996",
    },
  ];

  return (
    <section className="pb-12 px-4 md:px-8 -mt-20">
      <div className="">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-3 font-serif">
            What Our <span className="font-light text-rose-600 italic">Customers</span> Say
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card rounded overflow-hidden transition-shadow duration-300 border border-zinc-600"
            >
              <div className="relative aspect-[3/3.5] h-[400px] overflow-hidden w-full">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`${testimonial.name} wearing our hijab`}
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex mb-2 gap-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={cn(
                        i < testimonial.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-zinc-200 text-zinc-200"
                      )}
                    />
                  ))}
                </div>

                <h3 className="text-xl mb-1">{testimonial.name}</h3>
                <p className="text-zinc-600 text-sm line-clamp-2">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
