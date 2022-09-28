import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Layout } from "./layout.component";

const Config: ComponentMeta<typeof Layout> = {
  title: "components/Layout",
  component: Layout,
};

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

const Default = Template.bind({});
Default.args = {
  title: "Title",
  authorLink: "https://marcus-rise.dev",
  authorName: "Marcus Rise",
  children: <>content</>,
};

export default Config;
export { Default };
