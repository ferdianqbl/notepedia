type Props = {
  title: string;
  pill: string;
  subheading?: string;
};

const TitleSection: React.FC<Props> = ({ title, pill, subheading }) => {
  return (
    <section className="flex flex-col gap-7 md:items-center items-start justify-center">
      <article className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand-secondaryBlue dark:to-brand-secondaryPurple">
        <p className="rounded-full px-3 py-1 dark:bg-black">{pill}</p>
      </article>
      {subheading ? (
        <>
          <h2 className="text-left text-3xl sm:text-5xl sm:max-w-[750px] md:text-center font-semibold">
            {title}
          </h2>
          <p className="text-left text-lg sm:max-w-[450px] md:text-center dark:text-secondary-purple-700">
            {subheading}
          </p>
        </>
      ) : (
        <h1
          className=" text-left 
            text-4xl
            sm:text-6xl
            sm:max-w-[850px]
            md:text-center
            font-semibold
          "
        >
          {title}
        </h1>
      )}
    </section>
  );
};

export default TitleSection;
