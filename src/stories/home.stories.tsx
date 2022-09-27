import type { ComponentMeta, ComponentStory } from "@storybook/react";
import Home from "../pages/index";
import posts from "./sample-data.json";

const Config: ComponentMeta<typeof Home> = {
  title: "pages/Home",
  component: Home,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />;

const Default = Template.bind({});
Default.args = {
  posts,
};

export default Config;
export { Default };
