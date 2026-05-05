import "@ui/ui/globals.css";

import { ThemeProvider } from "next-themes";
import { useListData } from "react-aria-components/useListData";

import { Button, buttonVariants } from "@ui/ui/components/Button";
import { Checkbox } from "@ui/ui/components/Checkbox";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@ui/ui/components/DataList";
import {
  Dialog,
  DialogCloseButton,
  DialogTitle,
  DialogTrigger,
} from "@ui/ui/components/Dialog";
import { Heading } from "@ui/ui/components/Heading";
import { Link } from "@ui/ui/components/Link";
import { Modal } from "@ui/ui/components/Modal";
import { NumberField } from "@ui/ui/components/NumberField";
import { Popover, PopoverTrigger } from "@ui/ui/components/Popover";
import { Select, SelectItem } from "@ui/ui/components/Select";
import { Separator } from "@ui/ui/components/Separator";
import { Skeleton } from "@ui/ui/components/Skeleton";
import { Switch } from "@ui/ui/components/Switch";
import { Tag, TagGroup, type TagProps } from "@ui/ui/components/TagGroup";
import { TextField } from "@ui/ui/components/TextField";
import { ToastRegion, toastQueue } from "@ui/ui/components/Toast";
import { Focusable, Tooltip, TooltipTrigger } from "@ui/ui/components/Tooltip";
import { Form } from "@ui/ui/components/form/index";
import { Github } from "@ui/ui/components/icons/Github";

import { ThemeToggle } from "./components/ThemeToggle";

const INITIAL_ITEMS = [
  { id: 1, name: "News", color: "green" },
  { id: 2, name: "Travel", color: "yellow" },
  { id: 3, name: "Gaming", color: "blue" },
  { id: 4, name: "Shopping", color: "gray" },
] satisfies ({ id: number; name: string } & TagProps)[];

const App = () => {
  const list = useListData({ initialItems: INITIAL_ITEMS });

  return (
    <ThemeProvider>
      <div className="container mx-auto flex flex-col items-start gap-2 p-2">
        <Heading size="xl" fontWeight="semibold" level={1}>
          jeremy-code/ui
        </Heading>
        <Link
          underline={false}
          className={(renderProps) => buttonVariants(renderProps)}
          href="https://github.com/jeremy-code/ui"
          target="_blank"
        >
          <Github aria-hidden />
          Github
        </Link>
        <ThemeToggle>Toggle theme</ThemeToggle>
        <Separator className="my-2" />
        <Link color="blue" underline="hover" href="/">
          This is a link
        </Link>
        <Checkbox>Checkbox</Checkbox>
        <PopoverTrigger>
          <Button variant="surface" aria-label="Settings">
            Open popover
          </Button>
          <Popover className="flex flex-col gap-2 p-4" showArrow>
            Popover content
          </Popover>
        </PopoverTrigger>
        <Select label="Favorite Animal" items={INITIAL_ITEMS}>
          {(item) => <SelectItem>{item.name}</SelectItem>}
        </Select>
        <Skeleton className="h-13 w-full" />
        <NumberField defaultValue={1024} minValue={0} label="Number field" />
        <TextField label="Text field" />
        <TooltipTrigger>
          <Focusable>
            <span role="button">Tooltip</span>
          </Focusable>
          <Tooltip>Tooltip has been opened</Tooltip>
        </TooltipTrigger>
        <DialogTrigger>
          <Button>Dialog trigger</Button>
          <Modal>
            <Dialog className="flex flex-col gap-4">
              {(renderProps) => (
                <>
                  <DialogCloseButton />
                  <DialogTitle>Subscribe to our newsletter</DialogTitle>
                  <p className="text-sm">
                    Enter your information to subscribe to our newsletter and
                    receive updates about new features and announcements.
                  </p>
                  <Form
                    onSubmit={(event) => {
                      event.preventDefault();
                      renderProps.close();
                    }}
                  >
                    <TextField
                      autoFocus
                      label="Name"
                      placeholder="Enter your full name"
                    />
                    <TextField
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <div className="flex gap-2 self-end">
                      <Button slot="close" variant="ghost">
                        Cancel
                      </Button>
                      <Button type="submit" variant="muted">
                        Subscribe
                      </Button>
                    </div>
                  </Form>
                </>
              )}
            </Dialog>
          </Modal>
        </DialogTrigger>
        <Switch>Switch</Switch>
        <TagGroup
          label="Categories"
          selectionMode="multiple"
          items={INITIAL_ITEMS}
        >
          {({ name, ...item }) => <Tag {...item}>{name}</Tag>}
        </TagGroup>
        <TagGroup
          label="Categories"
          items={list.items}
          onRemove={(keys) => list.remove(...keys)}
          tagListProps={{
            renderEmptyState: () => <div>No categories</div>,
          }}
        >
          {({ name, ...item }) => <Tag {...item}>{name}</Tag>}
        </TagGroup>
        <ToastRegion />
        <Button
          onPress={() =>
            toastQueue.add(
              {
                title: "Files uploaded",
                description: "3 files uploaded successfully.",
              },
              undefined,
            )
          }
        >
          Show Toast
        </Button>
        <DataList>
          {INITIAL_ITEMS.map((item) => (
            <DataListItem key={item.id}>
              <DataListItemLabel>{item.name}</DataListItemLabel>
              <DataListItemValue>{item.color}</DataListItemValue>
            </DataListItem>
          ))}
        </DataList>
      </div>
    </ThemeProvider>
  );
};

export { App };
