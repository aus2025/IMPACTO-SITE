import './blog-styles.css';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-content-container">
      {children}
    </div>
  );
} 