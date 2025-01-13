"use client"

// import { useEffect } from "react";

// const SearchModal = () => {
//     useEffect(() => {
//         // Client-side only code
//         const modal = document.querySelector(".modal") as HTMLElement | null;
//         const trigger = document.querySelector(".trigger") as HTMLElement | null;
//         const closeButton = document.querySelector(".closeButton") as HTMLElement | null;

//         function toggleModal() {
//             if (modal) {
//                 modal.classList.toggle("showModal");
//             }
//         }

//         function windowOnClick(event: MouseEvent) {
//             if (event.target === modal) {
//                 toggleModal();
//             }
//         }

//         if (trigger) {
//             trigger.addEventListener("click", toggleModal);
//         }

//         if (closeButton) {
//             closeButton.addEventListener("click", toggleModal);
//         }

//         window.addEventListener("click", windowOnClick);

//         // Cleanup event listeners when the component unmounts
//         return () => {
//             if (trigger) {
//                 trigger.removeEventListener("click", toggleModal);
//             }

//             if (closeButton) {
//                 closeButton.removeEventListener("click", toggleModal);
//             }

//             window.removeEventListener("click", windowOnClick);
//         };
//     }, []); // Runs once on the client side

//     return null;
// };

// export default SearchModal;

function SearchModal() {
    console.log('Hello');
}

export default SearchModal;