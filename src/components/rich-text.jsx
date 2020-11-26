import React from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { Link } from "gatsby"

const options = {
    renderMark: {
        [MARKS.BOLD]: text => <strong>{text}</strong>,
        [MARKS.ITALIC]: text => <i>{text}</i>,
        [MARKS.UNDERLINE]: text => <u>{text}</u>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
        [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
        [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
        [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
        [BLOCKS.HEADING_4]: (node, children) => <h4>{children}</h4>,
        [BLOCKS.HEADING_5]: (node, children) => <h5>{children}</h5>,
        [BLOCKS.HEADING_6]: (node, children) => <h6>{children}</h6>,
        [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
        [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
        [BLOCKS.EMBEDDED_ASSET]: node => {
            return (
                <img
                    src={node.data.target.fields.file["en-US"].url}
                    alt={node.data.target.fields.title["en-US"]}
                />
            )
        },
        [INLINES.ENTRY_HYPERLINK]: (node, children) => {
            return <Link to={"/blog/" + node.data.target.fields.slug["en-US"]}>{children}</Link>
        },
        [INLINES.HYPERLINK]: (node, children) => {
            return (
                <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            )
        },
        /*
            [BLOCKS.EMBEDDED_ENTRY]: node => {
            const fields = node.data.target.fields
            const contentType = node.data.target.sys.contentType.sys.id
            switch (contentType) {
                case "colorBlock":
                    return <ColorBlock input={fields} />
                default:
                    return null
            } 
        },
        */
    },
}

const RichText = ({ input }) => {
    return <>{documentToReactComponents(input.json, options)}</>
}
export default RichText