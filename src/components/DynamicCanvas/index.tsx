import {
  useEffect,
  useRef,
  useState,
  FC,
  ChangeEvent,
  useCallback,
} from 'react';
import { DynamicCanvasProps } from './types';
import { createTextInitialState } from '../../utils';
import { Select } from 'antd';
import ToolTip from '../Tooltip';
import { Locations } from '../../constants/DATA';

const DynamicCanvas: FC<DynamicCanvasProps> = (props) => {
  // Inits
  const {
    canvasHeight,
    canvasWidth,
    imageUrl,
    writingCoordinates,
    openDrawerHandler,
  } = props;
  const [inputValue, seInputValue] = useState(() =>
    createTextInitialState(writingCoordinates)
  );
  const [mouseLocation, setMouseLocation] = useState({ x: 0, y: 0 });
  const [selectBoxData, setSelectBoxData] = useState<any>(null);

  const canvas = useRef<HTMLCanvasElement | any>(null);

  // Canvas drawing
  const drawCanvas = () => {
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, 800, 500);
    ctx.save();
    const base_image = new Image();
    base_image.src = imageUrl;
    base_image.onload = () => {
      ctx.globalCompositeOperation = 'destination-over';
      ctx.font = '10px Arial';
      ctx.fillStyle = 'red';
      writingCoordinates.map((singleCoordinate) => {
        console.log(singleCoordinate);
        ctx.fillText(
          inputValue[singleCoordinate.name],
          singleCoordinate.x,
          singleCoordinate.y
        );
      });
      selectBoxData &&
        ctx.fillText(selectBoxData.label, selectBoxData.x, selectBoxData.y);
      ctx.drawImage(base_image, 0, 0, canvasWidth, canvasHeight);
    };
  };

  // For change in the any of the input value
  const InputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    seInputValue((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChange = (value: string) => {
    const data = Locations[value];
    setSelectBoxData(data);
  };

  // Created the debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      drawCanvas();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, selectBoxData]);

  const mouseMoveHandler = useCallback((e: any) => {
    const { clientX, clientY } = e;
    setMouseLocation({ x: clientX, y: clientY });
  }, []);

  // JSX
  return (
    <>
      <div className="flex gap-4">
        <canvas
          ref={canvas}
          style={{ border: '1px solid gray' }}
          width={canvasWidth}
          height={canvasHeight}
          onMouseOver={() => {
            window.addEventListener('mousemove', mouseMoveHandler);
          }}
          onMouseOut={() => {
            setMouseLocation({ x: 0, y: 0 });
            window.removeEventListener('mousemove', mouseMoveHandler);
          }}
        />
        <div>
          {writingCoordinates.map((singleInput, indx) => {
            return (
              <div key={indx} className="mb-2">
                <label
                  htmlFor=""
                  className="block text-sm font-semibold text-gray-800"
                >
                  {singleInput.name}
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name={singleInput.name as string}
                  value={inputValue[singleInput.name]}
                  onChange={InputChangeHandler}
                />
              </div>
            );
          })}
          <div className="mb-2">
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              defaultValue={'disabled'}
              options={[
                { value: 'disabled', label: 'Disabled', disabled: true },
                { value: 'customer', label: 'Customer' },
                { value: 'customerEmail', label: 'Customer Email' },
                { value: 'billingAddress', label: 'Billing address' },
              ]}
            />
          </div>
          <button
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            onClick={openDrawerHandler}
          >
            Add new
          </button>
        </div>
      </div>

      {!(mouseLocation.x === 0 && mouseLocation.y === 0) && (
        <ToolTip x={mouseLocation.x} y={mouseLocation.y} />
      )}
    </>
  );
};

export default DynamicCanvas;
