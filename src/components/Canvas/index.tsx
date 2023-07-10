import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { CanvasProps } from './types';

const Canvas: FC<CanvasProps> = (props) => {
  // const canvas = useRef<HTMLCanvasElement | any>(null);
  const {
    canvasHeight,
    canvasWidth,
    imageUrl,
    coordinateDetails,
    canvasPosition,
    resetCanvasPosition,
    canvasRef,
  } = props;

  // Canvas drawing
  const drawCanvas = () => {
    // Creating writing context
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.save();
    const base_image = new Image();
    base_image.src = imageUrl;

    // Waiting for image loading
    base_image.onload = () => {
      // Setting font configuration
      ctx.globalCompositeOperation = 'destination-over';
      ctx.font = '11px Arial';
      ctx.fillStyle = '#000';
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
          <div className="w-[663px] h-[348px] overflow-hidden absolute top-[22px] left-[53px]">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              className="canvas"
              style={{
                transition: 'all 1s',
                transform: `translate(${canvasPosition.x}px , ${canvasPosition.y}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Canvas;
