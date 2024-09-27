import MyContacts from "@/components/home/MyContacts";
import UserProfile from "@/components/home/UserProfile";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <UserProfile />
      <MyContacts />
    </div>
  );
}
