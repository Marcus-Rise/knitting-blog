import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Title } from "./title.component";

const Config: ComponentMeta<typeof Title> = {
  title: "components/Title",
  component: Title,
};

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

const Default = Template.bind({});
Default.args = {
  children: "Title",
};

export default Config;
export { Default };
