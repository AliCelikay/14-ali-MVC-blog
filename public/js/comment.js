const newCommentForm = $('#new-comment-form');

async function newCommentHandler(event) {
    event.preventDefault();

    const c_body = document.getElementById('comment-body').value.trim();
    const postId = document.getElementById('post-id').value;
    console.log(postId);
    
    if(c_body) {
        // This fetch api is happening front end, this route must match the backend route
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({c_body, postId}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(response.ok){
            document.location.reload();
        }
        else{
            alert('Failed to create comment');
        }
    }
}

newCommentForm.on('submit', newCommentHandler);
