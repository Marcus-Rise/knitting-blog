import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Theme, ThemeToggle } from "./theme-toggle.component";
import type { FC } from "react";
import { useState } from "react";

const Config: ComponentMeta<typeof ThemeToggle> = {
  title: "components/ThemeToggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof ThemeToggle> = (args) => <ThemeToggle {...args} />;

const Default = Template.bind({});

const System = Template.bind({});
System.args = {
  value: Theme.SYSTEM,
};

const Light = Template.bind({});
Light.args = {
  value: Theme.LIGHT,
};

const Dark = Template.bind({});
Dark.args = {
  value: Theme.DARK,
};

const Interactive: FC = () => {
  const [theme, setTheme] = useState(Theme.SYSTEM);

  return <ThemeToggle onChange={setTheme} value={theme} />;
};

export default Config;
export { Default, Light, System, Dark, Interactive };
