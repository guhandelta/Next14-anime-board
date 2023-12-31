"use client";

import { fetchAnime } from "@/app/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

// react-intersection-observer

let page = 2; // Declaring the page number here in a variable instead of a state is a much simpler solution

export type AnimeCard = JSX.Element; // This is the type of the AnimeCard component

function LoadMore() {
  const { ref, inView } = useInView({});
  const [data, setData] = useState<AnimeCard[]>([]); // An array of Anime Cards, as the server acion maps over the data, and returns the data in the form of JSX elements, instead of just the data

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]), // spread the current data and add the new data from the response
          page++; // increment the page number
      });
    }
  }, [inView]);

  return (
    <>
      {/* This section is for all teh subsequent pages from page 1 */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
