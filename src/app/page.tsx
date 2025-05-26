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
import SerumSection from "@/components/views/home/serum-section";

export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <HeroSection />
      </div>
      <VelocityScroll
        numRows={1}
        defaultVelocity={-3}
        className="bg-accent py-4 relative z-20"
      >
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
          <span className="text-rose-200 font-serif">
            Nelly Collection
          </span>
          <SvgStar className="w-7 h-7 text-rose-200 ml-4" />
        </span>
      </VelocityScroll>
      <ProductsList />
      <SerumSection />
      <CollectionPerview />
      <CtaOne />
      <CoverSection />
      <TestimonialGrid />
      <LocalStores />
      <Footer />
    </>
  );
}
