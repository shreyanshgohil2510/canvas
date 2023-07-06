export interface SideDrawerProps {
  children?: any;
  isOpen: boolean;
  closeDrawerByAnimation: () => void;
  removeDrawerFromDom: () => void;
  headerTitle: string;
}
