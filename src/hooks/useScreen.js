import { useEffect, useCallback, useState } from "react";

export default function useScreen() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleResizeScreen() {
      setScreenWidth(getScreenWidth());
    }

    /* Обработчик при монтировании */
    window.addEventListener("resize", resizeController, false);

    let timer;

    function resizeController() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleResizeScreen();
        }, 1000);
      }
    }

    /* Убираем обработчик при размонтировании */
    return () => window.removeEventListener("resize", handleResizeScreen);
  }, [getScreenWidth]);

  return screenWidth;
}
