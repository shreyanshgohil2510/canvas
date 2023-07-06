import toast from 'react-hot-toast';
// Creating the initial state object for write something
export const createTextInitialState = (coordinatesObject: any) => {
  const INITIALSTATE: any = {};
  for (let i = 0; i < coordinatesObject.length; i++) {
    INITIALSTATE[coordinatesObject[i].name] = '';
  }
  return INITIALSTATE;
};

export const toastText = (message: string, type: string) => {
  toast['success'](message, {
    style: {
      fontSize: '16px',
    },
  });
};
