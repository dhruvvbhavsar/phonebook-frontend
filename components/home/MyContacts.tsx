import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AddDialog from "./AddDialog";
import Image from "next/image";
import userI from "@/public/user.jpg";
import { Badge } from "../ui/badge";
import { getContacts } from "@/app/home/actions";

type Contact = {
  id: number;
  name: string;
  phone_number: string;
  isSpam: boolean;
};

export default async function MyContacts() {
  const contacts = await getContacts();
  console.log(contacts);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>My Contacts</CardTitle>
          <AddDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact: Contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={userI.src}
                      alt={`${contact.name}'s profile`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex gap-2 items-center">
                      <p className="font-medium">{contact.name}</p>
                      {contact.isSpam && (
                        <Badge variant="destructive">Spam</Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{contact.phone_number}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
