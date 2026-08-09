import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "text-xs capitalize tracking-widest font-medium px-4 py-1.5 rounded-full",
  {
    variants: {
      variant: {
        outline: "border-2 border-brand bg-brand/20 text-brand",
        default: "bg-brand text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ variant, className, ...props }: BadgeProps) => {
  return <span className={badgeVariants({ variant, className })} {...props} />;
};

export default Badge;
