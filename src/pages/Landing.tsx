import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="#" className="flex items-center justify-center">
          <CheckSquare className="h-6 w-6" />
          <span className="sr-only">Todo App</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <AuthButton
            trigger={
              <Button variant="ghost">
                Login
              </Button>
            }
            dashboardTrigger={
              <Button variant="ghost">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            }
          />
          <AuthButton
            trigger={<Button>Get Started</Button>}
            dashboardTrigger={
              <Button>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            }
          />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Organize your life, one task at a time
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The simple, intuitive, and beautiful todo app to help you stay
                  on top of your tasks.
                </p>
              </div>
              <div className="space-x-4">
                <AuthButton
                  trigger={<Button size="lg">Get Started</Button>}
                  dashboardTrigger={
                    <Button size="lg">
                      <Link to="/dashboard">Go To Your Todos</Link>
                    </Button>
                  }
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}