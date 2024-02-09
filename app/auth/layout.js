import MainHeader from "../_components/auth/MainHeader";

export default function AuthLayout({ children }) {
  return (
    <main className="tw-flex tw-flex-col">
      <MainHeader />
      {children}
    </main>
  );
}
