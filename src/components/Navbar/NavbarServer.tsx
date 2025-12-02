// src/components/Navbar/ServerNavbar.tsx
// Server Component (fetch data)
import { getCategories } from "@/data/categories";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const categories = await getCategories(); // fetch + transform + cache

  return <NavbarClient categories={categories} />;
}
