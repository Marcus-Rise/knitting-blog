import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Footer } from "./footer.component";

const Config: ComponentMeta<typeof Footer> = {
  title: "components/Footer",
  component: Footer,
};

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

const Default = Template.bind({});
Default.args = {
  authorLink: "https://marcus-rise.dev",
  authorName: "MarcusRise",
  year: "2022",
};

export default Config;
export { Default };
