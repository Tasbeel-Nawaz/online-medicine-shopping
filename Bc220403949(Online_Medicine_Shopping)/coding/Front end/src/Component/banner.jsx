import BannerImg from "../../public/banner.jpg";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-emerald-600 text-white m-4 rounded-2xl">
      <img
        src={BannerImg}
        alt="Banner Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Online Medicine <br />
            <span className="text-emerald-200">
              Shopping Made Easy
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-emerald-100 max-w-lg">
            Order genuine medicines online, get fast delivery,
            and manage your health from the comfort of your home.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="bg-white text-emerald-600 px-5 py-2.5 rounded-xl font-semibold shadow hover:scale-105 transition">
              Shop Medicines
            </button>

            <button className="border border-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition">
              Upload Prescription
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Medicine"
            className="w-56 md:w-64 lg:w-72 drop-shadow-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;
