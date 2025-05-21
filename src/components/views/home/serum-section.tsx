import SlideArrowButton from "@/components/ui/slide-arrow-button";

export default function SerumSection() {
  return (
    <div className="w-full px-3 lg:px-8 pb-20">
      <div className="mb-8 max-w-lg">
        <h2 className="md:text-5xl text-4xl tracking-tight text-zinc-800 mb-2">
          <span className="font-newyork italic">Trending</span> products
        </h2>
        <p className="text-muted-fourground pl-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nam,
          maiores eligendi ratione placeat quos eaque vitae culpa hic dolore!
        </p>
      </div>
      <div className="grid w-full grid-cols-12 mt-4 gap-x-2 relative z-30">
        <div className="col-span-8 bg-zinc-200">
          <img
            src="https://img.freepik.com/free-photo/close-up-hands-holding-serum-bottles_23-2149168540.jpg?t=st=1747835893~exp=1747839493~hmac=ac67c77bd0b07ddeb19ad5615187dfeb96af1fdb7e3347c5ac807072871433ce&w=1380"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-4 bg-rose-300 border border-border flex flex-col justify-end p-6">
          <div className="mb-8">
            <h2 className="text-4xl font-semibold">
              Descover on this look seerum for face 50%
            </h2>
            <p className="mt-4 leading-5 text-muted-forground">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              nam, maiores eligendi ratione placeat quos eaque vitae culpa hic
              dolore!
            </p>
          </div>
          
            <SlideArrowButton className="w-[200px]" text="Shop now" /> 
       
        </div>
      </div>
    </div>
  );
}
