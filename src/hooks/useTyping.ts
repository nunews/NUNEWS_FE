import Typed from "typed.js";
import { useEffect, useRef } from "react";

export const useTyping = () => {
  const typedRef = useRef<HTMLDivElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  const runTyped = async (text: string) => {
    if (!typedRef.current) {
      return;
    }

    if (typedInstance.current) {
      typedInstance.current.destroy();
      typedInstance.current = null;
    }

    typedRef.current.innerHTML = ""; //초기화

    typedInstance.current = new Typed(typedRef.current, {
      strings: [text],
      typeSpeed: 20,
      showCursor: false,
    });
  };

  useEffect(() => {
    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, []);

  return {
    typedRef,
    runTyped,
  };
};
