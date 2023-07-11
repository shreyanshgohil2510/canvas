import React, { FC, useEffect, useRef, useCallback } from 'react';
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
  let startX: any, startY: any, scrollX: any, scrollY: any;
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
  const mouseMoveHandler = useCallback((event: any) => {
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    canvasContainerRef.current.scrollLeft = scrollX - dx;
    canvasContainerRef.current.scrollTop = scrollY - dy;
  }, []);

  const mouseUpHandler = () => {
    window.removeEventListener('mousemove', mouseMoveHandler);
  };

  const mouseDownHandler = (event: any) => {
    startX = event.clientX;
    startY = event.clientY;
    scrollX = canvasContainerRef.current.scrollLeft;
    scrollY = canvasContainerRef.current.scrollTop;
    window.addEventListener('mousemove', mouseMoveHandler);
  };

  useEffect(() => {
    drawCanvas();
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', mouseUpHandler);
    return () => window.removeEventListener('mouseup', mouseUpHandler);
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
            className="h-[432px] w-[768px] tv-image"
          />
          <div
            className="w-[662px] max-h-[366px] overflow-auto absolute top-[22px] left-[53px] "
            ref={canvasContainerRef}
          >
            <div>
              <canvas
                ref={canvas}
                width={canvasWidth}
                height={canvasHeight}
                className=" h-[750px] cursor-grab"
                style={{
                  transition: 'all 1s',
                }}
                onMouseDown={mouseDownHandler}
                onMouseUp={mouseUpHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Canvas;
