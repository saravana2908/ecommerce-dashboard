import { useSelector } from "react-redux";
import { useEffect } from "react";
import AppRouter from "./router/AppRouter";

function App() {
  const themeMode = useSelector((state) => state.theme.mode);

  // Apply dark/light class to <body> so all pages respond
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(themeMode);
  }, [themeMode]);

  return <AppRouter />;
}

export default App;
