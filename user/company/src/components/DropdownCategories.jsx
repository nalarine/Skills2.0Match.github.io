import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { BsCheck2, BsChevronExpand } from 'react-icons/bs'
import { jobCategories } from '../utils/data'

export default function DropdownCategories({
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
}) {
  return (
    <div className="w-full">
      <Listbox value={selectedCategory} onChange={setSelectedCategory}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm">
            <span className="block truncate">
              {selectedCategory || 'Select Category'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {jobCategories.map((category) => (
                <Listbox.Option
                  key={category.category}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={category.category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category.category}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <BsCheck2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {selectedCategory && (
        <Listbox value={selectedSubcategory} onChange={setSelectedSubcategory}>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none border border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm">
              <span className="block truncate">
                {selectedSubcategory || 'Select Subcategory'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronExpand
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {jobCategories
                  .find((category) => category.category === selectedCategory)
                  ?.subcategories.map((subcategory) => (
                    <Listbox.Option
                      key={subcategory}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={subcategory}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {subcategory}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <BsCheck2
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  )
}