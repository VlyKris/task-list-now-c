import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowRight, CheckSquare, Rocket, ShieldCheck, Zap } from "lucide-react";
import { useRef, Suspense } from "react";
import { Link } from "react-router";
import * as THREE from "three";

const HeroAnimation = () => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Box args={[2.5, 2.5, 2.5]}>
        <meshStandardMaterial color={"hsl(var(--primary))"} wireframe />
      </Box>
      <Box args={[2.5, 2.5, 2.5]} rotation={[0.4, 0.4, 0.4]}>
        <meshStandardMaterial color={"hsl(var(--secondary))"} wireframe />
      </Box>
    </group>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, x: -5, transition: { duration: 0.2 } }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-card p-6 rounded-md border-2 flex flex-col items-start shadow-[6px_6px_0px_hsl(var(--border))]"
  >
    <div className="flex items-center justify-center h-12 w-12 rounded-sm bg-primary/10 text-primary mb-4 border-2 border-primary/20">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground dark">
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b-2">
        <Link to="#" className="flex items-center justify-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">TodoApp</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <AuthButton
            trigger={<Button variant="ghost">Login</Button>}
            dashboardTrigger={<Button variant="ghost"><Link to="/dashboard">Dashboard</Link></Button>}
          />
          <AuthButton
            trigger={<Button className="shadow-[4px_4px_0px_hsl(var(--border))] border-2 hover:shadow-none active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>}
            dashboardTrigger={<Button><Link to="/dashboard">Dashboard</Link></Button>}
          />
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-70">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
              <Suspense fallback={null}>
                <HeroAnimation />
              </Suspense>
            </Canvas>
          </div>
          <div className="relative z-10 container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center space-y-6 text-center"
            >
              <motion.div 
                className="inline-block rounded-md border-2 bg-secondary text-secondary-foreground text-sm px-4 py-1.5"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                The #1 app for task management
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Master your day, conquer your goals
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                The simple, intuitive, and beautiful todo app designed to help you stay focused, organized, and ahead of your tasks.
              </p>
              <motion.div 
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <AuthButton
                  trigger={<Button size="lg" className="shadow-[4px_4px_0px_hsl(var(--border))] border-2 hover:shadow-none active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">Start for free <ArrowRight className="ml-2 h-5 w-5"/></Button>}
                  dashboardTrigger={<Button size="lg"><Link to="/dashboard">Go To Your Todos</Link></Button>}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background z-10 relative">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Everything you need, nothing you don't</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-lg mt-4">
                Our features are designed for maximum productivity and minimum distraction.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <FeatureCard 
                icon={<Zap className="w-6 h-6" />} 
                title="Effortless Tasking"
                description="Quickly add, organize, and prioritize your tasks with a clean, intuitive interface."
                delay={0.2}
              />
              <FeatureCard 
                icon={<Rocket className="w-6 h-6" />} 
                title="Boost Productivity"
                description="Stay on track with smart reminders and progress visualization. Never miss a deadline again."
                delay={0.4}
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-6 h-6" />} 
                title="Secure & Private"
                description="Your data is yours alone. We ensure your tasks are securely stored and synced across devices."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 z-10 relative">
          <div className="container px-4 md:px-6">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card border-2 rounded-md p-8 md:p-12 text-center shadow-[8px_8px_0px_hsl(var(--border))]"
            >
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Get Organized?</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Sign up now and transform the way you manage your tasks. It's free to get started.
              </p>
              <div className="mt-6">
                 <AuthButton
                  trigger={<Button size="lg" className="shadow-[4px_4px_0px_hsl(var(--border))] border-2 hover:shadow-none active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">Join for Free</Button>}
                  dashboardTrigger={<Button size="lg"><Link to="/dashboard">Back to App</Link></Button>}
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="z-10 border-t-2 py-6 px-4 md:px-6 bg-background">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; 2024 TodoApp. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">
            Built with{" "}
            <a
              href="https://vly.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              vly.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}