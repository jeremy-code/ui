import { createFileRoute } from "@tanstack/react-router";
import { useDateFormatter } from "react-aria/useDateFormatter";

import { REPO_URL } from "#constants";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@ui/ui/components/DataList";
import { Heading } from "@ui/ui/components/Heading";
import { Link } from "@ui/ui/components/Link";

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
        {import.meta.env.COMMIT_REF !== undefined && (
          <DataListItem>
            <DataListItemLabel>Commit</DataListItemLabel>
            <DataListItemValue>
              <Link href={`${REPO_URL}/commit/${import.meta.env.COMMIT_REF}`}>
                {import.meta.env.COMMIT_REF}
              </Link>
            </DataListItemValue>
          </DataListItem>
        )}
      </DataList>
    </main>
  );
};

const Route = createFileRoute("/status")({
  component: StatusComponent,
});

export { Route };
