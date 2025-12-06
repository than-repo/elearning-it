// src/components/Navbar/NavbarServer.tsx
import { getCategories } from "@/data/categories";
import NavbarClient from "./NavbarClient";
import { getCurrentUser } from "@/server/auth/get-user";

export default async function NavbarServer() {
  const [categories, user] = await Promise.all([
    getCategories(),
    getCurrentUser(),
  ]);

  return <NavbarClient categories={categories} user={user} />;
}
