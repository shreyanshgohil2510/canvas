import React, { FC, useEffect, useRef } from 'react';
import { CanvasProps } from './types';

const Canvas: FC<CanvasProps> = (props) => {
  const fontUrl = `${process.env.PUBLIC_URL}/fonts/AvenirHeavy.woff2`;
  const canvas = useRef<HTMLCanvasElement | any>(null);
  const {
    canvasHeight,
    canvasWidth,
    imageUrl,
    coordinateDetails,
    resetCanvasPosition,
    canvasContainerRef,
  } = props;

  const customFont = new FontFace('Avenir', `url(${fontUrl})`);

  // Canvas drawing
  const drawCanvas = () => {
    // Creating writing context
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, 800, 500);
    ctx.save();
    const base_image = new Image();
    base_image.src = imageUrl;
    // Waiting for image loading
    base_image.onload = () => {
      customFont.load().then(() => {
        ctx.font = '12px Avenir ';
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#000';
        ctx.scale(1, 1);
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
        ctx.drawImage(base_image, 0, 0, canvasWidth, canvasHeight);
      });
      // Setting font configuration
    };
  };

  useEffect(() => {
    drawCanvas();
  }, []);

  return (
    <React.Fragment>
      <div className="flex">
        <div className="w-1/2">Hello</div>
        <div
          className="relative  w-1/2  "
          onDoubleClick={() => resetCanvasPosition()}
        >
          <img
            src="/images/laptop.png"
            alt=""
            className="h-[432px] w-[768px]"
          />
          <div
            className="w-[662px] max-h-[366px] overflow-auto absolute top-[22px] left-[53px]"
            ref={canvasContainerRef}
          >
            <div className="problem">
              <canvas
                ref={canvas}
                width={canvasWidth}
                height={canvasHeight}
                className=" h-[750px]"
                style={{
                  transition: 'all 1s',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Canvas;
