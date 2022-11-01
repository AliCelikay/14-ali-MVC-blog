const newCommentForm = $('#new-comment-form');

async function newCommentHandler(event) {
    event.preventDefault();

    const commentBody = document.getElementById('comment-body').value.trim();
    
    if(commentBody) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({
                body: commentBody
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){
            document.location.replace('/');
        }
        else{
            alert('Failed to create comment');
        }
    }
}

newCommentForm.on('submit', newCommentHandler);
