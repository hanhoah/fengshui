"use client";

// pages/index.js
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("notes").select("*");

      if (error) {
        console.error(error);
      } else {
        setData(data);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
