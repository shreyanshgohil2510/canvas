import { useRef, useState } from 'react';
import Canvas from '../components/Canvas';
import { InvoiceDummyData } from '../constants/InvoiceData';

const Zoom = () => {
  const [coordinateDetails, setCoordinateDetails] = useState(InvoiceDummyData);
  const [scaleValue, setScaleValue] = useState({ xScale: 0.5, yScale: 0.5 });
  const canvasContainerRef = useRef<any>(null);

  const relocateCanvasHandler = (el: any) => {
    const data = coordinateDetails[el];
    canvasContainerRef.current.scrollTo({
      top: data.y,
      left: data.x,
      behavior: 'smooth',
    });
  };

  const resetCanvasPosition = () => {
    canvasContainerRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const changeScaleHandler = (xScale: any, yScale: any) => {
    setScaleValue({ xScale, yScale });
  };

  return (
    <>
      <Canvas
        canvasWidth={1500}
        canvasHeight={750}
        imageUrl="/images/new-invoice.png"
        coordinateDetails={coordinateDetails}
        scaleValue={scaleValue}
        changeScaleHandler={changeScaleHandler}
        resetCanvasPosition={resetCanvasPosition}
        canvasContainerRef={canvasContainerRef}
      />
      <div className="flex w-[800px] gap-3">
        <button
          onClick={() => relocateCanvasHandler('customer')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:!bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Customer
        </button>
        <button
          onClick={() => relocateCanvasHandler('subBoxTwo')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:!bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Total
        </button>
        <button
          onClick={() => relocateCanvasHandler('messageOnStatement')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:!bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Message on statement
        </button>
      </div>
    </>
  );
};

export default Zoom;
