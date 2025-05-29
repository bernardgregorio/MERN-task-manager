import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const Layout = () => {
  const { pageTitle } = useContext(AuthContext);
  return (
    <>
      <SidebarProvider className="font-roboto">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold">
                      {pageTitle}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="mb-20">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Layout;
