import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  PieChart,
  CircleArrowOutUpRight,
  FileSpreadsheet,
  FileStack,
  UsersRound,
  Calendar,
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "@/components/layout/NavMain";
import { NavProjects } from "@/components/layout/NavSettings";
import { NavUser } from "@/components/layout/NavUser";
import { SiteName } from "@/components/layout/SiteName";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Bernard Gregorio",
    email: "bg@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: FileSpreadsheet,
      isActive: true,
    },
    {
      title: "Todos",
      url: "/todos",
      icon: FileStack,
    },
    {
      title: "Members",
      url: "/users",
      icon: UsersRound,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: Calendar,
    },
  ],
  settings: [
    {
      name: "Priority",
      url: "#",
      icon: CircleArrowOutUpRight,
    },
    {
      name: "Status",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SiteName />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.settings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
