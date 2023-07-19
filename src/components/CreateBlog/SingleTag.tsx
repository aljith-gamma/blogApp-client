import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react"

interface ISingleTag {
    tag: string;
    removeTagHandler: (id: number) => void;
    index: number;
}

export const SingleTag = ({tag, removeTagHandler, index}: ISingleTag) => {
    return (
        <Tag
            size='lg'
            borderRadius='full'
            variant='solid'
            colorScheme='green'
        >
            <TagLabel>{ tag }</TagLabel>
            <TagCloseButton onClick={() => {
                removeTagHandler(index)
            }} />
        </Tag>
    )
}