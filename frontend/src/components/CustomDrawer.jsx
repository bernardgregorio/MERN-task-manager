import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomDrawer = ({ children, open, setOpen, title, desc }) => {
  const isMobile = useIsMobile();
  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm overflow-auto mb-6">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{desc}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 overflow-y-auto">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
