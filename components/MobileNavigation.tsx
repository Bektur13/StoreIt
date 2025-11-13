'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@radix-ui/react-separator";

interface Props {
    $id: string,
    accoundId: string,
    fullName: string,
    avatar: string,
    email: string
}

const MobileNavigation = ({
    $id: ownerId,
    accoundId,
    fullName,
    avatar,
    email,
}: Props) => {

    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="mobile-header">
            <Image
                src="/assets/icons/logo-full-brand.svg"
                alt="logo"
                width={120}
                height={52}
                className="h-auto"
            />

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Image 
                        src="/assets/icons/menu.svg"
                        alt="Search"
                        width={30}
                        height={30}
                    />
                </SheetTrigger>
                <SheetContent className="shad-sheet h-screen px-3">
                        <SheetTitle>
                            <div className="header-user">
                                <Image 
                                    src={avatar}
                                    alt="avatar"
                                    width={44}
                                    height={44}
                                    className="header-user-avatar"
                                />
                                <div className="sm:hidden lg:block">
                                    <p className="subtitle-2 capitalize">{fullName}</p>
                                    <p className="caption">{email}</p>
                                </div>
                            </div>
                            <Separator />
                        </SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                </SheetContent>
            </Sheet>

        </header>
    )
}

export default MobileNavigation