// import "./styles.css";
import { useState } from 'react';
import DynamicCanvas from './components/DynamicCanvas';
import SideDrawerWrapper from './components/SideDrawerWrapper';
import SideDrawerBody from './components/SideDrawerBody';
import { DummyCoordinates } from './constants/DATA';

export default function App() {
  // Inits
  const [drawerAnimation, setDrawerAnimation] = useState<boolean>(false);
  const [isSideDrawerOpen, setSideDrawerOpen] = useState<boolean>(false);
  const [coordinateDetails, setCoordinateDetails] = useState(DummyCoordinates);

  // For perform the close animation
  const closeDrawerByAnimation = () => {
    setDrawerAnimation(false);
  };

  // For remove from the dom
  const removeDrawerFromDom = () => {
    setSideDrawerOpen(false);
  };
  // For open the sideDrawer with animation
  const openDrawerHandler = () => {
    setDrawerAnimation(true);
    setSideDrawerOpen(true);
  };

  // For add the Input at coordinate
  const addCoordinateHandler = (coordinateObj: any) => {
    setCoordinateDetails([...coordinateDetails, coordinateObj]);
  };
  // JSX
  return (
    <>
      <DynamicCanvas
        canvasWidth={1000}
        canvasHeight={500}
        imageUrl="/images/invoice.jpg"
        writingCoordinates={coordinateDetails}
        openDrawerHandler={openDrawerHandler}
      />
      {isSideDrawerOpen && (
        <SideDrawerWrapper
          isOpen={drawerAnimation}
          removeDrawerFromDom={removeDrawerFromDom}
          closeDrawerByAnimation={closeDrawerByAnimation}
          headerTitle={'Add Information'}
        >
          <SideDrawerBody
            closeDrawerByAnimation={closeDrawerByAnimation}
            addCoordinateHandler={addCoordinateHandler}
          />
        </SideDrawerWrapper>
      )}
    </>
  );
}
