import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Hr } from "./hr.component";

const Config: ComponentMeta<typeof Hr> = {
  title: "components/Hr",
  component: Hr,
};

const Template: ComponentStory<typeof Hr> = (args) => <Hr {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
