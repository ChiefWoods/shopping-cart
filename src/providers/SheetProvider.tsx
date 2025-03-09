import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SheetContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SheetContext = createContext<SheetContextType>({} as SheetContextType);

export function useSheet() {
  return useContext(SheetContext);
}

export function SheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SheetContext.Provider>
  );
}
