import { useState } from 'react';
import Canvas from '../components/Canvas';
import { InvoiceDummyData } from '../constants/InvoiceData';

const Zoom = () => {
  const [coordinateDetails, setCoordinateDetails] = useState(InvoiceDummyData);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [scaleValue, setScaleValue] = useState({ xScale: 0.5, yScale: 0.5 });

  const buttonClickHandler = (el: any) => {
    const data = coordinateDetails[el];
    setCanvasPosition({ x: -Math.abs(data.x), y: -Math.abs(data.y) });
    changeScaleHandler(1, 1.3);
  };

  const resetCanvasPosition = () => {
    setCanvasPosition({ x: 0, y: 0 });
    setScaleValue({ xScale: 0.5, yScale: 0.5 });
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
        canvasPosition={canvasPosition}
        scaleValue={scaleValue}
        changeScaleHandler={changeScaleHandler}
        resetCanvasPosition={resetCanvasPosition}
      />
      <div className="flex w-[800px] gap-3">
        <button
          onClick={() => buttonClickHandler('customer')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:!bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Customer
        </button>
        <button
          onClick={() => buttonClickHandler('subBoxTwo')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:!bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Total
        </button>
        <button
          onClick={() => buttonClickHandler('messageOnStatement')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:!bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Message on statement
        </button>
      </div>
    </>
  );
};

export default Zoom;
