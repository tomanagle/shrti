import { Table } from "@mantine/core";
import { trpc } from "@/utils/trpc";
import { env } from "@/env/client.mjs";
import Link from "next/link";

export function Redirects() {
  const { data } = trpc.redirect.myRedirects.useQuery();

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Redirects to</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((redirect) => {
            const url = `${env.NEXT_PUBLIC_URL}/${redirect.shortId}`;

            return (
              <tr key={redirect.id}>
                <td>{url}</td>
                <td>{redirect.url}</td>
                <tr>
                  <Link href={`/redirects/${redirect.shortId}`}>VIEW</Link>
                </tr>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
