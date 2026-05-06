import "@ui/ui/globals.css";

import { Folder, Home, Search, Settings } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { useListData } from "react-aria-components/useListData";

import { Button, buttonVariants } from "@ui/ui/components/Button";
import { Checkbox } from "@ui/ui/components/Checkbox";
import { ComboBox, ComboBoxItem } from "@ui/ui/components/ComboBox";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@ui/ui/components/DataList";
import { DateField } from "@ui/ui/components/DateField";
import { DatePicker } from "@ui/ui/components/DatePicker";
import {
  Dialog,
  DialogCloseButton,
  DialogTitle,
  DialogTrigger,
} from "@ui/ui/components/Dialog";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@ui/ui/components/Disclosure";
import { DisclosureGroup } from "@ui/ui/components/DisclosureGroup";
import { Heading } from "@ui/ui/components/Heading";
import { Link } from "@ui/ui/components/Link";
import { Modal } from "@ui/ui/components/Modal";
import { NumberField } from "@ui/ui/components/NumberField";
import { Popover, PopoverTrigger } from "@ui/ui/components/Popover";
import { Select, SelectItem } from "@ui/ui/components/Select";
import { Separator } from "@ui/ui/components/Separator";
import { Skeleton } from "@ui/ui/components/Skeleton";
import { Switch } from "@ui/ui/components/Switch";
import {
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@ui/ui/components/Tabs";
import { Tag, TagGroup, type TagProps } from "@ui/ui/components/TagGroup";
import { TextField } from "@ui/ui/components/TextField";
import { ToastRegion, toastQueue } from "@ui/ui/components/Toast";
import { Focusable, Tooltip, TooltipTrigger } from "@ui/ui/components/Tooltip";
import { Form } from "@ui/ui/components/form/index";
import { Github } from "@ui/ui/components/icons/Github";
import { focusRing } from "@ui/ui/utils/focusRing";

import { ThemeToggle } from "./components/ThemeToggle";

const INITIAL_ITEMS = [
  { id: 1, name: "News", color: "green" },
  { id: 2, name: "Travel", color: "yellow" },
  { id: 3, name: "Gaming", color: "blue" },
  { id: 4, name: "Shopping", color: "gray" },
] satisfies ({ id: number; name: string } & TagProps)[];

const LONG_INITIAL_ITEMS = [
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
  ...INITIAL_ITEMS,
].map((item, index) => ({ ...item, id: index }));

const App = () => {
  const list = useListData({ initialItems: INITIAL_ITEMS });

  return (
    <ThemeProvider>
      <div className="container mx-auto flex flex-col items-start gap-2 p-2">
        <button className={focusRing()}>span</button>

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
        <ComboBox label="Favorite animal" items={INITIAL_ITEMS}>
          {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
        </ComboBox>
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
                    <ComboBox
                      popoverProps={{ className: "max-h-[100px]" }}
                      label="Favorite animal"
                      items={LONG_INITIAL_ITEMS}
                    >
                      {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
                    </ComboBox>
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
                  <Disclosure>
                    <DisclosureHeader>Test scrolling</DisclosureHeader>
                    <DisclosurePanel>
                      <ul className="flex list-disc flex-col gap-2">
                        {LONG_INITIAL_ITEMS.map((item) => (
                          <li key={item.id}>{item.name}</li>
                        ))}
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
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
            toastQueue.add({
              title: "Files uploaded",
              description: "3 files uploaded successfully.",
              toastProps: { color: "accent" },
            })
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
        <DateField label="Date field" />
        <DatePicker label="datePicker" />
        <DisclosureGroup>
          <Disclosure>
            <DisclosureHeader>Personal Information</DisclosureHeader>
            <DisclosurePanel>Personal information form here.</DisclosurePanel>
          </Disclosure>
          <Disclosure>
            <DisclosureHeader>Billing Address</DisclosureHeader>
            <DisclosurePanel>Billing address form here.</DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
        <Tabs>
          <TabList aria-label="Tabs" variant="enclosed">
            <Tab id="home">Home</Tab>
            <Tab id="files">Files</Tab>
            <Tab isDisabled={true} id="search">
              Search
            </Tab>
            <Tab id="settings">Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel id="home" className="flex items-center justify-center">
              <Home />
            </TabPanel>
            <TabPanel id="files" className="flex items-center justify-center">
              <Folder />
            </TabPanel>
            <TabPanel id="search" className="flex items-center justify-center">
              <Search />
            </TabPanel>
            <TabPanel
              id="settings"
              className="flex items-center justify-center"
            >
              <Settings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ThemeProvider>
  );
};

export { App };
