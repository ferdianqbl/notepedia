import Header from "@/components/pages/landing-page/header";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Header />
      {children}
    </main>
  );
};

export default HomePageLayout;
