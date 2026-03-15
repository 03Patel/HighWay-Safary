//import hero from "../assets/travel-hero.png"; // your illustration

export default function AboutSection() {
    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Left Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        // src={hero}
                        alt="Traveler"
                        className="w-[420px] md:w-[520px] animate-float drop-shadow-2xl"
                    />
                </div>

                {/* Right Content */}
                <div className="w-full md:w-1/2 space-y-6">

                    <p className="text-primary italic text-lg">
                        About Highway Safary
                    </p>

                    <h1 className="text-5xl font-bold leading-tight text-black">
                        World Best <span className="text-primary">Travel</span> Agency
                    </h1>

                    <p className="text-gray-600">
                        Since 2025, we’ve been helping travelers explore breathtaking destinations. From day trips to longer vacations, we make sure every journey is enjoyable and unforgettable.
                    </p>

                    {/* Features */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">✓</div>
                            <p className="text-black">Best travel destinations</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">✓</div>
                            <p className="text-black">Affordable packages</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-primary text-white flex items-center justify-center rounded-full">✓</div>
                            <p className="text-black">24/7 travel support</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}