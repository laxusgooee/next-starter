type Props = {
  onOpenChange: (open: boolean) => void;
};

export default function LoginPopup(_: Props) {
  return (
    <div className="flex-1 ">
      <div className="w-full rounded-xl px-1 py-8 space-y-4 relative z-10 size-60">
        content goes here
      </div>

      <div className="bg-white/60 dark:bg-black/60 absolute inset-0 z-0" />
    </div>
  );
}
