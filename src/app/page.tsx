import React from 'react';
import POSApp from './components/landing page/landing'; // Adjust the path if necessary

const Page: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Point of Sale Application</h1>
            <POSApp />
        </div>
    );
};

export default Page;
