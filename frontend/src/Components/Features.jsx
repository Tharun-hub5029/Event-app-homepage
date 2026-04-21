// src/components/Features.jsx
const Features = () => {
    const features = [
      { title: "Fast Performance", description: "Optimized for speed and efficiency." },
      { title: "Secure", description: "Advanced security features to keep data safe." },
      { title: "User Friendly", description: "Intuitive design and smooth experience." },
    ];
  
    return (
      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white shadow-md rounded-lg text-center">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Features;
  