import dynamic from "next/dynamic";

const Slider = dynamic(
  async () => {
    const module = await import("./slider.component");

    return module.Slider;
  },
  {
    ssr: false,
  },
);

export { Slider };
