import type { Meta, Story } from "@storybook/react";
import * as Icons from "./index";

const Config: Meta = {
  title: "components/IconsStories",
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem", gap: "1rem", display: "flex" }}>
        <Story />
      </div>
    ),
  ],
};

const icons = Object.values(Icons).map((Icon, index) => {
  const iconSize = "3rem";

  return <Icon key={index} width={iconSize} height={iconSize} />;
});

const Template: Story = () => <>{icons}</>;

const Default = Template.bind({});

export default Config;
export { Default };
