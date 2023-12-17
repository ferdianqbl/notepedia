"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const routes = [
  { title: "Features", href: "#features" },
  { title: "Reasources", href: "#resources" },
  { title: "Pricing", href: "#pricing" },
  { title: "Testimonials", href: "#testimonial" },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
  const [path, setPath] = useState("#resources");
  return (
    <header className="flex items-center justify-between p-4">
      <Link
        href={"/"}
        className="rounded-full p-[1px] text-2xl dark:bg-gradient-to-r dark:from-brand-secondaryBlue dark:to-brand-secondaryPurple w-fit"
      >
        <p className="px-3 py-1 rounded-full dark:bg-black">Notepedia</p>
      </Link>
      <NavigationMenu className="hidden max-w-full mx-auto md:block">
        <NavigationMenuList className="flex items-center justify-center gap-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#resources")}
              className={cn({
                "dark:text-white": path === "#resources",
                "dark:text-white/40": path !== "#resources",
                "font-normal": true,
                "text-base": true,
              })}
            >
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul
                className="grid
                gap-3
                p-6
                md:w-[400px]
                ld:w-[500px]
                lg:grid-cols-[.75fr_1fr]
                "
              >
                <li className="row-span-3">
                  <span className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md ">
                    Welcome
                  </span>
                </li>
                <ListItem href="#" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="#" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="#" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              onClick={() => setPath("#pricing")}
              className={cn({
                "dark:text-white": path === "#pricing",
                "dark:text-white/40": path !== "#pricing",
                "font-normal": true,
                "text-base": true,
              })}
            >
              Pricing
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4  md:grid-row-2  ">
                <ListItem title="Pro Plan" href={"#"}>
                  Unlock full power with collaboration.
                </ListItem>
                <ListItem title={"free Plan"} href={"#"}>
                  Great for teams just starting out.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuContent>
              <ul
                className="grid w-[400px]
              gap-3
              p-4
              md:w-[500px]
              md:grid-cols-2 
              lg:w-[600px]
              "
              >
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(navigationMenuTriggerStyle(), {
                "dark:text-white": path === "#testimonials",
                "dark:text-white/40": path !== "#testimonials",
                "font-normal": true,
                "text-base": true,
              })}
            >
              Testimonial
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <aside className="flex justify-end gap-2 ">
        <Link href={"/login"}>
          <Button variant="btn-secondary" className="hidden p-1 sm:block">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button variant="btn-primary" className="whitespace-nowrap">
            Sign Up
          </Button>
        </Link>
      </aside>
    </header>
  );
};

export default Header;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-1 font-medium leading-none"
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-white">
            {title}
          </div>
          <p className="text-sm leading-snug group-hover:text-white/70 line-clamp-2 text-white/40 ">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
