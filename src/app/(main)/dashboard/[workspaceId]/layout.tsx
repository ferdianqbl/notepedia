import Sidebar from "@/components/pages/workspace/sidebar";

type Props = {
  children: React.ReactNode;
  params?: any;
};

const LayoutPage: React.FC<Props> = ({ children, params }) => {
  return (
    <main className="flex w-screen h-screen overflow-hidden">
      <Sidebar params={params} />
      <div className="dark:border-neutral-600/50 border-l-[1px] w-full relative overflow-auto">
        {children}
      </div>
    </main>
  );
};

export default LayoutPage;
