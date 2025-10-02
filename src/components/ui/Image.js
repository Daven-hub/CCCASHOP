import React from 'react'
import * as Avatar from "@radix-ui/react-avatar";

function ImageUI({src,alt,data,width,height}) {
  return (
      <Avatar.Root className={`AvatarRoot inline-flex w-[${width}px] h-[${height}px] object-cover object-top rounded-full items-center justify-center overflow-hidden align-middle`}>
      <Avatar.Image
            className="AvatarImage"
            src={src}
            alt={alt}
      />
      <Avatar.Fallback className="AvatarFallback flex h-full w-full items-center justify-center bg-gray-100 text-sm font-semibold text-gray-800" delayMs={600}>
            {data?.charAt(0)?.toUpperCase()}
      </Avatar.Fallback>
</Avatar.Root>
  )
}

export default ImageUI