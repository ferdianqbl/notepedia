const AuthLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen">
      {children}
    </main>
  );
};

export default AuthLayoutPage;
