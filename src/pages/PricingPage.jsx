import React, { useEffect } from 'react';
import Pricing from '../components/sections/Pricing';

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Pricing />
    </div>
  );
};

export default PricingPage;
