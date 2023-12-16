import TitleSection from "@/components/pages/landing-page/title-section";
import { CLIENTS } from "@/lib/constants";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <section>
        <div className="gap-4 px-4 mt-10 overflow-hidden sm:flex sm:items-center sm:justify-center sm:flex-col">
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
            <div key={arr} className="flex flex-nowrap animate-slide ">
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
                    className="object-contain max-w-none"
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
          relative
          sm:ml-0
          rounded-2xl
          border-8
          border-secondary-purple-300 
          border-opacity-10
        "
          >
            <Image
              src="/cal.png"
              alt="Banner"
              className="rounded-2xl"
              width={500}
              height={400}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
