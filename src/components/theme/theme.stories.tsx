import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme } from "./theme.component";

const Config: ComponentMeta<typeof Theme> = {
  title: "components/Theme",
  component: Theme,
};

const Template: ComponentStory<typeof Theme> = (args) => <Theme {...args} />;

const Default = Template.bind({});

export default Config;
export { Default };
