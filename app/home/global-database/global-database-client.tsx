"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Eye, Search, Users } from "lucide-react";
import userI from "@/public/user.jpg";
import { User } from "@/lib/types";

const USERS_PER_PAGE = 10;

export default function GlobalDatabaseClient({
  initialUsers,
}: {
  initialUsers: User[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = initialUsers.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    switch (searchType) {
      case "name":
        return user.name.toLowerCase().includes(searchLower);
      case "phone":
        return user.phone_number.includes(searchTerm);
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Search by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
      </div>
      {initialUsers.length === 0 ? (
        <div className="text-center py-10">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No users</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding some users to the database.
          </p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-10">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No results found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            We couldnt find any users matching your search. Try adjusting your
            search terms.
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Spam Ratio</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={userI.src}
                        alt={`${user.name}'s profile`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        {user.isSpam && (
                          <Badge variant="destructive">Spam</Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone_number}</p>
                  </TableCell>
                  <TableCell>
                    {user.spamRatio > 0 ? (
                      <Badge
                        variant={
                          user.spamRatio > 0.2 ? "destructive" : "secondary"
                        }
                      >
                        {(user.spamRatio * 100).toFixed(2)}%
                      </Badge>
                    ) : (
                      <Badge className="bg-green-700" variant="default">
                        Good
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/home/user/${user.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <Button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
