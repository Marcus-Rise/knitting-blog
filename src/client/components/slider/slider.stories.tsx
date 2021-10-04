import type { Meta, Story } from "@storybook/react";
import type { ISliderProps } from "./slider.component";
import { Slider } from "./slider.component";
import { createGlobalStyle } from "styled-components";

const Config: Meta = {
  title: "Components/Slider",
  component: Slider,
};

const Global = createGlobalStyle`
  body {
    padding: 0 !important;
  }`;

const Template: Story<ISliderProps> = (args) => (
  <>
    <Global />
    <Slider {...args} />
  </>
);

const Default = Template.bind({});
Default.args = {
  images: [
    {
      src: "https://i.ytimg.com/vi/8BPJQAqTddc/maxresdefault.jpg",
    },
    {
      src: "https://static.onecms.io/wp-content/uploads/sites/34/2020/02/woman-knitting-pink-yarn-getty-0220-2000.jpg",
    },
    {
      src: "https://sheepandstitch.com/wp-content/uploads/2014/05/knitting-hands.jpg",
    },
  ],
};

export { Default };
export default Config;
