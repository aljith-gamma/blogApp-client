import { fetchCategories } from "@/apis/blog";
import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react";

interface ICategories {
    categoryId: number | string;
    handleChange: (id: string) => void;
}

interface ICategory {
    id: number;
    category: string | number;
}

export const Categories = ({ categoryId, handleChange }: ICategories) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const res: ICategory[] = await fetchCategories();
        setCategories(res);
    }

    const handleChangeId = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        handleChange(String(value));
    }

    return(

        <Box>
            <FormLabel>Category</FormLabel>
            <Select variant='filled' placeholder='select..' name="categoryId" onChange={ handleChangeId } required 
                value={categoryId} 
            >
                { categories && categories[0] && (
                    categories.map(cat => {
                        return (
                            <option key={cat.id} value={cat.id}>{ cat.category }</option>
                        )
                    })
                )}
            </Select>
        </Box>
    )
}