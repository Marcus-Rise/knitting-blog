import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Header } from "./header.component";

const Config: ComponentMeta<typeof Header> = {
  title: "components/Header",
  component: Header,
};

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

const Default = Template.bind({});
Default.args = {
  title: "Надя вяжет",
};

export default Config;
export { Default };
