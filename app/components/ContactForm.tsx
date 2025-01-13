"use client"
import React from 'react';

export function ContactForm() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        // Type assertion for the target to ensure TypeScript understands the form elements
        const form = e.currentTarget;
        
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "57de5845-a34e-4f64-aa7b-776d7985913a",
                name: (form.elements.namedItem('name') as HTMLInputElement).value,
                phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
                email: (form.elements.namedItem('email') as HTMLInputElement).value,
                message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
            }),
        });
        
        const result = await response.json();
        if (result.success) {
            console.log(result);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <input type="hidden" name="subject" value="New contact form submission from Limelights website" aria-hidden="true" />
                <input type="checkbox" name="botcheck" className="honeyPot" autoComplete="off" aria-hidden="true" />
                <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-1">Name*</label>
                    <input type="text" name="name" required placeholder="Your name" aria-label="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-1">Telephone*</label>
                    <input type="number" name="phone" required placeholder="Your phone number" inputMode="numeric" aria-label="Enter your name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">Email*</label>
                    <input type="email" name="email" required placeholder="email@example.com" aria-label="Enter your email address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-1">Message*</label>
                    <textarea name="message" placeholder="Enter Message" aria-label="Enter your message" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <button type="submit" aria-label="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Form</button>
            </form>
        </>
    );
}

export default ContactForm;