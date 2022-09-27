import manifest from "../package.json";

type Meta = {
  title: string;
  author: {
    url: string;
    email: string;
    name: string;
  };
};

const config: Meta = {
  title: "Надя вяжет",
  author: manifest.author,
};

export { config };
export type { Meta };
