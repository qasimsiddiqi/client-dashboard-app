import Image from "next/image";
import ProjectsList from "./components/ProjectsList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProjectsList />
    </main>
  );
}
