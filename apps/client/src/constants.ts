import type { TagProps } from "@ui/ui/components/TagGroup";

type Item = { id: number; name: string } & TagProps;

const INITIAL_ITEMS = [
  { id: 1, name: "News", color: "green" },
  { id: 2, name: "Travel", color: "yellow" },
  { id: 3, name: "Gaming", color: "blue" },
  { id: 4, name: "Shopping", color: "gray" },
] satisfies Item[];

const LONG_INITIAL_ITEMS = [
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
].map((item, index) => ({ ...item, id: index }));

export { type Item, INITIAL_ITEMS, LONG_INITIAL_ITEMS };
