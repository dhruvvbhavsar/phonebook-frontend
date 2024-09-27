import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import userI from "@/public/user.jpg";
import { getSession } from "@/lib/actions";
import { Badge } from "../ui/badge";

function formatTimeAgo(date: number | string) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
}

export default async function UserProfile() {
  const { user } = await getSession();
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={userI.src}
            alt={`${user.name}'s profile`}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              {user.is_verified == 1 ? (
                <Badge className="bg-green-700" variant="default">
                  Email Verified
                </Badge>
              ) : (
                <Badge className="bg-yellow-500" variant="default">
                  Not Verified
                </Badge>
              )}
            </div>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Mobile</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.phone_number}</dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">City</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.city}</dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Country</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.country}</dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Created</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatTimeAgo(user.created_at)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
