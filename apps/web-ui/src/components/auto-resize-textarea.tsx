import {
  useEffect,
  useRef,
  TextareaHTMLAttributes,
  forwardRef,
  useImperativeHandle,
} from "react";

export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ value, ...props }, ref) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

  useEffect(() => {
    const textarea = internalRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return <textarea ref={internalRef} value={value} {...props} />;
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
