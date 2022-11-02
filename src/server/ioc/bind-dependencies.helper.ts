import type { interfaces } from "inversify";

type ArrowFunction = (...args: any) => any;

const bindDependencies = async <F extends ArrowFunction = ArrowFunction>(
  func: F,
  dependencies: Array<interfaces.ServiceIdentifier>,
): Promise<() => ReturnType<F>> => {
  const { container } = await import("./container");
  const injections = dependencies.map((dependency) => container.get(dependency));

  return func.bind(func, ...injections);
};

export { bindDependencies };
