import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Slider } from "./slider.component";

const Config: ComponentMeta<typeof Slider> = {
  title: "components/Slider",
  component: Slider,
};

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

const Default = Template.bind({});
Default.args = {
  images: [
    {
      url: "https://images.prismic.io/knittingblog/fbc3fdf6-f46b-43bf-9e36-9fdfdb0df3aa_2021-02-26+10.37.36.jpg",
    },
    {
      url: "https://images.prismic.io/knittingblog/99e6c02f-a54c-4b4c-b6e7-3c7fd6c31163_IMG_2534.JPG",
    },
    {
      url: "https://images.prismic.io/knittingblog/19fba798-72f3-4b65-aaa4-bb730236c964_IMG_3156.JPG",
    },
    {
      url: "https://images.prismic.io/knittingblog/59734736-7b3f-41fe-96ee-06c2f176c1ef_2022-04-14+12.10.06.jpg",
    },
  ],
};

export default Config;
export { Default };
