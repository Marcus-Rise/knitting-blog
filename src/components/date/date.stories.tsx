import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { DateComponent } from "./date.component";

const Config: ComponentMeta<typeof DateComponent> = {
  title: "components/DateComponent",
  component: DateComponent,
};

const Template: ComponentStory<typeof DateComponent> = (args) => <DateComponent {...args} />;

const Default = Template.bind({});
Default.args = {};

export default Config;
export { Default };
