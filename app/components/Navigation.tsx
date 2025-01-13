import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { asLink } from '@prismicio/helpers';
import { FilledContentRelationshipField } from '@prismicio/types';
import Logo from "./Logo";
import { createClient } from '@prismicio/client';
import styles from "@/app/custom.module.css";
import SearchComponent from './Search';
// import SearchModal from './SearchModal';
// import Image from "next/image";

const linkResolver = (doc: FilledContentRelationshipField<string, string, unknown>): string => {
  if (doc.type === 'page') {
    return `/${doc.uid}`;
  } else if (doc.type === 'projects') {
    return `/projects`;
  } else if (doc.type === 'news') {
    return `/news`;
  }
  return '/';
};

function classNames(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

const repositoryName = "prismiclimelights"; // Repository name
const endpoint = `https://${repositoryName}.cdn.prismic.io/api/v2`;

const client = createClient(endpoint);

// const Nav = ({ navigationData }) => { add from chatGPT

async function Nav() {
  const navigation1 = await client.getSingle("navigation");

  return (
    <Disclosure as="nav" className="mx-auto px-4 pt-4 md:pt-8 md:px-6 lg:pt-8 lg:max-w-[1440px]">
      <div className="relative flex items-center justify-between margin0auto">
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-1 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="block size-8 group-data-[open]:hidden" />
            <XMarkIcon aria-hidden="true" className="hidden size-8 group-data-[open]:block" />
          </DisclosureButton>
        </div>
        <div className="flex items-center justify-between w-full">
          
          <div className="flex shrink-0 items-center">
            <Link href={'/'}>
              <Logo />
            </Link>
          </div>

          <div className='flex items-center'>

          <div className="hidden sm:ml-6 sm:block sm:mr-10">
            <div className="flex space-x-4">
            <ul className="flex space-x-10 text-slate-600 mt-5 mb-3 md:mt-0 md:mb-0">
                {navigation1.data.slices.map((slice) => {
                  const link = asLink(slice.primary.link, linkResolver) || '/';
                  const isExternal = link.startsWith('http');
                  return (
                    <li key={slice.id} className={`${styles.topLevelLink}`}>
                      {isExternal ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {slice.primary.link_label}
                        </a>
                      ) : (
                        <Link href={link}>
                          {slice.primary.link_label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <SearchComponent />

          </div>

          {/* <Image src="./searchIcon.svg" alt="Search Icon" width={26} height={26} quality={100} className="inline-block mr-1.5 trigger" onClick={SearchModal}/>
          <div className={`${styles.modal}`}>
              <div className={`${styles.modalContent}`}>
                  <span className="closeButton">×</span>
                  <h1>Hello, I am a modal!</h1>
              </div>
          </div> */}

        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-5">
          {navigation1.data.slices.map((slice) => {
            const link = asLink(slice.primary.link) || '/'; // Ensure a fallback value
            const isExternal = link.startsWith('http');

            return (
              <DisclosureButton
                key={slice.id}
                as={isExternal ? 'a' : Link}
                href={link}
                {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                className={classNames(
                  'block rounded-md px-3 py-2 text-base font-medium',
                  isExternal ? 'text-blue-600' : 'text-gray-600 hover:bg-yellow-400 hover:text-white',
                )}
              >
                {slice.primary.link_label}
              </DisclosureButton>
            );
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Nav;