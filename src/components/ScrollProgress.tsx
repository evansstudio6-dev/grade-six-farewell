import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 top-0 z-[200] h-[3px] origin-left bg-gold"
      style={{ scaleX: scrollYProgress, width: "100%" }}
    />
  );
}
