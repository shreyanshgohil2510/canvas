import { FC } from 'react';
import { TooltipProps } from './types';

// For mouse hover tool tip
const ToolTip: FC<TooltipProps> = (props) => {
  const { x, y } = props;
  return (
    <div
      className="fixed inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm pointer-events-none"
      style={{ top: y, left: x }}
    >
      <span>{x}</span>
      <span>,</span>
      <span>{y}</span>
    </div>
  );
};

export default ToolTip;
