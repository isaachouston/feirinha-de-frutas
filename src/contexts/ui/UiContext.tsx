import React, {
  createContext,
  FC,
  useContext,
  useState,
} from "react";
import UiLoading from "../../components/uiLoading/UiLoading";

interface IUiContext {
  setLoading: (isLoading: boolean) => void;
}

const UiContext = createContext<IUiContext>({} as IUiContext);

export const UiProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <UiContext.Provider
      value={{
        setLoading,
      }}
    >
      {children}
      <UiLoading isLoading={loading} />
    </UiContext.Provider>
  );
};

export const useUi = () => {
  const context = useContext(UiContext);
  return context;
};
