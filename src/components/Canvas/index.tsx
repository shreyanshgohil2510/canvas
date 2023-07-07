import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { CanvasProps } from './types';
import ToolTip from '../Tooltip';

const Canvas: FC<CanvasProps> = (props) => {
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const canvas = useRef<HTMLCanvasElement | any>(null);
  const {
    canvasHeight,
    canvasWidth,
    imageUrl,
    coordinateDetails,
    canvasPosition,
    resetCanvasPosition,
  } = props;

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
      // Setting font configuration
      ctx.globalCompositeOperation = 'destination-over';
      ctx.font = '11px Arial';
      ctx.fillStyle = '#000';
      ctx.scale(1, 1.3);
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

  const mouseMoveHandler = useCallback((e: any) => {
    const { clientX, clientY } = e;
    setMouseLocation({ x: clientX, y: clientY });
  }, []);

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
          <div className="w-[669px] h-[348px] overflow-hidden absolute top-[22px] left-[49px]">
            <canvas
              ref={canvas}
              width={canvasWidth}
              height={canvasHeight}
              className=" "
              onMouseOver={() => {
                window.addEventListener('mousemove', mouseMoveHandler);
              }}
              onMouseOut={() => {
                setMouseLocation({ x: 0, y: 0 });
                window.removeEventListener('mousemove', mouseMoveHandler);
              }}
              style={{
                transition: 'all 1s',
                transform: `translate(${canvasPosition.x}px , ${canvasPosition.y}px)`,
              }}
            />
          </div>
        </div>
      </div>
      <div>
        {!(mouseLocation.x === 0 && mouseLocation.y === 0) && (
          <ToolTip x={mouseLocation.x} y={mouseLocation.y} />
        )}
      </div>
    </React.Fragment>
  );
};

export default Canvas;
