import SvgStar from "@/assets/svgs";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import {
  CollectionPerview,
  CoverSection,
  CtaOne,
  Footer,
  HeroSection,
  LocalStores,
  ProductsList,
  TestimonialGrid,
} from "@/components/views/home";

export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <HeroSection />
      </div>
      <VelocityScroll
        numRows={1}
        defaultVelocity={-3}
        className="bg-zinc-900 py-4 relative z-20"
      >
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <span className="tracking-widest text-rose-200 font-newyork">
            Nelly Collection
          </span>
          <SvgStar className="w-8 h-8 text-rose-200 ml-4" />
        </span>
      </VelocityScroll>
      <ProductsList />
      <CollectionPerview />
      <CtaOne />
      <CoverSection />
      <TestimonialGrid />
      <LocalStores />
      <Footer />
    </>
  );
}
