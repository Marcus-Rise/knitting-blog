import type { Meta, Story } from "@storybook/react";
import type { FC } from "react";
import { useRef } from "react";
import { useSwipe } from "./swipe.hook";

interface IExampleProps {
  onLeft: () => void;
  onRight: () => void;
}

const Example: FC<IExampleProps> = ({ onLeft, onRight }) => {
  const ref = useRef(null);

  useSwipe(ref, { onLeft, onRight });

  return (
    <div ref={ref} style={{ width: "100px", height: "100px", backgroundColor: "red" }}>
      swipe me
    </div>
  );
};

const Config: Meta = {
  title: "components/Swipe",
  component: Example,
};

const Template: Story<IExampleProps> = (args) => <Example {...args} />;

const Default = Template.bind({});
Default.args = {
  onLeft: () => console.debug("swipe left"),
  onRight: () => console.debug("swipe right"),
};

export { Default };
export default Config;
