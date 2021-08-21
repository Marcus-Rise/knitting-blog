import { useMemo } from "react";
import { inject } from "./inject.function";

const useInject = <T>(provider: symbol): T => {
  return useMemo(() => inject<T>(provider), [provider]);
};

export { useInject };
