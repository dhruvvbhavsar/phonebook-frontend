import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlobalDatabaseClient from "./global-database-client";
import { getGlobalContacts } from "../actions";

export default async function GlobalDatabasePage() {
  const allUsers = await getGlobalContacts();
  console.log(allUsers);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Global User Database
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <GlobalDatabaseClient initialUsers={allUsers} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
