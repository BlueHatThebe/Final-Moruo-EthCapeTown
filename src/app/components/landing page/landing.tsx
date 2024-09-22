import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Muruo PoS</h1>
        <p className="text-lg text-gray-600">Seamless Payments. Anytime. Anywhere.</p>
      </header>
      <main className="max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Revolutionize Your Payment Processing</h2>
        <p className="text-gray-700 mb-4">
          Our Point of Sale application allows businesses to accept payments in
          various cryptocurrencies, providing a secure and efficient way to
          process transactions. Say goodbye to traditional payment methods and
          embrace the future of commerce.
        </p>
        <p className="text-gray-700 mb-4">
          With an intuitive interface and robust features, you can manage your
          sales, track inventory, and ensure a smooth checkout experience for
          your customers.
        </p>
        <p className="text-gray-700 mb-4">
          Join the growing number of businesses leveraging the power of
          cryptocurrency payments and watch your sales soar!
        </p>
        <a
          href="/signup"
          className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Get Started
        </a>
      </main>
    </div>
  );
};

export default LandingPage;
