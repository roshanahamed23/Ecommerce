

export default function CityGoldHero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brown-light">
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="city-gold-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="30" fill="#532517" opacity="0.1" />
            <path d="M50 10 L90 90 L10 90 Z" fill="#f08080" opacity="0.1" />
            <rect x="80" y="10" width="20" height="20" fill="#532517" opacity="0.1" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#city-gold-pattern)" />
        </svg>
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold text-primary-darbar mb-6 animate-slideUp">
          City Gold
          <span className="block text-primary-saf mt-2">Elegance Redefined</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-primary-darbar mb-10 animate-fadeInOut animation-delay-300">
          Discover exquisite jewelry that captures the essence of urban sophistication and timeless beauty.
        </p>
        <button
          className="bg-primary-saf hover:bg-priamry-darbar text-white text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 animate-fadeInUp animation-delay-600"
        >
          Explore Collection
        </button>
      </div>
    </div>
  )
}

