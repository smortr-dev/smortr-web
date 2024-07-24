"use client"
import React, { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-custom"
import Link from "next/link"

const SideNav = () => {
  const [selectedItem, setSelectedItem] = useState<string>("")
  const handleSelectChange = (value: string) => {
    setSelectedItem(value)
  }
  return (
    <div className="bg-[#EDEDED] h-screen w-80 p-7 items-center justify-center flex-col border-[#BDBDBD] border-2">
      <Select onValueChange={handleSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose Workspace" />
        </SelectTrigger>
        <SelectContent>
          
            <SelectItem
              value="database"
              icon={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 11V17C22 21 21 22 17 22H7C3 22 2 21 2 17V7C2 3 3 2 7 2H8.5C10 2 10.33 2.44 10.9 3.2L12.4 5.2C12.78 5.7 13 6 14 6H17C21 6 22 7 22 11Z"
                    fill="#1769FF"
                    stroke="#1B1B2D"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M8 2H17C19 2 20 3 20 5V6.38"
                    stroke="#1B1B2D"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              Database
            </SelectItem>
          
          <SelectItem
            value="profile"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.14 21.62C17.26 21.88 16.22 22 15 22H8.99998C7.77998 22 6.73999 21.88 5.85999 21.62C6.07999 19.02 8.74998 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62Z"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
                  fill="#1769FF"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.58 10.58C15.58 12.56 13.98 14.17 12 14.17C10.02 14.17 8.41998 12.56 8.41998 10.58C8.41998 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58Z"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Profile
          </SelectItem>
          <SelectItem
            value="workflow"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  fill="#1769FF"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.57 18.5V14.6"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.57 7.45V5.5"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.57 12.65C17.0059 12.65 18.17 11.486 18.17 10.05C18.17 8.61407 17.0059 7.45001 15.57 7.45001C14.134 7.45001 12.97 8.61407 12.97 10.05C12.97 11.486 14.134 12.65 15.57 12.65Z"
                  fill="white"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.42999 18.5V16.55"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.42999 9.4V5.5"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.43002 16.55C9.86596 16.55 11.03 15.3859 11.03 13.95C11.03 12.514 9.86596 11.35 8.43002 11.35C6.99408 11.35 5.83002 12.514 5.83002 13.95C5.83002 15.3859 6.99408 16.55 8.43002 16.55Z"
                  fill="white"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Workflow
          </SelectItem>
          <SelectItem
            value="showcase"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  fill="#1769FF"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.2 14.4C13.2 15.46 12.74 16.42 12 17.08C11.36 17.66 10.52 18 9.59998 18C7.60998 18 6 16.39 6 14.4C6 12.74 7.13002 11.34 8.65002 10.93C9.06002 11.97 9.94999 12.78 11.05 13.08C11.35 13.16 11.67 13.21 12 13.21C12.33 13.21 12.65 13.17 12.95 13.08C13.11 13.48 13.2 13.93 13.2 14.4Z"
                  fill="white"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6 9.6C15.6 10.07 15.51 10.52 15.35 10.93C14.94 11.97 14.05 12.78 12.95 13.08C12.65 13.16 12.33 13.21 12 13.21C11.67 13.21 11.35 13.17 11.05 13.08C9.94999 12.78 9.06002 11.98 8.65002 10.93C8.49002 10.52 8.40002 10.07 8.40002 9.6C8.40002 7.61 10.01 6 12 6C13.99 6 15.6 7.61 15.6 9.6Z"
                  fill="white"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 14.4C18 16.39 16.39 18 14.4 18C13.48 18 12.64 17.65 12 17.08C12.74 16.43 13.2 15.47 13.2 14.4C13.2 13.93 13.11 13.48 12.95 13.07C14.05 12.77 14.94 11.97 15.35 10.92C16.87 11.34 18 12.74 18 14.4Z"
                  fill="white"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Showcase
          </SelectItem>
          <SelectItem
            value="manage"
            icon={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  fill="#1769FF"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.35 9.05004L15.01 16.59C14.45 18.38 11.94 18.41 11.35 16.63L10.65 14.56C10.46 13.99 10.01 13.53 9.43997 13.35L7.35997 12.65C5.58997 12.06 5.61997 9.53004 7.40997 8.99004L14.95 6.64003C16.43 6.19003 17.82 7.58004 17.35 9.05004Z"
                  fill="white"
                  stroke="#1B1B2D"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Manage
          </SelectItem>
        </SelectContent>
      </Select>

      <div className="px-2 py-6">
        <p className="text-sm">Files</p>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row px-3 pt-3 gap-2 items-center ">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.93247 3.38259C5.14548 3.17549 5.49084 3.17549 5.70385 3.38259L10.0675 7.62501C10.1698 7.72446 10.2273 7.85935 10.2273 7.99999C10.2273 8.14064 10.1698 8.27552 10.0675 8.37497L5.70385 12.6174C5.49084 12.8245 5.14548 12.8245 4.93247 12.6174C4.71945 12.4103 4.71945 12.0745 4.93247 11.8674L8.91041 7.99999L4.93247 4.13255C4.71945 3.92545 4.71945 3.58968 4.93247 3.38259Z"
                  fill="black"
                />
              </svg>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.0584 11.9167L17.725 16.0833C17.6 17.3583 17.5 18.3333 15.2417 18.3333H4.75836C2.50003 18.3333 2.40003 17.3583 2.27503 16.0833L1.9417 11.9167C1.87503 11.225 2.0917 10.5833 2.48336 10.0917C2.4917 10.0833 2.4917 10.0833 2.50003 10.075C2.95836 9.51666 3.65003 9.16666 4.42503 9.16666H15.575C16.35 9.16666 17.0334 9.51666 17.4834 10.0583C17.4917 10.0667 17.5 10.075 17.5 10.0833C17.9084 10.575 18.1334 11.2167 18.0584 11.9167Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-miterlimit="10"
                />
                <path
                  d="M2.91669 9.52498V5.23332C2.91669 2.39998 3.62502 1.69165 6.45835 1.69165H7.51669C8.57502 1.69165 8.81669 2.00832 9.21669 2.54165L10.275 3.95832C10.5417 4.30832 10.7 4.52498 11.4084 4.52498H13.5334C16.3667 4.52498 17.075 5.23332 17.075 8.06665V9.55832"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.85834 14.1667H12.1417"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-sm">Projects</p>
            </div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="20"
                height="20"
                rx="5"
                fill="#D3E3FF"
              />
              <path
                d="M15 20H25"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 25V15"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.05 8.69999L17.2333 12.1833C16.5333 15.1917 15.15 16.4083 12.55 16.1583C12.1333 16.125 11.6833 16.05 11.2 15.9333L9.79999 15.6C6.32499 14.775 5.24999 13.0583 6.06665 9.57499L6.88332 6.08332C7.04999 5.37499 7.24999 4.75832 7.49999 4.24999C8.47499 2.23332 10.1333 1.69165 12.9167 2.34999L14.3083 2.67499C17.8 3.49165 18.8667 5.21665 18.05 8.69999Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.55 16.1583C12.0333 16.5083 11.3833 16.8 10.5916 17.0583L9.27498 17.4917C5.96665 18.5583 4.22498 17.6667 3.14998 14.3583L2.08331 11.0667C1.01665 7.75833 1.89998 6.00833 5.20831 4.94167L6.52498 4.50833C6.86665 4.4 7.19165 4.30833 7.49998 4.25C7.24998 4.75833 7.04998 5.375 6.88331 6.08333L6.06665 9.575C5.24998 13.0583 6.32498 14.775 9.79998 15.6L11.2 15.9333C11.6833 16.05 12.1333 16.125 12.55 16.1583Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">Assets</p>
            </div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="20"
                height="20"
                rx="5"
                fill="#D3E3FF"
              />
              <path
                d="M15 20H25"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 25V15"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2 py-1">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.63332 9.05832C7.54999 9.04999 7.44999 9.04999 7.35832 9.05832C5.37499 8.99166 3.79999 7.36666 3.79999 5.36666C3.79999 3.32499 5.44999 1.66666 7.49999 1.66666C9.54165 1.66666 11.2 3.32499 11.2 5.36666C11.1917 7.36666 9.61665 8.99166 7.63332 9.05832Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.675 3.33334C15.2916 3.33334 16.5917 4.64168 16.5917 6.25001C16.5917 7.82501 15.3417 9.10834 13.7833 9.16668C13.7167 9.15834 13.6417 9.15834 13.5667 9.16668"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.46666 12.1333C1.45 13.4833 1.45 15.6833 3.46666 17.025C5.75833 18.5583 9.51666 18.5583 11.8083 17.025C13.825 15.675 13.825 13.475 11.8083 12.1333C9.525 10.6083 5.76666 10.6083 3.46666 12.1333Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.2833 16.6667C15.8833 16.5417 16.45 16.3 16.9167 15.9417C18.2167 14.9667 18.2167 13.3583 16.9167 12.3833C16.4583 12.0333 15.9 11.8 15.3083 11.6667"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">Shared</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm">Tools</p>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row px-4 pt-4 gap-2 items-center ">
              <div className="w-3"></div>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3334 10C18.3334 5.40001 14.6 1.66667 10 1.66667C5.40002 1.66667 1.66669 5.40001 1.66669 10C1.66669 14.6 5.40002 18.3333 10 18.3333"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66667 2.5H7.5C5.875 7.36667 5.875 12.6333 7.5 17.5H6.66667"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 2.5C13.3083 4.93333 13.7167 7.46667 13.7167 10"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 13.3333V12.5C4.93333 13.3083 7.46667 13.7167 10 13.7167"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.5 7.49999C7.36667 5.87498 12.6333 5.87498 17.5 7.49999"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.1667 17.8334C16.6394 17.8334 17.8333 16.6394 17.8333 15.1667C17.8333 13.6939 16.6394 12.5 15.1667 12.5C13.6939 12.5 12.5 13.6939 12.5 15.1667C12.5 16.6394 13.6939 17.8334 15.1667 17.8334Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3333 18.3333L17.5 17.5"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">Discover</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 pt-3 items-center">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3334 10V7.50001C18.3334 3.33334 16.6667 1.66667 12.5 1.66667H7.50002C3.33335 1.66667 1.66669 3.33334 1.66669 7.50001V12.5C1.66669 16.6667 3.33335 18.3333 7.50002 18.3333H10"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.4667 14.8667L16.1083 15.325C15.7333 15.45 15.4333 15.7417 15.3083 16.125L14.85 17.4833C14.4583 18.6583 12.8083 18.6333 12.4417 17.4583L10.9 12.5C10.6 11.5167 11.5083 10.6 12.4833 10.9083L17.45 12.45C18.6167 12.8167 18.6333 14.475 17.4667 14.8667Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">Activities</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2 py-3">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91669 15V5.83333C2.91669 2.5 3.75002 1.66666 7.08335 1.66666H12.9167C16.25 1.66666 17.0834 2.5 17.0834 5.83333V14.1667C17.0834 14.2833 17.0834 14.4 17.075 14.5167"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.29169 12.5H17.0834V15.4167C17.0834 17.025 15.775 18.3333 14.1667 18.3333H5.83335C4.22502 18.3333 2.91669 17.025 2.91669 15.4167V14.875C2.91669 13.5667 3.98335 12.5 5.29169 12.5Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66669 5.83334H13.3334"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.66669 8.75H10.8334"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">Reports</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 py-6">
        <p className="text-sm">Collections</p>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row px-3 pt-3 gap-2 items-center ">
              <svg
                width="15"
                height="16"
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.93247 3.38259C5.14548 3.17549 5.49084 3.17549 5.70385 3.38259L10.0675 7.62501C10.1698 7.72446 10.2273 7.85935 10.2273 7.99999C10.2273 8.14064 10.1698 8.27552 10.0675 8.37497L5.70385 12.6174C5.49084 12.8245 5.14548 12.8245 4.93247 12.6174C4.71945 12.4103 4.71945 12.0745 4.93247 11.8674L8.91041 7.99999L4.93247 4.13255C4.71945 3.92545 4.71945 3.58968 4.93247 3.38259Z"
                  fill="black"
                />
              </svg>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.525 5.95833C15.5583 6.46667 15.5167 7.04167 15.4167 7.68333L14.8083 11.5917C14.2917 14.85 12.7833 15.95 9.52501 15.4417L5.61668 14.825C4.49168 14.65 3.62501 14.35 2.99168 13.9C1.78335 13.0583 1.43335 11.675 1.76668 9.54167L2.38335 5.63333C2.90001 2.375 4.40835 1.275 7.66668 1.78333L11.575 2.4C14.1917 2.80833 15.4167 3.875 15.525 5.95833Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.0833 11.225L15.8333 14.9833C14.7916 18.1167 13.125 18.95 9.99164 17.9083L6.23331 16.6583C4.34164 16.0333 3.29164 15.1667 2.99164 13.9C3.62497 14.35 4.49164 14.65 5.61664 14.825L9.52497 15.4417C12.7833 15.95 14.2916 14.85 14.8083 11.5917L15.4166 7.68333C15.5166 7.04167 15.5583 6.46667 15.525 5.95833C17.5166 7.01667 17.95 8.61667 17.0833 11.225Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.86669 7.48333C7.6675 7.48333 8.31669 6.83415 8.31669 6.03333C8.31669 5.23252 7.6675 4.58333 6.86669 4.58333C6.06587 4.58333 5.41669 5.23252 5.41669 6.03333C5.41669 6.83415 6.06587 7.48333 6.86669 7.48333Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-sm">Your Collections</p>
            </div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="20"
                height="20"
                rx="5"
                fill="#D3E3FF"
              />
              <path
                d="M15 20H25"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 25V15"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.91664 17.0833C3.6083 17.775 4.72497 17.775 5.41664 17.0833L16.25 6.25C16.9416 5.55833 16.9416 4.44167 16.25 3.75C15.5583 3.05833 14.4416 3.05833 13.75 3.75L2.91664 14.5833C2.22497 15.275 2.22497 16.3917 2.91664 17.0833Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.0084 7.49167L12.5084 4.99167"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.08331 2.03333L8.33331 1.66667L7.96665 2.91667L8.33331 4.16667L7.08331 3.8L5.83331 4.16667L6.19998 2.91667L5.83331 1.66667L7.08331 2.03333Z"
                  stroke="#1B1B2D"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.75 7.03333L5 6.66667L4.63333 7.91667L5 9.16667L3.75 8.8L2.5 9.16667L2.86667 7.91667L2.5 6.66667L3.75 7.03333Z"
                  stroke="#1B1B2D"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.25 11.2L17.5 10.8333L17.1333 12.0833L17.5 13.3333L16.25 12.9667L15 13.3333L15.3667 12.0833L15 10.8333L16.25 11.2Z"
                  stroke="#1B1B2D"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">Autogenerated</p>
            </div>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="20"
                height="20"
                rx="5"
                fill="#D3E3FF"
              />
              <path
                d="M15 20H25"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 25V15"
                stroke="#1769FF"
                stroke-width="1.25"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2 py-1">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4417 2.925L12.9083 5.85833C13.1083 6.26667 13.6417 6.65833 14.0917 6.73333L16.75 7.175C18.45 7.45833 18.85 8.69167 17.625 9.90833L15.5583 11.975C15.2083 12.325 15.0167 13 15.125 13.4833L15.7167 16.0417C16.1833 18.0667 15.1083 18.85 13.3167 17.7917L10.825 16.3167C10.375 16.05 9.63332 16.05 9.17499 16.3167L6.68332 17.7917C4.89999 18.85 3.81665 18.0583 4.28332 16.0417L4.87499 13.4833C4.98332 13 4.79165 12.325 4.44165 11.975L2.37499 9.90833C1.15832 8.69167 1.54999 7.45833 3.24999 7.175L5.90832 6.73333C6.34999 6.65833 6.88332 6.26667 7.08332 5.85833L8.54999 2.925C9.34999 1.33333 10.65 1.33333 11.4417 2.925Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm">Starred</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2">
        <p className="text-sm">Storage</p>
        <div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row px-4 pt-4 gap-2 items-center ">
              <div className="w-3"></div>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.50002 18.3333H5.83335C2.50002 18.3333 1.66669 17.5 1.66669 14.1667V5.83334C1.66669 2.50001 2.50002 1.66667 5.83335 1.66667H7.08335C8.33335 1.66667 8.60837 2.03335 9.08337 2.66668L10.3334 4.33335C10.65 4.75002 10.8334 5.00001 11.6667 5.00001H14.1667C17.5 5.00001 18.3334 5.83334 18.3334 9.16667V10.8333"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.4667 15.2667C9.50834 15.4084 9.50834 18.2417 11.4667 18.3833H16.1C16.6583 18.3833 17.2083 18.175 17.6167 17.8C18.9917 16.6 18.2583 14.2 16.45 13.975C15.8 10.0667 10.15 11.55 11.4834 15.275"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-sm">Your Storage</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 pt-3 items-center">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8333 13.3333V5.41667C15.8333 4.5 15.0833 3.75 14.1666 3.75H9.58331"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6667 1.66667L9.16669 3.75001L11.6667 5.83334"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8333 18.3333C17.214 18.3333 18.3333 17.214 18.3333 15.8333C18.3333 14.4526 17.214 13.3333 15.8333 13.3333C14.4526 13.3333 13.3333 14.4526 13.3333 15.8333C13.3333 17.214 14.4526 18.3333 15.8333 18.3333Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.16669 6.66667V14.5833C4.16669 15.5 4.91669 16.25 5.83335 16.25H10.4167"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33331 18.3333L10.8333 16.25L8.33331 14.1667"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.16669 6.66667C5.5474 6.66667 6.66669 5.54738 6.66669 4.16667C6.66669 2.78596 5.5474 1.66667 4.16669 1.66667C2.78598 1.66667 1.66669 2.78596 1.66669 4.16667C1.66669 5.54738 2.78598 6.66667 4.16669 6.66667Z"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-sm">Linked Storage</p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2 py-3">
              <div className="w-7"></div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 4.98333C14.725 4.70833 11.9333 4.56667 9.15 4.56667C7.5 4.56667 5.85 4.65 4.2 4.81667L2.5 4.98333"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.08331 4.14167L7.26665 3.05001C7.39998 2.25834 7.49998 1.66667 8.90831 1.66667H11.0916C12.5 1.66667 12.6083 2.29167 12.7333 3.05834L12.9166 4.14167"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.7084 7.61667L15.1667 16.0083C15.075 17.3167 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3167 4.83335 16.0083L4.29169 7.61667"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.60834 13.75H11.3833"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.91669 10.4167H12.0834"
                  stroke="#1B1B2D"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="text-sm">Trash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav
