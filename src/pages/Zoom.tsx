import { useRef, useState } from 'react';
import Canvas from '../components/Canvas';
import { InvoiceDummyData } from '../constants/InvoiceData';

const Zoom = () => {
  const [coordinateDetails, setCoordinateDetails] = useState(InvoiceDummyData);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [scaleValue, setScaleValue] = useState({ xScale: 0.5, yScale: 0.5 });
  const canvasRef = useRef<HTMLCanvasElement | any>(null);

  const base_image = new Image();
  base_image.src = '/images/new-invoice.png';

  const drawCanvas = () => {
    // Creating writing context
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.save();

    // Setting font configuration
    ctx.globalCompositeOperation = 'destination-over';
    ctx.font = '11px Arial';
    ctx.fillStyle = '#000';

    // Waiting for image loading
    base_image.onload = () => {
      ctx.translate(1, 0);
      // Writing on the image
      for (const [key, objectValue] of Object.entries(
        coordinateDetails
      ) as any) {
        if (key === 'table') {
          objectValue.map((singleProduct: any) => {
            for (const [tableKey, tableValue] of Object.entries(
              singleProduct
            ) as any) {
              ctx.fillText(tableValue.value, tableValue.x, tableValue.y + 11);
            }
          });
        } else {
          ctx.fillText(objectValue.value, objectValue.x, objectValue.y + 11);
        }
      }
      ctx.drawImage(base_image, 0, 0, 1500, 750);
    };
  };

  const canvasRelocationHandler = (el: any) => {
    const data = coordinateDetails[el];
    console.log(base_image.complete);
    drawCanvas();
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
        canvasRef={canvasRef}
      />
      <div className="flex w-[800px] gap-3">
        <button
          onClick={() => canvasRelocationHandler('customer')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:!bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Customer
        </button>
        <button
          onClick={() => canvasRelocationHandler('subBoxTwo')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:!bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Total
        </button>
        <button
          onClick={() => canvasRelocationHandler('messageOnStatement')}
          className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:!bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Message on statement
        </button>
      </div>
    </>
  );
};

export default Zoom;

// const drawCanvas = () => {
//   // Creating writing context
//   const ctx = canvasRef.current.getContext('2d');
//   ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//   ctx.save();

//   // Setting font configuration
//   ctx.globalCompositeOperation = 'destination-over';
//   ctx.font = '11px Arial';
//   ctx.fillStyle = '#000';

//   // Draw the image only if it is not already drawn
//   if (!base_image.complete) {
//     // Waiting for image loading
//     base_image.onload = () => {
//       // Draw the image
//       ctx.drawImage(base_image, 0, 0, 1500, 750);

//       // Write text or other elements on the canvas
//       for (const [key, objectValue] of Object.entries(
//         coordinateDetails
//       ) as any) {
//         if (key === 'table') {
//           objectValue.forEach((singleProduct: any) => {
//             for (const [tableKey, tableValue] of Object.entries(
//               singleProduct
//             ) as any) {
//               ctx.fillText(tableValue.value, tableValue.x, tableValue.y + 11);
//             }
//           });
//         } else {
//           ctx.fillText(objectValue.value, objectValue.x, objectValue.y + 11);
//         }
//       }
//     };
//   } else {
//     // Image already loaded, just redraw text or other elements
//     ctx.drawImage(base_image, 0, 0, 1500, 750);

//     // Write text or other elements on the canvas
//     for (const [key, objectValue] of Object.entries(coordinateDetails) as any) {
//       if (key === 'table') {
//         objectValue.forEach((singleProduct: any) => {
//           for (const [tableKey, tableValue] of Object.entries(
//             singleProduct
//           ) as any) {
//             ctx.fillText(tableValue.value, tableValue.x, tableValue.y + 11);
//           }
//         });
//       } else {
//         ctx.fillText(objectValue.value, objectValue.x, objectValue.y + 11);
//       }
//     }
//   }
// };

// // Load the image
// const base_image = new Image();
// base_image.src = '/images/new-invoice.png';

// // Wait for the image to load once
// base_image.onload = () => {
//   drawCanvas();
// };
