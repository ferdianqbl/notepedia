type Props = {
  children: React.ReactNode;
  params?: any;
};

const LayoutPage: React.FC<Props> = ({ children, params }) => {
  return <main className="flex h-screen overflow-hidden">{children}</main>;
};

export default LayoutPage;
