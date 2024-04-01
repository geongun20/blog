"use client";

import { AnchorHTMLAttributes, HTMLAttributes, useTransition } from "react";
import NextLink, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

function isModifiedEvent(
  event: Parameters<NonNullable<LinkProps["onClick"]>>[0]
) {
  const eventTarget = event.currentTarget;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

export default function Link({
  className,
  children,
  style,
  href,
  target,
  ...rest
}: JSX.IntrinsicElements["a"]) {
  const router = useRouter();
  return (
    <NextLink
      {...rest}
      target={target}
      href={href ?? ""}
      onClick={(e) => {
        if (!isModifiedEvent(e)) {
          e.preventDefault();
          router.push(e.currentTarget.href);
        }
      }}
      className={[className, `scale-100 active:scale-100`].join(" ")}
      style={{
        ...style,
        transition: "transform 0.2s ease-in-out, opacity 0.2s 0.4s linear",
      }}
    >
      {children}
    </NextLink>
  );
}
