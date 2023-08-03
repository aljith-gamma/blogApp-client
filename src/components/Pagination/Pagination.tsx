
import { Box } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from 'rsuite';
import "rsuite/dist/rsuite.css";

interface IPagination {
    itemsPerPage: number;
}

export const Paginationn = ({itemsPerPage}: IPagination) => {
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        console.log(activePage);
    }, [activePage])

    return (
        <Box display="flex" justifyContent="center" my={5}>
            <Pagination 
                prev
                last
                next
                first
                size="md"
                total={100} 
                limit={10} 
                activePage={activePage} 
                onChangePage={setActivePage} 
            />
        </Box>
    )
}