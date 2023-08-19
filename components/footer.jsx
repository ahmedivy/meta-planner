import { ModeToggle } from "./theme-toggle";

function Footer() {
  return (
    <footer className="flex items-center h-16 w-full container">
      <p className="text-muted-foreground">© 2023 Meta Planner Inc.</p>
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </footer>
  );
}

export default Footer;
