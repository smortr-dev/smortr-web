import React, { useState } from "react"
import { useRouter } from "next/navigation"

const CustomDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const router = useRouter()

  const handleSelect = (value: string, href: string) => {
    setSelectedItem(value)
    setIsOpen(false)
    router.push(href)
  }

  const dropdownItems = [
    {
      value: "database",
      label: "Database",
      href: "/dashboard/database",
      icon: "/icons/database.png",
    },
    {
      value: "profile",
      label: "Profile",
      href: "/dashboard",
      icon: "/icons/profile.png",
    },
    {
      value: "workflow",
      label: "Workflow",
      href: "/dashboard",
      icon: "/icons/workplace.png",
    },
    {
      value: "showcase",
      label: "Showcase",
      href: "/dashboard",
      icon: "/icons/showcase.png",
    },
    {
      value: "manage",
      label: "Manage",
      href: "/dashboard",
      icon: "/icons/manage.png",
    },
  ]

  return (
    <div className="relative p-1">
      <button
        className="inline-flex justify-between items-center w-full h-10 rounded-xl border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {selectedItem && (
            <img
              src={
                dropdownItems.find((item) => item.value === selectedItem)?.icon
              }
              alt={selectedItem}
              className="w-5 h-5 mr-3"
            />
          )}
          <span className="text-[#1769ff] text-md">
            {selectedItem
              ? dropdownItems.find((item) => item.value === selectedItem)?.label
              : "Choose Workspace"}
          </span>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.09375 3.04995L10.1688 7.12495C10.65 7.6062 10.65 8.3937 10.1688 8.87495L6.09375 12.95"
            stroke="#1769FF"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {dropdownItems.map((item) => (
              <div
                key={item.value}
                className="flex items-center px-4 py-2 text-md text-[#1769ff] hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item.value, item.href)}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-5 h-5 mr-3"
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
