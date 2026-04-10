import { ChevronUp } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { Button } from "../../../../components/Header/ActionButton";




interface ExtraFiltersProps {
    search: string;
    handleSearchChange: (category: string) => void;
    handleControlOpenCategory: () => void;    
}

export function SearchRecipeFilter({ handleSearchChange, search,  handleControlOpenCategory }: ExtraFiltersProps) {
    return (
        <div className=' w-full grid grid-cols-6  space-x-2 cursor-pointer justify-between items-start gap-2'>
            <div className="col-span-5">
                <SearchInput value={search} onChange={handleSearchChange} />
            </div>
            <div className={` justify-end flex items-end `}>
                <Button variant="outlined" onFunction={handleControlOpenCategory}>
                    <ChevronUp />
                </Button>
            </div>
        </div>
    );
}