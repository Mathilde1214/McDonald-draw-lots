import { createFileRoute } from "@tanstack/react-router";
import { NightSign } from "@/components/night-sign";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <NightSign />;
}
