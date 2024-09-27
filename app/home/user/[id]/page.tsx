import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag, Phone, AlertTriangle, BarChart } from "lucide-react"
import userI from "@/public/user.jpg"
import { getUser } from "../../actions"
import SpamDropdown from "@/components/User/SpamDropdown"

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)
  const spamPercentage = !isNaN(user.spam_statistics.spam_likelihood)
    ? (user.spam_statistics.spam_likelihood * 100).toFixed(2)
    : "N/A"

  const spamStatusText = user.is_spam ? "Marked as Spam" : "Not Spam"
  const spamBadgeVariant = user.is_spam ? "destructive" : "secondary"

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
        <SpamDropdown isSpam={user.is_spam} phone_number={user.phone_number} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
            <Image
              src={userI.src}
              alt={`${user.name}'s profile`}
              width={120}
              height={120}
              className="rounded-full border-4 border-primary/10"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold">{user.name || "Unknown User"}</h2>
            </div>
            <Badge variant={spamBadgeVariant} className="mt-2">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {spamStatusText}
            </Badge>
          </div>
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem icon={Phone} label="Phone Number" value={user.phone_number || "No phone number"} />
              <InfoItem
                icon={Flag}
                label="Spam Reports"
                value={`${user.spam_statistics.spam_reports} / ${user.spam_statistics.total_spam_reports}`}
                badge
                badgeVariant={spamBadgeVariant}
              />
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <h3 className="text-lg font-semibold flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Spam Statistics
              </h3>
              <p className="text-sm">
                <span className="font-medium">Spam Likelihood:</span> {spamPercentage}%
              </p>
              <p className="text-sm">
                <span className="font-medium">Users Reported:</span> {user.spam_statistics.users_reported}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface InfoItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  badge?: boolean;
  badgeVariant?: "default" | "secondary" | "destructive";
}

function InfoItem({ icon: Icon, label, value, badge = false, badgeVariant = "default" }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        {badge ? (
          <Badge variant={badgeVariant} className="mt-1">
            {value}
          </Badge>
        ) : (
          <p className="text-sm text-muted-foreground">{value}</p>
        )}
      </div>
    </div>
  )
}