import { createFileRoute } from "@tanstack/react-router";
import { useDateFormatter } from "react-aria/useDateFormatter";

import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@ui/ui/components/DataList";
import { Heading } from "@ui/ui/components/Heading";

const StatusComponent = () => {
  const dateFormatter = useDateFormatter({
    dateStyle: "full",
    timeStyle: "short",
  });
  const buildTimestamp = new Date(__BUILD_TIMESTAMP__);

  return (
    <main className="container mx-auto flex flex-col items-start gap-2 p-2">
      <Heading size="xl" fontWeight="semibold" level={1}>
        Status
      </Heading>
      <DataList>
        <DataListItem>
          <DataListItemLabel>Build Timestamp</DataListItemLabel>
          <DataListItemValue>
            <time dateTime={buildTimestamp.toISOString()}>
              {dateFormatter.format(buildTimestamp)}
            </time>
          </DataListItemValue>
        </DataListItem>
        <DataListItem>
          <DataListItemLabel>Version</DataListItemLabel>
          <DataListItemValue>{__VERSION__}</DataListItemValue>
        </DataListItem>
      </DataList>
    </main>
  );
};

const Route = createFileRoute("/status")({
  component: StatusComponent,
});

export { Route };
