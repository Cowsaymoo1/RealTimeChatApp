import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { IFormValues } from "../chat/AddFriendModal";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface SearchFormProps {
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  loading: boolean;
  usernameValue: string;
  isFound: boolean | null;
  searchUsername: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}
const SearchForm = ({
  register,
  errors,
  loading,
  usernameValue,
  isFound,
  searchUsername,
  onSubmit,
  onCancel,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userName" className="text-sm font-semibold">
          Search by Username
        </Label>
        <Input
          id="userName"
          placeholder="Enter username..."
          className="glass border-border/50 focus:border-primary/50 transition-smooth"
          {...register("username", {
            required: "Username is required",
          })}
        ></Input>
        {errors.username && (
          <p className="error-message">{errors.username.message}</p>
        )}
        {isFound === false && (
          <span className="error-message">
            User <span className="font-semibold">@{searchUsername}</span> Not
            Found!
          </span>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="flex-1 glass hover:text-destructive"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"
          disabled={loading || !usernameValue?.trim()}
        >
          {loading ? (
            <span>Searching...</span>
          ) : (
            <>
              <Search className="size-4 mr-2" />
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SearchForm;
