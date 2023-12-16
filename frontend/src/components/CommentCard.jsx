/* eslint-disable react/prop-types */


export const CommentCard = ({comment}) => {



    return (
        <p>{comment.author}: {comment.description}</p>
    )
}