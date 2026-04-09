interface MenuSectionProps {
  children: React.ReactNode;
  title: string;
}

export const MenuSection = ({ title, children }: MenuSectionProps) => {
  return (
    <section>
      <h3 className="mt-7 mb-3 text-center text-lg font-medium text-slate-900">
        {title}
      </h3>
      <div>{children}</div>
    </section>
  );
};
