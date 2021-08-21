import { container } from "./container";

const inject = <T>(provider: symbol): T => container.get<T>(provider);

export { inject };
