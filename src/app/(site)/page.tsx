import CustomCard from "@/components/pages/landing-page/custom-card";
import TitleSection from "@/components/pages/landing-page/title-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { CLIENTS, USERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { randomUUID } from "crypto";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <section className="pt-10">
        <div className="gap-4 px-4 overflow-hidden sm:flex sm:items-center sm:justify-center sm:flex-col">
          <TitleSection
            pill="✨Your Workspace, Perfected"
            title="All-In-One Collaboration and Productivity Platform"
          />
        </div>
      </section>
      <section className="relative">
        <div
          className="overflow-hidden
          flex
          after:content['']
          after:dark:from-brand-dark
          after:to-transparent
          after:from-background
          after:bg-gradient-to-l
          after:right-0
          after:bottom-0
          after:top-0
          after:w-20
          after:z-10
          after:absolute

          before:content['']
          before:dark:from-brand-dark
          before:to-transparent
          before:from-background
          before:bg-gradient-to-r
          before:left-0
          before:top-0
          before:bottom-0
          before:w-20
          before:z-10
          before:absolute
        "
        >
          {[...Array(2)].map((arr) => (
            <div key={randomUUID()} className="flex flex-nowrap animate-slide ">
              {CLIENTS.map((client) => (
                <div
                  key={client.alt}
                  className=" relative
                    w-[200px]
                    m-20
                    shrink-0
                    flex
                    items-center
                  "
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={200}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="gap-4 px-4 mt-10 overflow-hidden sm:flex sm:items-center sm:justify-center sm:flex-col">
          <TitleSection
            title="Keep track of your meetings all in one place"
            subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
            pill="Features"
          />
          <div
            className="mt-10
          max-w-[450px]
          flex
          justify-center
          items-center
          rounded-2xl
          border-4
          overflow-hidden
          border-secondary-purple-300 
          border-opacity-10
        "
          >
            <Image
              src="/cal.png"
              alt="Banner"
              className=""
              width={500}
              height={400}
            />
          </div>
        </div>
      </section>
      <section className="pb-10">
        <div className="px-4 mt-20 overflow-x-hidden">
          <TitleSection
            title="Trusted by all"
            subheading="Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs."
            pill="Testimonials"
          />
          {[...Array(2)].map((arr, index) => (
            <div
              key={randomUUID()}
              className={cn("mt-10 flex flex-nowrap gap-4 w-full", {
                "flex-row-reverse": index === 1,
                "animate-[slide_20s_linear_infinite]": true,
                "animate-[slide_20s_linear_infinite_reverse]": index === 1,
                "ml-[100vw]": index === 1,
              })}
            >
              {USERS.map((testimonial, index) => (
                <CustomCard
                  key={testimonial.name}
                  className="w-[500px]
                  shrink-0
                  rounded-xl
                  dark:bg-gradient-to-t
                  dark:from-border dark:to-background
                "
                  header={
                    <div className="flex items-center gap-4 ">
                      <Avatar>
                        <AvatarImage src={`/avatars/${index + 1}.png`} />
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-foreground">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="dark:text-secondary-purple-800">
                          {testimonial.name.toLocaleLowerCase()}
                        </CardDescription>
                      </div>
                    </div>
                  }
                  cardContent={
                    <p className="dark:text-washed-purple-800">
                      {testimonial.message}
                    </p>
                  }
                ></CustomCard>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
