import { Box, Button, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react"
import { ChangeEvent, useState } from "react";
import { SingleTag } from "../CreateBlog/SingleTag";

interface ITags {
    tagsData: string[];
    addTags: (tag: string) => void;
    removeTagHandler: (index: number) => void;
}

export const Tags = ({ tagsData, addTags, removeTagHandler }: ITags) => {
    const [tagText, setTagText] = useState('');
    
    const tagsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if(!value.includes(' ')) setTagText(value.toLowerCase());
    }

    const addTagHandler = () => {
        if(!tagText.includes(' ') && tagText.length){
            addTags(tagText);
            setTagText('');
        }
    }

    return(
        <>
            <FormControl>
                <FormLabel>Tags</FormLabel>
                <Box display="flex">
                    <Input placeholder='Enter tags'  
                        value={tagText} 
                        onChange={ tagsHandler} focusBorderColor="primary"
                        borderRight="none" borderTopRightRadius={0} borderBottomRightRadius={0}
                    />
                    <Button colorScheme="green" borderBottomLeftRadius={0}
                        borderTopLeftRadius={0} onClick={ addTagHandler }
                    >Add</Button>
                </Box>
            </FormControl>
            
            <HStack spacing={4} mt={4}>
                {tagsData[0] && (
                    tagsData.map((tag, i) => {
                        return <SingleTag key={i} tag={tag} index={i} removeTagHandler={ () => removeTagHandler(i) }/>
                    })
                )}
            </HStack>
        </>
    )
}