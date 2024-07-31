// import React from "react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   ContextMenu,
//   ContextMenuCheckboxItem,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuLabel,
//   ContextMenuRadioGroup,
//   ContextMenuRadioItem,
//   ContextMenuSeparator,
//   ContextMenuShortcut,
//   ContextMenuSub,
//   ContextMenuSubContent,
//   ContextMenuSubTrigger,
//   ContextMenuTrigger,
// } from "@/components/ui/context-menu"

// interface ContextMenuProps {
//   x: number
//   y: number
//   onDelete: () => void
//   onRename: () => void
// }

// const ContextMenuCustom: React.FC<ContextMenuProps> = ({
//   x,
//   y,
//   onDelete,
//   onRename,
// }) => {
//   return (
//     // <DropdownMenu open={true}>
//     //   <DropdownMenuTrigger asChild>
//     //     <div style={{ position: 'fixed', top: y, left: x, visibility: 'hidden' }} />
//     //   </DropdownMenuTrigger>
//     //   <DropdownMenuContent className="w-56">
//     //     <DropdownMenuItem onClick={onRename}>Rename</DropdownMenuItem>
//     //     <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
//     //   </DropdownMenuContent>
//     // </DropdownMenu>
//     <ContextMenu>
//       <ContextMenuTrigger>Right click</ContextMenuTrigger>
//       <ContextMenuContent>
//         <ContextMenuItem>Profile</ContextMenuItem>
//         <ContextMenuItem>Billing</ContextMenuItem>
//         <ContextMenuItem>Team</ContextMenuItem>
//         <ContextMenuItem>Subscription</ContextMenuItem>
//       </ContextMenuContent>
//     </ContextMenu>
//   )
// }

// export default ContextMenuCustom
import React from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface ContextMenuProps {
  children: React.ReactNode
  onDelete: () => void
  onRename: () => void
}

const FileContextMenu: React.FC<ContextMenuProps> = ({ children, onDelete, onRename }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={onRename}>Rename</ContextMenuItem>
        <ContextMenuItem onClick={onDelete}>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default FileContextMenu