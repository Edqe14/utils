import { useEffect, useRef } from "react";

export const useChanged = (subject: any, action: () => any) => {
  const currentTab = useRef(subject);

  useEffect(() => {
    if (subject !== currentTab.current) {
      currentTab.current = subject;
      action();
    }
  }, [subject, action]);
};
