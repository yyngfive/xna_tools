import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join(process.cwd(),'src/app/[lang]/docs/content'))

    const paths = files.map(filename => ({
        slug: filename.replace('.mdx', '')
    }))

    return paths
}

function getPost({slug}){
    const markdownFile = fs.readFileSync(path.join(process.cwd(),'src/app/[lang]/docs/content',slug + '.mdx'), 'utf-8')

    const { data: frontMatter, content } = matter(markdownFile)

    return {
        frontMatter,
        slug,
        content
    }
}

export async function generateMetadata({params}) {
    const blog = getPost(params);
    return{
        title: blog.frontMatter.title,
    }
}

export default function Docs({params}) {
    const props = getPost(params);

    return (
        <article className='prose md:prose-lg lg:prose-xl dark:prose-invert ml-6'>
            <small className='mx-4 my-2'>Last Updated: {props.frontMatter.date}</small>
            <MDXRemote source={props.content}/>
        </article>
    )
}
