import { Box, Grid } from "@chakra-ui/react"
import { SingleBlog } from "./SingleBlog"


export const Blog = () => {
    return (
        <Grid display="grid" gap={6}
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)','repeat(2, 1fr)', 'repeat(3, 1fr)']} 
        >
            <SingleBlog />
            <SingleBlog />
            <SingleBlog />
            <SingleBlog />
            <SingleBlog />
        </Grid>
    )
}