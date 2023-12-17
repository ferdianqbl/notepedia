const AuthLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex items-center justify-center w-full min-h-screen">
      {children}
    </main>
  );
};

export default AuthLayoutPage;
