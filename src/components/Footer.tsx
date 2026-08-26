import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/60 py-10">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} Armando Chanto. Built with Next.js &amp; Tailwind CSS.</p>
        <div className="flex gap-6">
          <a href="https://github.com/achanto98" className="hover:text-accent" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/armando-chanto-cr2904/" className="hover:text-accent" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:armax2904@gmail.com" className="hover:text-accent">
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
