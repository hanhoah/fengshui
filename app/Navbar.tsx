"use client";

import Link from "next/link";
import Logo from "./components/Logo";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [categories, setCategories] = useState<
    { id: number; name: string; slug: string }[]
  >([]);
  // Zustand des Menus (in der mobilen Darstellung)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*");

      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  const handleMobileMenuClick = () => {
    console.log("handleMobileMenuClick");
    setIsMenuOpen(false);
  };

  const handleCategoryClick = () => {
    console.log("handleCategoryClick");
    // Close the details element in the desktop view if it is open
    const detailsElement = document.getElementById("categories-details");
    if (detailsElement) {
      detailsElement.removeAttribute("open");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-screen"
            >
              <li onClick={handleMobileMenuClick}>
                <Link href="/blog">Blog</Link>
              </li>
              <li onClick={handleMobileMenuClick}>
                <a>Shopping</a>
              </li>
              <li onClick={handleMobileMenuClick}>
                <a>Kategorien</a>
                <ul className="p-2">
                  {categories.map((category) => (
                    <li onClick={handleMobileMenuClick} key={category.id}>
                      <Link href={`/blog/${category.slug}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li onClick={handleMobileMenuClick}>
                <a>FAQ</a>
              </li>
            </ul>
          )}
        </div>
        <Logo />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-lg">
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <a>Shopping</a>
          </li>
          <li>
            <details id="categories-details">
              <summary>Kategorien</summary>
              <ul className="p-2">
                {categories.map((category) => (
                  <li key={category.id} onClick={handleCategoryClick}>
                    <Link href={`/blog/${category.slug}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <a>FAQ</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
