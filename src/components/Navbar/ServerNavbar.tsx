// src/components/Navbar/UdemyNavbar.tsx
// Server Component (fetch data)
import { getCategories } from "@/data/categories";
import NavbarClient from "./NavbarClient";

export default async function ServerNavbar() {
  const categories = await getCategories(); // fetch + transform + cache ở đây

  return <NavbarClient categories={categories} />;
}
