import { container } from "./container";
import type { interfaces } from "inversify";

const bindDependencies = <F = Function>(
  func: F,
  dependencies: Array<interfaces.ServiceIdentifier>,
  // @ts-ignore
): (() => ReturnType<typeof func>) => {
  const injections = dependencies.map((dependency) => container.get(dependency));

  // @ts-ignore
  return func.bind(func, ...injections);
};

export { bindDependencies };
