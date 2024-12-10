"use client"

import { useEffect } from "react";

// Utility function to set up Intersection Observer
const scrollTrigger = (selector: string, options: { rootMargin?: string; cb?: (el: Element) => void } = {}) => {
  const elements = Array.from(document.querySelectorAll(selector));

  elements.forEach((el) => {
    addObserver(el, options);
  });
};

const addObserver = (el: Element, options: { rootMargin?: string; cb?: (el: Element) => void }) => {
  if (!("IntersectionObserver" in window)) {
    if (options.cb) {
      options.cb(el);
    } else {
      el.classList.add("active");
    }
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (options.cb) {
            options.cb(entry.target);
          } else {
            entry.target.classList.add("active");
          }
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { rootMargin: options.rootMargin }
  );

  observer.observe(el);
};

// React Component
const ScrollReveal = () => {
  useEffect(() => {
    // Initialize the scrollTrigger on mount
    scrollTrigger(".scroll-reveal", {
      rootMargin: "25px",
    });
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This is a utility component, so it doesn't render anything itself
};

export default ScrollReveal;