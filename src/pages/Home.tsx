import { useState } from 'react';
import Canvas from '../components/Canvas';
import { InvoiceDummyData } from '../constants/InvoiceData';

const Home = () => {
  const [coordinateDetails, setCoordinateDetails] = useState(InvoiceDummyData);
  return (
    <>
      <Canvas
        canvasWidth={1500}
        canvasHeight={750}
        imageUrl="/images/new-invoice.png"
        coordinateDetails={coordinateDetails}
      />
    </>
  );
};

export default Home;
