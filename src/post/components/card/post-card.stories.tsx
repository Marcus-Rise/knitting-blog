import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { PostCard } from "./post-card.component";

const Config: ComponentMeta<typeof PostCard> = {
  title: "Post/Preview",
  component: PostCard,
};

const Template: ComponentStory<typeof PostCard> = (args) => <PostCard {...args} />;

const Default = Template.bind({});
Default.args = {
  title: "Джемпер «Вечерние флоксы»",
  description:
    "Да, флоксы хороши именно вечером. Вся эта душная и густая полифония полудня стихает, и ты улавливаешь тонкую струйку аромата из самой сердцевины летней роскоши. Многообразие оттенков вдохновляет, но мой фаворит вот этот, закатно-фиолетовый, чуть подкрашенный сумерками. Кстати, у «Charme» от Vita много чудесных оттенков.",
  slug: "post-slug",
  image: {
    src: "https://images.prismic.io/nextjs-starter-prismic-blog/fb66c550-06ee-406b-8be3-06ac639f7bb0_laura-kennedy-VVUOodsIwj4-unsplash.jpg?auto=compress%2Cformat&rect=0%2C1404%2C3744%2C2808&w=3840&fit=max",
    alt: "Сидит заяц на заборе",
    height: 1280,
    width: 852,
  },
  date: "2020-12-21T17:56:12+0000",
};

export default Config;
export { Default };
