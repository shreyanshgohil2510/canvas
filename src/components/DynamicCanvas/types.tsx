interface DynamicObject {
  [key: string]: number | string;
}

export interface DynamicCanvasProps {
  canvasHeight: number;
  canvasWidth: number;
  imageUrl: string;
  writingCoordinates: DynamicObject[] | [];
  openDrawerHandler: () => void;
}
